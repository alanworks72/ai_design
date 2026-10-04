import type { Source, Token, Rule, Layer } from '../core/types.js';

// Reviewed references, not installed services. No reference is a user acceptance.
export const designLibraryVersion='reference-1.0';
export const designSources:Source[]=[
  {id:'impeccable-context',layer:'context',title:'Impeccable · 제품과 화면의 과제',url:'https://github.com/pbakaus/impeccable',revision:'6e802bd0ed99f53180e2359fddab6da8d97970d9',usage:'design-reference',license:'Apache-2.0; guidance only',adopted:false},
  {id:'refero-editorial',layer:'direction',title:'Refero Styles · Intercom',url:'https://styles.refero.design/style/12255b63-e506-4bc1-a4cd-d05487de32f3',revision:'reviewed-2026-10-05',usage:'design-reference',license:'Reference only; no screen or document redistribution',adopted:false},
  {id:'refero-workspace',layer:'direction',title:'Refero Styles · Linear',url:'https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1',revision:'reviewed-2026-10-05',usage:'design-reference',license:'Reference only; no screen or document redistribution',adopted:false},
  {id:'carbon-spacing',layer:'tokens',title:'Carbon · 간격 스케일',url:'https://www.carbondesignsystem.com/building-blocks/foundations/spacing/overview/',revision:'reviewed-2026-10-05',usage:'design-reference',license:'Reference only',adopted:false},
  {id:'spectrum-semantics',layer:'tokens',title:'Spectrum · 의미 기반 토큰',url:'https://spectrum.adobe.com/foundations/design-data/design-tokens/',revision:'reviewed-2026-10-05',usage:'design-reference',license:'Reference only',adopted:false},
  {id:'mobbin-patterns',layer:'patterns',title:'Mobbin · 화면과 흐름',url:'https://mobbin.com/discover/apps/web',revision:'access-not-connected',usage:'design-reference',license:'External reference; licensed screens not included',adopted:false},
  {id:'refero-patterns',layer:'patterns',title:'Refero · 화면 패턴',url:'https://refero.design',revision:'access-not-connected',usage:'design-reference',license:'External reference; licensed screens not included',adopted:false},
  {id:'shadcn-button',layer:'assets',title:'shadcn · Button',url:'https://ui.shadcn.com/r/styles/new-york/button.json',revision:'sha256-4d8f39c3bd25e630b5962667722e8707e7b18122ad6842a5c22acf8a3ff9f93a',usage:'code-reuse',license:'MIT; third-party/shadcn-LICENSE.txt',adopted:false},
  {id:'vercel-audit',layer:'validation',title:'Vercel · Web Interface Guidelines',url:'https://github.com/vercel-labs/web-interface-guidelines',revision:'reviewed-2026-10-05',usage:'design-reference',license:'Reference only; no guideline text redistributed',adopted:false},
];
export const layerApplications:{layer:Layer;label:string;reference:string;status:string;application:string;target:string}[]=[
  {layer:'context',label:'제품 맥락',reference:'Impeccable',status:'원칙 반영',application:'목적·방문자·핵심 행동을 브리프로 전달. 운영 화면과 소개 화면의 과제를 구분합니다.',target:'PRODUCT.md · handoff.brief'},
  {layer:'direction',label:'디자인 방향',reference:'Refero Styles',status:'참고 기반 자체 구성',application:'읽기 중심은 밝은 종이·가벼운 큰 제목·비대칭 여백. 업무 도구는 어두운 표면·정밀한 경계·한 가지 행동 강조를 비교합니다.',target:'src/design/render.ts'},
  {layer:'tokens',label:'디자인 토큰',reference:'Carbon · Spectrum',status:'원칙 반영',application:'4/8/12/16/24/32/48/64/96px 간격과 본문·보조 글·표면·테두리·행동의 역할별 토큰을 실제 CSS에서 읽습니다.',target:'src/design/library.ts'},
  {layer:'patterns',label:'화면 패턴',reference:'Mobbin · Refero',status:'외부 화면 미연결',application:'현재 소개→제공 내용→진행 과정→문의 패턴은 자체 제작입니다. 두 서비스의 실제 화면·흐름을 가져온 것으로 표시하지 않습니다.',target:'src/design/render.ts · docs/DESIGN_LIBRARY.md'},
  {layer:'assets',label:'코드 공급',reference:'shadcn Registry',status:'Button 코드 재사용',application:'공식 Button의 variant·Slot·ref 구조를 로컬 CSS에 맞게 사용합니다. MCP와 블록 레지스트리는 아직 연결하지 않았습니다.',target:'src/workbench/components/button.tsx'},
  {layer:'validation',label:'검수',reference:'Impeccable · Vercel',status:'검사 기준 반영',application:'대비·좁은 화면·긴 콘텐츠·키보드·포커스를 검사하고 시각적 만족도는 사용자 검토로 남깁니다.',target:'e2e/design.spec.ts · docs/DESIGN_LIBRARY.md'},
];
type Direction='editorial'|'workspace';
export function profileTokens(direction:Direction):Token[] {
  const dark=direction==='workspace';
  const colors={ 'text.primary':dark?'#eef0f4':'#242320','text.secondary':dark?'#a6abb5':'#615e57',
    'surface.page':dark?'#111215':'#faf9f6','surface.card':dark?'#191b20':'#f0ede6',
    'border.subtle':dark?'#383b44':'#d9d5cc','action.primary':dark?'#dce9a4':'#292820','action.text':dark?'#171b10':'#ffffff' };
  const dimensions={'type.display':dark?'48px':'64px','type.body':'16px','type.heading':'24px','space.section':dark?'48px':'96px',
    'space.card':'24px','radius.control':dark?'6px':'4px','radius.card':dark?'12px':'4px','layout.measure':'1160px'};
  return [ ...Object.entries(colors).map(([id,value])=>({id,value,kind:'color' as const,ruleIds:['layout-direction']})),
    ...Object.entries(dimensions).map(([id,value])=>({id,value,kind:'dimension' as const,ruleIds:['layout-direction']})),
    {id:'font.body',kind:'font',value:'Pretendard, sans-serif',ruleIds:['layout-direction']},
    {id:'motion.duration',kind:'duration',value:'120ms',ruleIds:['layout-direction']} ];
}
export function profileSources(direction:Direction):Source[] {
  const ids=['impeccable-context',`refero-${direction}`,'carbon-spacing','spectrum-semantics','vercel-audit'];
  return designSources.map(source=>({...source,adopted:ids.includes(source.id)}));
}
export const tokenKinds:Record<string,Token['kind']>=Object.fromEntries(profileTokens('editorial').map(token=>[token.id,token.kind]));
export const generationGuidance={
  libraryVersion:designLibraryVersion,
  references:designSources,
  profiles:{editorial:profileTokens('editorial'),workspace:profileTokens('workspace')},
  layers:layerApplications,
  pattern:{id:'service-overview',origin:'locally-authored',flow:['서비스 이해','제공 내용','진행 방식','문의 안내'],states:['normal','long-content','narrow-viewport','contact-not-connected']},
  rules:['사용자 브리프와 수용된 팩이 참고 스타일보다 우선합니다. 충돌은 이유와 대안을 질문합니다.',
    '각 새 디자인 규칙은 참고 출처 또는 피드백 ID, 실제 소비되는 토큰, 검수 방법을 갖게 합니다.',
    '일반적인 동일 카드 격자를 페이지 전체 구조로 반복하지 않습니다. 목적에 따라 목록·과정·읽기 영역을 고릅니다.',
    '사용자가 제공하지 않은 고객 수·실적·리뷰·로고를 만들지 않습니다.',
    '위 profiles는 비교용 제안입니다. 기존 사용자의 토큰을 기본값으로 덮어쓰지 않습니다.'],
  component:{id:'shadcn-button',path:'src/workbench/components/button.tsx',dependencies:['@radix-ui/react-slot','class-variance-authority'],scope:'workbench-controls'},
};
export function referenceRule(rule:Rule,direction:Direction):Rule {
  return {...rule,origin:{type:'framework-reference',referenceId:`refero-${direction}`}};
}
