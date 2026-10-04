import { acceptRules, answerConflict, contentHash, ContractError, detectConflicts, PackStore, ruleHash, validateBinding, validateDraft, validateSession } from '../core/index.js';
import type { Rule, Token } from '../core/types.js';
import { createSession, directionRule, pendingFeedback, uid, validateWork } from './model.js';
import type { Direction, WorkSession } from './model.js';
import { SessionStore } from './storage.js';
import { latestScreen, snapshot, validateScreen } from './screens.js';
import type { Screen } from './screens.js';

export interface Submission {
  sessionId: string; expectedRevision: number; feedbackIds: string[]; selected: Direction;
  rules: Rule[]; tokens: Token[];
  screens?:Screen[]; reason?:string;
}
export class WorkbenchService {
  private constructor(readonly sessions: SessionStore, readonly packs: PackStore) {}
  static async create(root: string) { return new WorkbenchService(await SessionStore.create(root), await PackStore.create(root)); }
  async create(purpose: string) {
    const work = createSession(purpose);
    await this.sessions.locked(work.session.id,()=>this.sessions.append(work)); return work;
  }
  async mutate(id: string, expectedRevision: number, action: (work: WorkSession)=>void|Promise<void>) {
    return this.sessions.locked(id,async()=>{
      const work = await this.sessions.read(id);
      if (work.session.revision !== expectedRevision) throw new ContractError('화면이 갱신되었습니다. 최신 내용을 확인하고 다시 시도해 주세요.');
      if (work.saved || work.publication || work.generation.accepted) throw new ContractError('수용한 세션은 변경할 수 없습니다. 새 세션을 만들어 주세요.');
      await action(work);
      work.session.revision++;
      validateWork(work); await this.sessions.append(work);
      try { await this.sessions.handoff(work); } catch { console.error('Handoff refresh failed; session is saved. Request the handoff again from the workbench.'); }
      return work;
    });
  }
  async select(id: string, revision: number, direction: unknown) {
    if (direction !== 'editorial' && direction !== 'workspace') throw new ContractError('후보를 선택해 주세요.');
    return this.mutate(id,revision,work=>{
      if (work.session.feedback.length) throw new ContractError('피드백을 남긴 뒤에는 에이전트 반영 또는 새 세션으로 방향을 변경해 주세요.');
      work.selected = direction;
      const generated=latestScreen(work.generation.history,direction);
      if(generated) {
        work.session.rules=structuredClone(generated.rules);work.draft.rules=structuredClone(generated.rules);
        work.draft.tokens=structuredClone(generated.tokens);work.session.answers=[];work.session.acceptances=[];
        return;
      }
      if(work.generation.binding) throw new ContractError('이 프로젝트의 생성 화면을 먼저 제출해 주세요.');
      work.session.rules = [directionRule(direction)]; work.session.answers = []; work.session.acceptances = [];
      work.draft.rules = structuredClone(work.session.rules);
      work.draft.name = direction === 'editorial' ? '읽기 중심 스타일' : '업무 도구 스타일';
      work.draft.tokens = [
        { id:'text.primary',kind:'color',value: direction === 'editorial' ? '#292c28' : '#182d3b',ruleIds:['layout-direction'] },
        { id:'space.section',kind:'dimension',value: direction === 'editorial' ? '48px' : '24px',ruleIds:['layout-direction'] },
      ];
    });
  }
  async feedback(id: string, revision: number, text: unknown) {
    if (typeof text !== 'string' || !text.trim() || text.length > 4000) throw new ContractError('피드백은 1~4000자로 입력해 주세요.');
    return this.mutate(id,revision,work=>{
      if (!work.selected) throw new ContractError('먼저 후보를 선택해 주세요.');
      work.session.feedback.push({ id:uid('feedback'),text:text.trim(),targetId:`candidate-${work.selected}` });
    });
  }
  async conflict(id: string, revision: number, conflictId: string, selectedRuleId: string) {
    return this.mutate(id,revision,work=>{
      const next = answerConflict(work.session,revision,{ id:uid('answer'),conflictId,selectedRuleId,scope:'pack-change',explanation:'브라우저에서 개인 규칙으로 적용할 안을 선택함' });
      // mutate owns the single revision increment.
      work.session = { ...next, revision };
    });
  }
  async submit(input: Submission) {
    const hasScreens=Object.hasOwn(input,'screens');
    const expected=hasScreens?'expectedRevision,feedbackIds,reason,rules,screens,selected,sessionId,tokens':'expectedRevision,feedbackIds,rules,selected,sessionId,tokens';
    if (Object.keys(input).sort().join(',') !== expected) throw new ContractError('Unexpected submission fields');
    if (!['editorial','workspace'].includes(input.selected) || !Array.isArray(input.feedbackIds)) throw new ContractError('Invalid submission');
    return this.mutate(input.sessionId,input.expectedRevision,async work=>{
      const pending = pendingFeedback(work);
      if ((!pending.length && !hasScreens) || contentHash([...pending].sort()) !== contentHash([...input.feedbackIds].sort())) throw new ContractError('반영할 피드백 목록이 현재 세션과 다릅니다.');
      if(work.selected && input.selected!==work.selected) throw new ContractError('에이전트가 사용자의 후보 선택을 변경할 수 없습니다.');
      const draft = validateDraft({ ...work.draft, rules:input.rules,tokens:input.tokens });
      if (draft.rules.some(rule=>rule.status !== 'proposed')) throw new ContractError('Agent can only submit proposed rules');
      if (!draft.rules.length) throw new ContractError('Submit at least one rule');
      if(work.generation.binding) {
        const binding=work.generation.binding;
        const pack=await this.packs.read(binding.packId,binding.packVersion);validateBinding(binding,pack);
        if(contentHash(draft.tokens)!==contentHash(pack.tokens) || contentHash(draft.rules.map(ruleHash).sort())!==contentHash(pack.rules.map(ruleHash).sort()))
          throw new ContractError('고정된 팩 규칙·토큰을 변경할 수 없습니다. 개인 팩 변경은 별도 협의가 필요합니다.');
      }
      if(hasScreens) {
        if(!Array.isArray(input.screens) || !input.screens.length || input.screens.length>2) throw new ContractError('Submit 1–2 screens');
        const screens=input.screens.map(validateScreen);
        if(new Set(screens.map(screen=>screen.direction)).size!==screens.length || !screens.some(screen=>screen.direction===input.selected)) throw new ContractError('Invalid screen candidates');
        const direction=draft.rules.find(rule=>rule.effect.key==='layout.direction')?.effect.value;
        if(direction && screens.some(screen=>screen.direction!==direction)) throw new ContractError('화면 배치가 제안한 방향 규칙과 다릅니다.');
        if(detectConflicts(draft.rules,work.session.brief.id).length) throw new ContractError('화면 제출 전에 충돌을 협의하고 규칙을 정리해 주세요. 규칙만 먼저 제출할 수 있습니다.');
        for(const answer of work.session.answers) {
          const chosen=work.session.rules.find(rule=>rule.id===answer.selectedRuleId)!;
          if(!draft.rules.some(rule=>rule.id===chosen.id && ruleHash(rule)===ruleHash(chosen))) throw new ContractError('사용자가 충돌에서 선택한 규칙을 화면 제안에 보존해 주세요.');
        }
        work.generation.history.push(...screens.map(screen=>snapshot(screen,draft,work.session.revision+1,input.reason!)));
      }
      const next = validateSession({ ...work.session,rules:draft.rules,answers:[],acceptances:[] });
      work.session = next; work.draft = draft;
      work.processedFeedbackIds.push(...pending); work.lastSubmission = uid('submission');
    });
  }
  async save(id: string, revision: number) {
    return this.sessions.locked(id,async()=>{
      let work = await this.sessions.read(id);
      if(work.selected && work.generation.history.length) {
        const screen=latestScreen(work.generation.history,work.selected);
        if(screen && (contentHash(screen.rules.map(ruleHash).sort())!==contentHash(work.draft.rules.map(ruleHash).sort()) || contentHash(screen.tokens)!==contentHash(work.draft.tokens)))
          throw new ContractError('규칙이 바뀌었습니다. 최신 규칙을 적용한 화면을 제출한 후 수용해 주세요.');
      }
      if(work.generation.binding) {
        if(work.generation.accepted)return work;
        if(work.session.revision!==revision || !work.selected || pendingFeedback(work).length || !latestScreen(work.generation.history,work.selected)) throw new ContractError('생성 화면과 최신 규칙을 확인해 주세요.');
        validateBinding(work.generation.binding,await this.packs.read(work.generation.binding.packId,work.generation.binding.packVersion));
        work.session=acceptRules(work.session,revision,work.session.rules.map(rule=>rule.id),uid('decision'));
        work.draft.rules=structuredClone(work.session.rules);work.generation.accepted=true;
        await this.sessions.append(work);return work;
      }
      if (work.saved) return work;
      if (!work.publication) {
        if (work.session.revision !== revision) throw new ContractError('최신 규칙을 확인한 뒤 수용해 주세요.');
        if (!work.selected || !work.session.rules.length || pendingFeedback(work).length) throw new ContractError('후보 선택과 피드백 반영을 완료한 뒤 수용해 주세요.');
        const conflicts = detectConflicts(work.session.rules,work.session.brief.id);
        if (conflicts.some(item=>!work.session.answers.some(answer=>answer.conflictId === item.id))) throw new ContractError('충돌에 먼저 답변해 주세요.');
        const excluded = new Set(conflicts.map(item=>{
          const answer = work.session.answers.find(entry=>entry.conflictId===item.id)!;
          return answer.selectedRuleId === item.leftId ? item.rightId : item.leftId;
        }));
        const ruleIds = work.session.rules.filter(rule=>rule.status==='proposed' && !excluded.has(rule.id)).map(rule=>rule.id);
        work.session = acceptRules(work.session,revision,ruleIds,uid('decision'));
        work.draft.rules = work.session.rules.filter(rule=>ruleIds.includes(rule.id));
        // References to a suppressed rule cannot silently survive in the pack.
        work.draft.tokens = work.draft.tokens.map(token=>({ ...token,ruleIds:token.ruleIds.filter(id=>ruleIds.includes(id)) }));
        work.draft.assets = work.draft.assets.map(asset=>({ ...asset,ruleIds:asset.ruleIds.filter(id=>ruleIds.includes(id)) }));
        work.publication = { requestId:uid('request'),acceptance:{ id:uid('acceptance'),actor:'user',draftHash:contentHash(work.draft),
          sessionId:id,revision:work.session.revision,acceptedRuleIds:ruleIds,reason:'브라우저에서 규칙과 스타일 팩 저장을 명시적으로 수용함' } };
        await this.sessions.append(work);
      }
      const pack = await this.packs.save({ draft:work.draft,session:work.session,acceptance:work.publication.acceptance,
        requestId:work.publication.requestId,expectedBaseVersion:0 });
      work.saved = { id:pack.id,version:pack.version,hash:pack.hash }; work.session.revision++;
      await this.sessions.append(work); return work;
    });
  }
  async import(input: unknown) {
    const imported = validateWork(input);
    const work = createSession(imported.session.brief.purpose);
    work.selected = imported.selected; work.draft = { ...imported.draft,id:work.draft.id,
      rules:imported.draft.rules.map(rule=>({ ...rule,status:'proposed' as const })) };
    work.session = { ...work.session,brief:imported.session.brief,feedback:imported.session.feedback,sources:imported.session.sources,
      rules:work.draft.rules,answers:[],acceptances:[] };
    work.processedFeedbackIds = imported.processedFeedbackIds;
    work.generation.history=imported.generation.history.map(item=>snapshot(item.screen,{...work.draft,rules:item.rules.map(rule=>({...rule,status:'proposed'})),tokens:item.tokens},1,item.reason));
    if(work.generation.history.length)work.session.revision=1;
    // Import never restores an imported user acceptance or publication.
    await this.sessions.locked(work.session.id,()=>this.sessions.append(work)); return work;
  }
  async reuse(id:string,purpose:string) {
    const source=await this.sessions.read(id);
    if(!source.saved)throw new ContractError('먼저 개인 팩을 저장해 주세요.');
    const pack=await this.packs.read(source.saved.id,source.saved.version);
    if(pack.hash!==source.saved.hash)throw new ContractError('Pack identity mismatch');
    const work=createSession(purpose);
    work.session.brief={...work.session.brief,id:uid('project'),audience:'새 페이지의 내용을 알아보려는 방문자',tasks:['내용 이해','연락 방법 확인'],content:['소개','주요 내용','사례','연락 안내']};
    work.draft={...work.draft,name:pack.name,rules:pack.rules.map(rule=>({...rule,status:'proposed'})),tokens:pack.tokens,assets:pack.assets,sources:pack.sources};
    work.session.rules=structuredClone(work.draft.rules);work.session.sources=pack.sources;
    work.generation.binding=validateBinding({schemaVersion:'1.0',id:work.session.brief.id,packId:pack.id,packVersion:pack.version,packHash:pack.hash,brief:work.session.brief,overrides:[],answers:[]},pack);
    await this.sessions.locked(work.session.id,()=>this.sessions.append(work));await this.sessions.handoff(work);return work;
  }
  view(work: WorkSession) {
    return { ...work, pendingFeedbackIds:pendingFeedback(work),conflicts:detectConflicts(work.session.rules,work.session.brief.id)
      .filter(item=>!work.session.answers.some(answer=>answer.conflictId===item.id)) };
  }
}
