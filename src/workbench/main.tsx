import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { WorkSession, Direction } from '../server/model.js';
import type { Conflict } from '../core/types.js';
import './style.css';

type View = WorkSession & { pendingFeedbackIds:string[];conflicts:Conflict[];previewOrigin:string;previewToken:string };
type Summary = {id:string;purpose:string;saved:WorkSession['saved'];selected:Direction|null};
const directions: {id:Direction;label:string;description:string;tag:string}[] = [
  {id:'editorial',label:'읽기 중심',description:'큰 제목, 넓은 여백, 자연스럽게 이어지는 이야기',tag:'읽는 순서와 호흡'},
  {id:'workspace',label:'업무 도구',description:'요약과 세부 정보를 나누고 빠르게 훑는 구성',tag:'요약과 정보의 구조'},
];
function cached(key:string,fallback='') {try{return localStorage.getItem(key)??fallback;}catch{return fallback;}}
function keep(key:string,value:string) {try{localStorage.setItem(key,value);}catch{/* Input remains in React memory. */}}
async function api<T>(url:string,input?:unknown):Promise<T> {
  const response=await fetch(url,input===undefined ? {} : {method:'POST',headers:{'Content-Type':'application/json','X-Workbench':'1'},body:JSON.stringify(input)});
  const data=await response.json();if(!response.ok) throw Error(data.error ?? '요청에 실패했습니다.');return data as T;
}
function App() {
  const [sessions,setSessions]=useState<Summary[]>([]);
  const [id,setId]=useState(()=>/^\/sessions\/(session-[a-z0-9-]+)$/.exec(location.pathname)?.[1]??null);
  const [view,setView]=useState<View|null>(null);
  const [purpose,setPurpose]=useState(()=>cached('design-purpose','서비스를 소개하고 관심 있는 방문자가 문의하도록 돕고 싶어요.'));
  const [feedback,setFeedback]=useState('');
  const [error,setError]=useState('');const [notice,setNotice]=useState('');
  const [busy,setBusy]=useState(false);const [width,setWidth]=useState<'desktop'|'mobile'>('desktop');
  const [step,setStep]=useState<'compare'|'feedback'|'rules'>('compare');
  const [candidateIndex,setCandidateIndex]=useState(0);
  const working=useRef(false);
  const currentId=useRef(id);currentId.current=id;
  async function refreshList(){setSessions(await api<Summary[]>('/api/sessions'));}
  async function refresh(sessionId:string){
    const next=await api<View>(`/api/sessions/${sessionId}`);
    if(currentId.current===sessionId) setView(previous=>previous?.session.id===sessionId && previous.session.revision>next.session.revision ? previous : next);
  }
  useEffect(()=>{void refreshList().catch(e=>setError(e.message));},[]);
  useEffect(()=>{
    setView(null);setError('');setNotice('');setFeedback(id?cached(`design-feedback-${id}`):'');
    const restored=id?cached(`design-step-${id}`):'compare';
    setStep(restored==='feedback'||restored==='rules'?restored:'compare');setCandidateIndex(0);
    const onPop=()=>setId(/^\/sessions\/(session-[a-z0-9-]+)$/.exec(location.pathname)?.[1]??null);
    window.addEventListener('popstate',onPop);
    if(!id)return()=>window.removeEventListener('popstate',onPop);
    let stopped=false;
    const poll=async()=>{try{await refresh(id);if(!stopped)setError('');}catch(e){if(!stopped)setError(`${(e as Error).message} 입력은 이 브라우저에 유지됩니다.`);}};
    void poll();const timer=setInterval(()=>{if(!working.current)void poll();},3000);
    return()=>{stopped=true;clearInterval(timer);window.removeEventListener('popstate',onPop);};
  },[id]);
  useEffect(()=>{if(view?.selected)setCandidateIndex(directions.findIndex(item=>item.id===view.selected));},[view?.selected]);
  function changeStep(next:'compare'|'feedback'|'rules'){setStep(next);if(id)keep(`design-step-${id}`,next);}
  function moveCandidate(delta:number){setCandidateIndex(index=>(index+delta+directions.length)%directions.length);}
  function open(next:string|null){history.pushState({},'',next?`/sessions/${next}`:'/');setId(next);}
  async function perform(action:()=>Promise<void>){if(working.current)return;working.current=true;setBusy(true);setError('');setNotice('');try{await action();}catch(e){setError((e as Error).message);}finally{working.current=false;setBusy(false);}}
  async function mutation(action:string,data:Record<string,unknown>={}) {
    if(!view)return;
    await api(`/api/sessions/${view.session.id}/${action}`,{revision:view.session.revision,...data});
    await refresh(view.session.id);await refreshList();
  }
  const locked=!!view?.saved||!!view?.publication;
  const pending=!!view?.pendingFeedbackIds.length;
  return <div className="shell">
    <aside className="rail"><a className="brand" href="/" onClick={e=>{e.preventDefault();open(null);}}><span className="brand-symbol">∴</span> personal design<span className="version">LOCAL / 0.2</span></a>
      <div className="rail-body"><p className="overline">DESIGN WORKSPACE</p><h1>나의 기준으로,<br/>다음 화면도.</h1><p className="rail-copy">화면을 비교하고 선택한 이유를<br/>다시 쓸 수 있는 규칙으로 남깁니다.</p>
      <button className="new-session" onClick={()=>open(null)}>＋ 새 디자인 협의</button>
      <div className="session-heading">저장된 협의 <span>{sessions.length}</span></div>
      <nav aria-label="협의 목록">{sessions.length===0?<p className="empty">첫 협의를 시작해 보세요.</p>:sessions.map(item=><button className={`session-link ${id===item.id?'active':''}`} key={item.id} onClick={()=>open(item.id)}><span>{item.purpose}</span><small>{item.saved?'팩 저장 완료':item.selected?'협의 중':'후보 선택 전'}</small></button>)}</nav>
      </div><div className="rail-bottom"><span className="status-dot"/> 로컬 저장 · 모델 API 호출 없음</div></aside>
    <main id="main"><header className="topbar"><span>개인 디자인 워크벤치</span><span className="pill">직접 작성한 후보로 시작</span></header>
    <div className="content">
    {error&&<div role="alert" className="alert"><span>{error}</span><button onClick={()=>void perform(async()=>{if(id)await refresh(id);await refreshList();})}>다시 연결</button></div>}
    {notice&&<p className="notice" role="status">{notice}</p>}
    {!id?<section className="intro"><p className="overline">01 / CONTEXT</p><h2>어떤 페이지를<br/>만들고 싶으세요?</h2><p>누가 방문하고, 무엇을 알거나 하길 원하는지 알려주세요.<br/>색상이나 글꼴을 먼저 정할 필요는 없습니다.</p>
      <form onSubmit={e=>{e.preventDefault();void perform(async()=>{const work=await api<WorkSession>('/api/sessions',{purpose});await refreshList();open(work.session.id);});}}>
        <label htmlFor="purpose">페이지의 목적</label><textarea id="purpose" rows={4} maxLength={1000} value={purpose} onChange={e=>{setPurpose(e.target.value);keep('design-purpose',e.target.value);}} required/>
        <button className="primary" disabled={busy||!purpose.trim()}>후보 비교 시작 <span>↗</span></button>
      </form><div className="intro-note"><strong>먼저 비교하고, 그다음 규칙으로.</strong><p>같은 콘텐츠의 두 예시를 살펴보세요. 선택만으로 취향이 확정되지는 않습니다.</p></div>
      <label className="import-control">이전에 내보낸 협의 가져오기<input type="file" accept=".json,application/json" disabled={busy} onChange={e=>{const file=e.target.files?.[0];if(!file)return;void perform(async()=>{if(file.size>2_000_000)throw Error('파일은 2MB 이하여야 합니다.');const work=await api<WorkSession>('/api/import',JSON.parse(await file.text()));await refreshList();open(work.session.id);setNotice('가져온 규칙은 제안으로 복원했습니다. 다시 확인하고 수용해 주세요.');});e.target.value='';}}/></label>
    </section>:!view?<p role="status">협의 내용을 불러오는 중입니다.</p>:<>
      <section className="brief"><h2 title={view.session.brief.purpose}>{view.session.brief.purpose}</h2><div className="brief-meta"><span>방문자 · {view.session.brief.audience}</span><span>핵심 행동 · 소개 확인 → 문의 시작</span></div></section>
      <nav className="workflow-nav" aria-label="협의 단계"><button aria-pressed={step==='compare'} disabled={busy} onClick={()=>changeStep('compare')}>01 화면 비교</button><button aria-pressed={step==='feedback'} disabled={busy||!view.selected} onClick={()=>changeStep('feedback')}>02 피드백{pending?' · 반영 대기':''}</button><button aria-pressed={step==='rules'} disabled={busy||!view.selected} onClick={()=>changeStep('rules')}>03 규칙 확인{view.conflicts.length?` · 충돌 ${view.conflicts.length}`:view.saved?' · 저장됨':''}</button></nav>
      <section className="comparison" hidden={step!=='compare'} aria-labelledby="compare-title"><div className="section-head"><div><h2 id="compare-title">어느 쪽이 더 나다운가요?</h2></div><div className="segmented" aria-label="미리보기 화면 크기"><button aria-pressed={width==='desktop'} onClick={()=>setWidth('desktop')}>넓은 화면</button><button aria-pressed={width==='mobile'} onClick={()=>setWidth('mobile')}>모바일</button></div></div>
        <p className="section-copy">콘텐츠와 기능은 같습니다. 정보의 배치와 읽는 리듬을 비교해 보세요.</p>
        <div className="carousel" role="region" aria-roledescription="캐러셀" aria-label="디자인 후보" tabIndex={0} onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();moveCandidate(e.key==='ArrowLeft'?-1:1);}}}><div className="carousel-nav"><button aria-label="이전 후보" onClick={()=>moveCandidate(-1)}>←</button><div className="candidate-tabs">{directions.map((item,index)=><button key={item.id} aria-label={`${item.label} 후보 보기`} aria-pressed={index===candidateIndex} onClick={()=>setCandidateIndex(index)}>{item.label}</button>)}</div><span className="carousel-count" aria-live="polite">{candidateIndex+1} / {directions.length}</span><button aria-label="다음 후보" onClick={()=>moveCandidate(1)}>→</button></div>
        <div className="candidates">{directions.map((candidate,index)=>index===candidateIndex&&<article className={`candidate ${view.selected===candidate.id?'selected':''}`} key={candidate.id} aria-label={`${candidate.label} 후보`}>
          <div className="candidate-head"><span className="candidate-number">0{index+1}</span><div><h3>{candidate.label}</h3><p>{candidate.tag}</p></div>{view.selected===candidate.id&&<span className="selected-label">선택됨</span>}</div>
          <div className={`preview ${width}`}><iframe title={`${candidate.label} 후보 미리보기`} sandbox="" referrerPolicy="no-referrer" src={`${view.previewOrigin}/preview/${view.session.id}/${candidate.id}?token=${view.previewToken}`}/></div>
          <div className="candidate-foot"><p>{candidate.description}</p><button disabled={busy||locked||view.session.feedback.length>0} aria-pressed={view.selected===candidate.id} onClick={()=>void perform(async()=>{await mutation('select',{direction:candidate.id});changeStep('feedback');})}>{view.selected===candidate.id?'이 방향을 선택했어요':'이 방향으로 시작'} <span>↗</span></button></div>
        </article>)}</div></div>
      </section>
      {view.selected&&<section className="decision-grid" hidden={step==='compare'}><div className="feedback-panel step-panel" hidden={step!=='feedback'}><p className="overline">02 / CONVERSATION</p><h2>마음에 드는 점과 바꾸고 싶은 점.</h2><p>“제목은 좋지만 간격은 조금 줄여줘”처럼 편하게 남겨주세요.</p>
        {view.session.feedback.length>0&&<ul className="feedback-history">{view.session.feedback.map(item=><li key={item.id}><p>{item.text}</p><small>{view.processedFeedbackIds.includes(item.id)?'규칙 제안에 반영됨':'저장됨 · 에이전트 반영 대기'}</small></li>)}</ul>}
        {!locked&&<form onSubmit={e=>{e.preventDefault();void perform(async()=>{await mutation('feedback',{text:feedback});setFeedback('');keep(`design-feedback-${id}`,'');setNotice('피드백을 저장했습니다. 기존 에이전트 대화에서 반영을 요청해 주세요.');});}}><label htmlFor="feedback">디자인 피드백</label><textarea id="feedback" rows={4} maxLength={4000} value={feedback} onChange={e=>{setFeedback(e.target.value);keep(`design-feedback-${id}`,e.target.value);}}/><button className="secondary" disabled={busy||!feedback.trim()}>피드백 저장</button></form>}
        {pending&&<div className="handoff"><strong>피드백 저장됨 · AI 반영 대기</strong><p>기존 Codex·Claude Code 대화에서 “저장한 피드백을 반영해줘”라고 요청하세요. 브라우저 제출만으로 AI가 실행되지는 않습니다.</p><button onClick={()=>void perform(async()=>{const result=await api<{path:string}>(`/api/sessions/${id}/handoff`);setNotice(`에이전트 전달 파일: ${result.path}`);})}>전달 파일 확인</button></div>}
        {view.lastSubmission&&!pending&&<p className="notice">에이전트 규칙 제안 반영 완료. 후보 화면은 직접 작성한 예시이며 제안에 따라 자동 재생성되지 않습니다.</p>}
        <button className="secondary" onClick={()=>changeStep('rules')}>규칙 확인으로 이동 →</button>
      </div><div className="rules-panel step-panel" hidden={step!=='rules'}><p className="overline">03 / AGREEMENT</p><h2>다음에도 지킬 기준.</h2><p>규칙과 토큰을 개인 팩에 저장합니다. 실제 화면 품질은 아직 검수 전입니다.</p>
        {view.conflicts.map(conflict=><div className="conflict" key={conflict.id}><strong>선택이 필요한 규칙</strong><p>{conflict.question}</p><p className="muted">{conflict.recommendedReason}</p><span>이번 선택은 개인 팩에 적용할 규칙을 정합니다.</span>{conflict.options.map(option=><button key={option.ruleId} disabled={busy||locked} onClick={()=>void perform(()=>mutation('conflict',{conflictId:conflict.id,selectedRuleId:option.ruleId}))}>{option.statement}{option.ruleId===conflict.recommendedId?' · 추천':''}</button>)}</div>)}
        <ul className="rules">{view.session.rules.filter(rule=>!view.session.answers.some(answer=>answer.selectedRuleId!==rule.id&&view.session.rules.find(other=>other.id===answer.selectedRuleId)?.effect.key===rule.effect.key)).map(rule=><li key={rule.id}><span className="rule-mark">↳</span><div><strong>{rule.statement}</strong><p>{rule.intent}</p><small>{rule.status==='accepted'?'수용됨':view.lastSubmission?'에이전트 제안':'직접 작성한 후보의 예시 규칙'}</small><details><summary>적용 조건과 확인 방법</summary><p>{rule.appliesWhen.join(' · ')}</p><p>{rule.verification.description}</p></details></div></li>)}</ul>
        {view.saved?<div className="saved" role="status"><strong>✓ 개인 디자인 팩 저장 완료</strong><p>{view.draft.name} · 버전 {view.saved.version}</p><a href={`/api/sessions/${id}/pack`}>팩 JSON 내보내기 ↓</a></div>:<><button className="primary save" disabled={busy||pending||view.conflicts.length>0} onClick={()=>void perform(()=>mutation('save'))}>{view.publication?'수용한 팩 저장 재시도':'이 규칙을 수용하고 팩 저장'} <span>↗</span></button>{pending&&<p className="muted">피드백이 반영된 규칙을 확인한 후 저장할 수 있습니다.</p>}</>}
      </div></section>}
      <footer className="session-footer"><span>협의 기록은 이 컴퓨터에 저장됩니다.</span><a href={`/api/sessions/${id}/export`}>협의 내보내기 ↓</a></footer>
    </>}
    </div></main>
  </div>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
