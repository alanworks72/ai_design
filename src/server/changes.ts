import { contentHash, ContractError, detectConflicts, parseContract, proposeChange, ruleHash, validateBinding, validateDraft } from '../core/index.js';
import type { ChangeProposal, PackDraft, PackVersion, ProjectBinding, Rule } from '../core/types.js';
import { snapshot, validateScreen } from './screens.js';
import type { Screen } from './screens.js';
import type { Direction } from './model.js';

export type ChangeChoice='keep'|'project-exception'|'pack-change';
export interface StyleChange {
  proposal:ChangeProposal;
  base:ProjectBinding;
  previousDraft:PackDraft;
  previousSelected:Direction|null;
  draft:PackDraft;
  screens:Screen[];
  selected:Direction;
  feedbackIds:string[];
  status:'proposed'|'scoped'|'rejected'|'accepted';
  decision:{id:string;actor:'user';revision:number;choice:ChangeChoice;proposalId:string;draftHash:string}|null;
}
export function sameStyle(left:PackDraft,right:PackDraft) {
  return contentHash(left.tokens)===contentHash(right.tokens) && contentHash(left.rules.map(ruleHash).sort())===contentHash(right.rules.map(ruleHash).sort());
}
export function createChange(pack:PackVersion,binding:ProjectBinding,previousDraft:PackDraft,previousSelected:Direction|null,draft:PackDraft,screens:Screen[],selected:Direction,feedbackIds:string[],reason:string,projects:ProjectBinding[]):StyleChange {
  // Existing rules cannot disappear or change identity; removals require a richer exception model.
  for(const rule of pack.rules) {
    const next=draft.rules.find(item=>item.id===rule.id);
    if(!next || next.effect.key!==rule.effect.key)throw new ContractError('기존 규칙의 삭제·효과 키 변경은 지원하지 않습니다. 같은 규칙의 변경안으로 제출해 주세요.');
  }
  const normalized=validateDraft({...draft,id:pack.id});
  const proposal=proposeChange(pack,normalized,[...new Map(projects.map(project=>[project.id,project])).values()],reason);
  return validateChange({proposal,base:binding,previousDraft,previousSelected,draft:normalized,screens,selected,feedbackIds,status:'proposed',decision:null});
}
export function validateChange(input:unknown):StyleChange {
  if(!input || typeof input!=='object' || Object.keys(input).sort().join(',')!=='base,decision,draft,feedbackIds,previousDraft,previousSelected,proposal,screens,selected,status')throw new ContractError('Invalid style change fields');
  const change=structuredClone(input) as StyleChange;
  change.proposal=parseContract('change',change.proposal);change.base=parseContract('project',change.base);change.draft=validateDraft(change.draft);
  change.previousDraft=validateDraft(change.previousDraft);
  if(![null,'editorial','workspace'].includes(change.previousSelected))throw new ContractError('Invalid previous direction');
  if(change.proposal.packId!==change.base.packId || change.proposal.baseVersion!==change.base.packVersion || change.proposal.baseHash!==change.base.packHash
    || change.draft.id!==change.base.packId || change.proposal.draftHash!==contentHash(change.draft) || change.draft.rules.some(rule=>rule.status!=='proposed'))throw new ContractError('Style change identity mismatch');
  if(!['editorial','workspace'].includes(change.selected) || !Array.isArray(change.feedbackIds) || change.feedbackIds.some(id=>typeof id!=='string')
    || new Set(change.feedbackIds).size!==change.feedbackIds.length || !Array.isArray(change.screens) || !change.screens.length || change.screens.length>2)throw new ContractError('Invalid change candidates');
  change.screens=change.screens.map(validateScreen);
  if(new Set(change.screens.map(screen=>screen.direction)).size!==change.screens.length || !change.screens.some(screen=>screen.direction===change.selected))throw new ContractError('Invalid change directions');
  for(const screen of change.screens)snapshot(screen,change.draft,1,change.proposal.reason);
  const direction=change.draft.rules.find(rule=>rule.effect.key==='layout.direction')?.effect.value;
  if(direction && change.screens.some(screen=>screen.direction!==direction))throw new ContractError('변경 화면과 방향 규칙이 다릅니다.');
  if(detectConflicts(change.draft.rules,change.base.id).length)throw new ContractError('변경안 내부의 규칙 충돌을 정리해 주세요.');
  if(!['proposed','scoped','rejected','accepted'].includes(change.status))throw new ContractError('Invalid change status');
  if(change.decision===null) {if(change.status!=='proposed')throw new ContractError('Change decision missing');}
  else {
    const decision=change.decision;
    if(Object.keys(decision).sort().join(',')!=='actor,choice,draftHash,id,proposalId,revision' || decision.actor!=='user'
      || typeof decision.id!=='string' || !Number.isSafeInteger(decision.revision) || decision.revision<1
      || !['keep','project-exception','pack-change'].includes(decision.choice) || decision.proposalId!==change.proposal.id || decision.draftHash!==change.proposal.draftHash
      || (decision.choice==='keep'?change.status!=='rejected':!['scoped','accepted'].includes(change.status)))throw new ContractError('Invalid change decision');
  }
  return change;
}
export function exceptionBinding(pack:PackVersion,change:StyleChange):ProjectBinding {
  if(change.decision?.choice!=='project-exception')throw new ContractError('Project exception requires a user scope decision');
  const overrides:Rule[]=change.draft.rules.filter(rule=>!pack.rules.some(base=>base.id===rule.id && ruleHash(base)===ruleHash(rule)))
    .map(rule=>({...rule,id:`override-${contentHash(rule.id).slice(0,20)}`,scope:'project',projectId:change.base.id,status:'accepted'}));
  const conflicts=detectConflicts([...pack.rules,...overrides],change.base.id);
  const answers=conflicts.map(conflict=>{
    const selected=overrides.find(rule=>rule.id===conflict.leftId || rule.id===conflict.rightId);
    if(!selected)throw new ContractError('Invalid project exception conflict');
    return {id:`answer-${contentHash({decision:change.decision!.id,conflict:conflict.id}).slice(0,24)}`,actor:'user' as const,
      conflictId:conflict.id,projectId:change.base.id,leftHash:conflict.leftHash,rightHash:conflict.rightHash,selectedRuleId:selected.id,
      scope:'project-exception' as const,explanation:`사용자가 변경 범위를 이번 프로젝트로 선택함: ${change.proposal.reason}`};
  });
  return validateBinding({...change.base,overrides,answers},pack);
}
