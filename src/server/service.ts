import { acceptRules, answerConflict, contentHash, ContractError, detectConflicts, PackStore, ruleHash, validateBinding, validateDraft, validateSession } from '../core/index.js';
import type { Rule, Token } from '../core/types.js';
import { createSession, directionRule, pendingFeedback, uid, validateWork } from './model.js';
import type { Direction, WorkSession } from './model.js';
import { SessionStore } from './storage.js';
import { latestScreen, snapshot, validateScreen } from './screens.js';
import type { Screen } from './screens.js';
import { createChange, exceptionBinding, sameStyle } from './changes.js';
import type { ChangeChoice } from './changes.js';
import { profileTokens, profileSources, referenceRule } from '../design/library.js';

export interface Submission {
  sessionId: string; expectedRevision: number; feedbackIds: string[]; selected: Direction;
  rules: Rule[]; tokens: Token[];
  screens?:Screen[]; reason?:string;
  libraryProfile?:Direction;
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
      if(work.generation.change?.status==='proposed' || work.generation.change?.status==='scoped')throw new ContractError('변경 제안의 범위를 먼저 결정하고 화면을 확인해 주세요.');
      work.selected = direction;
      const generated=latestScreen(work.generation.history,direction);
      if(generated) {
        work.session.rules=structuredClone(generated.rules);work.draft.rules=structuredClone(generated.rules);
        work.draft.tokens=structuredClone(generated.tokens);work.session.answers=[];work.session.acceptances=[];
        return;
      }
      if(work.generation.binding) throw new ContractError('이 프로젝트의 생성 화면을 먼저 제출해 주세요.');
      work.session.sources=profileSources(direction);work.draft.sources=structuredClone(work.session.sources);
      work.session.rules = [referenceRule(directionRule(direction),direction)]; work.session.answers = []; work.session.acceptances = [];
      work.draft.rules = structuredClone(work.session.rules);
      work.draft.name = direction === 'editorial' ? '읽기 중심 스타일' : '업무 도구 스타일';
      work.draft.tokens = profileTokens(direction);
    });
  }
  async feedback(id: string, revision: number, text: unknown) {
    if (typeof text !== 'string' || !text.trim() || text.length > 4000) throw new ContractError('피드백은 1~4000자로 입력해 주세요.');
    return this.mutate(id,revision,work=>{
      if (!work.selected) throw new ContractError('먼저 후보를 선택해 주세요.');
      if(work.generation.change?.status==='proposed' || work.generation.change?.status==='scoped')throw new ContractError('현재 변경 제안을 결정하거나 취소한 후 새 피드백을 남겨 주세요.');
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
    const baseFields=hasScreens?['expectedRevision','feedbackIds','reason','rules','screens','selected','sessionId','tokens']:['expectedRevision','feedbackIds','rules','selected','sessionId','tokens'];
    if(Object.hasOwn(input,'libraryProfile'))baseFields.push('libraryProfile');
    const expected=baseFields.sort().join(',');
    if (Object.keys(input).sort().join(',') !== expected) throw new ContractError('Unexpected submission fields');
    if (!['editorial','workspace'].includes(input.selected) || !Array.isArray(input.feedbackIds)) throw new ContractError('Invalid submission');
    return this.mutate(input.sessionId,input.expectedRevision,async work=>{
      const pending = pendingFeedback(work);
      if(work.generation.change?.status==='proposed' || work.generation.change?.status==='scoped')throw new ContractError('현재 변경 제안을 먼저 결정하거나 취소해 주세요.');
      if ((!pending.length && !hasScreens) || contentHash([...pending].sort()) !== contentHash([...input.feedbackIds].sort())) throw new ContractError('반영할 피드백 목록이 현재 세션과 다릅니다.');
      if(input.libraryProfile!==undefined && (!hasScreens || input.libraryProfile!==input.selected))throw new ContractError('참고 프로필과 화면 방향을 맞춰 주세요.');
      const sources=input.libraryProfile?[
        ...work.draft.sources.filter(source=>!profileSources(input.libraryProfile!).some(reference=>reference.id===source.id)),
        ...profileSources(input.libraryProfile),
      ]:work.draft.sources;
      const draft = validateDraft({ ...work.draft, sources,rules:input.rules,tokens:input.tokens });
      if (draft.rules.some(rule=>rule.status !== 'proposed')) throw new ContractError('Agent can only submit proposed rules');
      if (!draft.rules.length) throw new ContractError('Submit at least one rule');
      validateSession({...work.session,sources:draft.sources,rules:draft.rules,answers:[],acceptances:[]});
      if(work.generation.binding) {
        const binding=work.generation.binding;
        const pack=await this.packs.read(binding.packId,binding.packVersion);validateBinding(binding,pack);
        if(!sameStyle(draft,work.draft)) {
          if(!hasScreens)throw new ContractError('고정된 팩 변경에는 수정 화면과 이유가 필요합니다.');
          const projects=(await this.sessions.list()).map(item=>item.generation.binding).filter((item):item is NonNullable<typeof item>=>item!==null);
          // Store a proposal without applying its style or consuming the feedback.
          work.generation.change=createChange(pack,binding,work.draft,work.selected,draft,input.screens!,input.selected,pending,input.reason!,projects);
          return;
        }
      }
      if(work.selected && input.selected!==work.selected) throw new ContractError('에이전트가 사용자의 후보 선택을 변경할 수 없습니다.');
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
      const next = validateSession({ ...work.session,sources:draft.sources,rules:draft.rules,answers:[],acceptances:[] });
      work.session = next; work.draft = draft;
      work.processedFeedbackIds.push(...pending); work.lastSubmission = uid('submission');
    });
  }
  async save(id: string, revision: number) {
    return this.sessions.locked(id,async()=>{
      let work = await this.sessions.read(id);
      if(work.generation.change?.status==='proposed')throw new ContractError('변경 범위를 먼저 선택해 주세요.');
      if(!work.publication && !work.saved && work.generation.change?.decision?.choice==='pack-change')await this.assertCurrentBase(work.generation.change.base);
      if(work.selected && work.generation.history.length) {
        const screen=latestScreen(work.generation.history,work.selected);
        if(screen && (contentHash(screen.rules.map(ruleHash).sort())!==contentHash(work.draft.rules.map(ruleHash).sort()) || contentHash(screen.tokens)!==contentHash(work.draft.tokens)))
          throw new ContractError('규칙이 바뀌었습니다. 최신 규칙을 적용한 화면을 제출한 후 수용해 주세요.');
      }
      if(work.generation.binding) {
        if(work.generation.accepted)return work;
        if(work.session.revision!==revision || !work.selected || pendingFeedback(work).length || !latestScreen(work.generation.history,work.selected)) throw new ContractError('생성 화면과 최신 규칙을 확인해 주세요.');
        const pack=await this.packs.read(work.generation.binding.packId,work.generation.binding.packVersion);
        validateBinding(work.generation.binding,pack);
        work.session=acceptRules(work.session,revision,work.session.rules.map(rule=>rule.id),uid('decision'));
        work.draft.rules=structuredClone(work.session.rules);work.generation.accepted=true;
        if(work.generation.change?.decision?.choice==='project-exception') {
          work.generation.binding=exceptionBinding(pack,work.generation.change);work.generation.change.status='accepted';
        }
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
          sessionId:id,revision:work.session.revision,acceptedRuleIds:ruleIds,reason:work.generation.change?.decision?.choice==='pack-change'
            ? `개인 팩 새 버전 수용: ${work.generation.change.proposal.reason}`:'브라우저에서 규칙과 스타일 팩 저장을 명시적으로 수용함' } };
        await this.sessions.append(work);
      }
      const pack = await this.packs.save({ draft:work.draft,session:work.session,acceptance:work.publication.acceptance,
        requestId:work.publication.requestId,expectedBaseVersion:work.generation.change?.decision?.choice==='pack-change'?work.generation.change.base.packVersion:0 });
      work.saved = { id:pack.id,version:pack.version,hash:pack.hash }; work.session.revision++;
      if(work.generation.change?.decision?.choice==='pack-change')work.generation.change.status='accepted';
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
    work.generation.history=imported.generation.history.map(item=>snapshot(item.screen,{...work.draft,rules:item.rules.map(rule=>({...rule,status:'proposed'})),tokens:item.tokens},1,item.reason,item.rendererVersion));
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
  async decideChange(id:string,revision:number,proposalId:string,choice:unknown) {
    if(!['keep','project-exception','pack-change'].includes(choice as string))throw new ContractError('변경 범위를 선택해 주세요.');
    return this.mutate(id,revision,async work=>{
      const change=work.generation.change;
      if(!change || change.status!=='proposed' || change.proposal.id!==proposalId)throw new ContractError('최신 변경 제안을 확인해 주세요.');
      if(choice==='pack-change')await this.assertCurrentBase(change.base);
      change.decision={id:uid('decision'),actor:'user',revision:revision+1,choice:choice as ChangeChoice,proposalId,draftHash:change.proposal.draftHash};
      work.processedFeedbackIds.push(...change.feedbackIds);
      if(choice==='keep'){change.status='rejected';return;}
      change.status='scoped';work.draft=structuredClone(change.draft);
      work.session=validateSession({...work.session,sources:work.draft.sources,rules:work.draft.rules,answers:[],acceptances:[]});
      work.selected=change.selected;
      work.generation.history.push(...change.screens.map(screen=>snapshot(screen,work.draft,revision+1,change.proposal.reason)));
      work.lastSubmission=uid('submission');
      if(choice==='pack-change')work.generation.binding=null;
    });
  }
  async cancelChange(id:string,revision:number) {
    return this.mutate(id,revision,async work=>{
      const change=work.generation.change;
      if(!change || change.status!=='scoped')throw new ContractError('취소할 변경 제안이 없습니다.');
      const scopeRevision=change.decision!.revision;
      // Restore the exact project style that preceded this proposal, including earlier exceptions.
      work.draft=structuredClone(change.previousDraft);
      work.session.rules=structuredClone(work.draft.rules);work.session.sources=structuredClone(work.draft.sources);work.session.acceptances=[];work.session.answers=[];
      work.selected=change.previousSelected;work.generation.binding=change.base;
      work.generation.history=work.generation.history.filter(item=>item.revision<scopeRevision);
      change.status='rejected';change.decision={...change.decision!,id:uid('decision'),revision:revision+1,choice:'keep'};
    });
  }
  async revise(id:string) {
    const source=await this.sessions.read(id);
    if(!source.generation.accepted || !source.generation.binding)throw new ContractError('수용한 프로젝트에서만 새 수정 협의를 시작할 수 있습니다.');
    const work=createSession(source.session.brief.purpose);
    work.session={...work.session,brief:source.session.brief,feedback:source.session.feedback,sources:source.session.sources,rules:source.draft.rules.map(rule=>({...rule,status:'proposed'}))};
    work.draft={...source.draft,id:work.draft.id,rules:structuredClone(work.session.rules)};work.selected=source.selected;
    work.processedFeedbackIds=source.session.feedback.map(item=>item.id);
    work.generation.binding=source.generation.binding;
    if(source.generation.history.length){work.session.revision=1;const previous=source.generation.history.at(-1)!;work.generation.history=[snapshot(previous.screen,work.draft,1,'수용한 프로젝트의 화면에서 수정 협의를 시작합니다.',previous.rendererVersion)];}
    await this.sessions.locked(work.session.id,()=>this.sessions.append(work));return work;
  }
  private async assertCurrentBase(binding:NonNullable<WorkSession['generation']['binding']>) {
    const latest=await this.packs.latest(binding.packId);
    if(latest.version!==binding.packVersion || latest.hash!==binding.packHash)throw new ContractError('개인 팩에 새 버전이 있습니다. 최신 팩으로 새 협의를 시작하거나 이번 프로젝트의 예외로 적용해 주세요.');
  }
  view(work: WorkSession) {
    return { ...work, pendingFeedbackIds:pendingFeedback(work),conflicts:detectConflicts(work.session.rules,work.session.brief.id)
      .filter(item=>!work.session.answers.some(answer=>answer.conflictId===item.id)) };
  }
}
