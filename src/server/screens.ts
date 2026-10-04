import { contentHash, ContractError, validateDraft } from '../core/index.js';
import type { PackDraft, Rule, Token } from '../core/types.js';
import type { Direction } from './model.js';
import { tokenKinds } from '../design/library.js';
import { referenceScreenHtml } from '../design/render.js';

export const rendererVersion = 'blocks-2.0';
export type RendererVersion='blocks-1.0'|typeof rendererVersion;
export interface Screen {
  direction: Direction;
  title: string;
  eyebrow: string;
  summary: string;
  action: string;
  sections: { id:string; layout:'text'|'cards'|'steps'; title:string; body:string; items:{title:string;body:string}[] }[];
}
export interface ScreenSnapshot {
  revision:number; rendererVersion:RendererVersion; screen:Screen; rules:Rule[]; tokens:Token[]; reason:string; hash:string;
}
function fields(value:unknown, keys:string[]): asserts value is Record<string,unknown> {
  if (!value || typeof value!=='object' || Array.isArray(value) || Object.keys(value).sort().join(',')!==keys.sort().join(',')) throw new ContractError('Invalid screen fields');
}
function text(value:unknown, maximum:number): asserts value is string {
  if(typeof value!=='string' || !value.trim() || value.length>maximum) throw new ContractError('Invalid screen text');
}
export function validateScreen(input:unknown):Screen {
  fields(input,['direction','title','eyebrow','summary','action','sections']);
  if(input.direction!=='editorial' && input.direction!=='workspace') throw new ContractError('Invalid screen direction');
  text(input.title,300);text(input.eyebrow,100);text(input.summary,2000);text(input.action,80);
  if(!Array.isArray(input.sections) || input.sections.length<1 || input.sections.length>12) throw new ContractError('Use 1–12 screen sections');
  const ids=new Set<string>();
  for(const section of input.sections) {
    fields(section,['id','layout','title','body','items']);
    if(typeof section.id!=='string' || !/^[a-z][a-z0-9-]{0,40}$/.test(section.id) || section.id==='contact' || ids.has(section.id)) throw new ContractError('Invalid section identifier');
    ids.add(section.id);text(section.title,200);text(section.body,2000);
    if(!['text','cards','steps'].includes(section.layout as string) || !Array.isArray(section.items) || section.items.length>12) throw new ContractError('Invalid section layout');
    for(const item of section.items) {fields(item,['title','body']);text(item.title,200);text(item.body,2000);}
  }
  return structuredClone(input) as unknown as Screen;
}
export function snapshot(screen:Screen,draft:PackDraft,revision:number,reason:string,version:RendererVersion=rendererVersion):ScreenSnapshot {
  text(reason,2000);validateScreen(screen);
  for(const token of draft.tokens)if(tokenKinds[token.id] && tokenKinds[token.id]!==token.kind)throw new ContractError(`Screen token kind mismatch: ${token.id}`);
  const data={revision,rendererVersion:version,screen,rules:draft.rules,tokens:draft.tokens,reason};
  return {...structuredClone(data),hash:contentHash(data)};
}
export function validateSnapshot(input:unknown,draft:PackDraft):ScreenSnapshot {
  fields(input,['revision','rendererVersion','screen','rules','tokens','reason','hash']);
  if(!Number.isSafeInteger(input.revision) || (input.revision as number)<1 || !['blocks-1.0',rendererVersion].includes(input.rendererVersion as string)) throw new ContractError('Invalid screen revision');
  const checked=validateDraft({...draft,rules:input.rules,tokens:input.tokens,assets:[],baselines:[]});
  const result=snapshot(validateScreen(input.screen),checked,input.revision as number,input.reason as string,input.rendererVersion as RendererVersion);
  if(input.hash!==result.hash) throw new ContractError('Screen evidence hash mismatch');
  return result;
}
export function latestScreen(history:ScreenSnapshot[],direction:Direction,previous=false) {
  const items=history.filter(item=>item.screen.direction===direction);
  return items.at(previous?-2:-1);
}
const escape=(text:string)=>text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
// No arbitrary HTML, CSS, scripts, URLs or remote assets enter this renderer.
export function screenHtml(input:ScreenSnapshot):string {
  if(input.rendererVersion==='blocks-2.0')return referenceScreenHtml(input);
  const screen=input.screen;
  const variables=input.tokens.map(token=>`--${token.id.replaceAll('.','-')}:${token.value};`).join('');
  return `<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(screen.title)}</title><style>
  :root{${variables}}*{box-sizing:border-box}html{scroll-behavior:auto}body{margin:0;background:var(--surface-page,#f7f5ef);color:var(--text-primary,#292c28);font-family:var(--font-body,Arial,sans-serif);line-height:1.65;overflow-wrap:anywhere}a{color:inherit}main{max-width:1160px;margin:auto;padding:32px clamp(20px,5vw,64px)}nav{display:flex;justify-content:space-between;gap:24px;border-bottom:1px solid var(--border-subtle,#dadbd4);padding-bottom:18px;font-size:13px}.hero{padding:var(--space-section,48px) 0}h1{font-size:var(--type-display,clamp(32px,5vw,64px));line-height:1.12;letter-spacing:-.04em;max-width:900px;margin:16px 0 24px}h2{font-size:28px;line-height:1.3;margin:0 0 16px}h3{font-size:19px;line-height:1.4;margin:0 0 12px}p{margin:0 0 20px;white-space:pre-line}.summary{max-width:700px;font-size:18px}.eyebrow{font-size:12px;letter-spacing:.13em;text-transform:uppercase}.action{display:inline-block;padding:12px 22px;background:var(--action-primary,#292c28);color:var(--action-text,#ffffff);border-radius:var(--radius-control,4px);text-decoration:none}section{padding:var(--space-section,48px) 0;border-top:1px solid var(--border-subtle,#dadbd4)}.items{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-card,24px)}.item{padding:24px;background:var(--surface-card,#ffffff);border-radius:var(--radius-card,4px)}.steps .items{grid-template-columns:1fr}.steps .item{display:grid;grid-template-columns:220px 1fr;gap:24px}.workspace .hero{display:grid;grid-template-columns:1.4fr 1fr;gap:32px;align-items:center}.workspace .summary{border-left:3px solid var(--action-primary,#292c28);padding-left:24px}footer{padding:32px 0;font-size:13px;border-top:1px solid var(--border-subtle,#dadbd4)}@media(max-width:700px){main{padding:24px 20px}.items,.workspace .hero,.steps .item{grid-template-columns:1fr}.hero,section{padding:32px 0}h1{font-size:36px}h2{font-size:24px}}
  </style><body class="${screen.direction}"><main><nav><strong>${escape(screen.eyebrow)}</strong><a href="#contact">${escape(screen.action)}</a></nav><header class="hero"><div><p class="eyebrow">${escape(screen.eyebrow)}</p><h1>${escape(screen.title)}</h1></div><div><p class="summary">${escape(screen.summary)}</p><a class="action" href="#contact">${escape(screen.action)}</a></div></header>${screen.sections.map(section=>`<section class="${section.layout}" id="${section.id}"><h2>${escape(section.title)}</h2><p>${escape(section.body)}</p><div class="items">${section.items.map(item=>`<article class="item"><h3>${escape(item.title)}</h3><p>${escape(item.body)}</p></article>`).join('')}</div></section>`).join('')}<footer id="contact">${escape(screen.action)} · 연락 기능은 연결되지 않은 화면 예시입니다.</footer></main></body></html>`;
}
