import { createServer } from 'node:http';
import type { IncomingMessage, Server, ServerResponse } from 'node:http';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ContractError, WorkspaceBusyError } from '../core/index.js';
import { WorkbenchService } from './service.js';
import { candidateHtml } from './preview.js';
import { latestScreen, screenHtml } from './screens.js';

const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../workbench');
const cookieName = 'design_workbench';
async function listen(server: Server, port: number): Promise<number> {
  return new Promise((resolve,reject)=>{
    server.once('error',reject); server.listen(port,'127.0.0.1',()=>{ server.off('error',reject); resolve((server.address() as {port:number}).port); });
  });
}
function json(res: ServerResponse, status: number, value: unknown) {
  res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}); res.end(JSON.stringify(value));
}
async function body(req: IncomingMessage): Promise<Record<string,unknown>> {
  if (req.headers['content-type']?.split(';')[0] !== 'application/json') throw new ContractError('JSON 요청만 허용합니다.');
  const chunks: Buffer[] = []; let size = 0;
  for await (const chunk of req) { size += Buffer.byteLength(chunk); if (size > 2_000_000) throw new ContractError('요청이 너무 큽니다.'); chunks.push(Buffer.from(chunk)); }
  try { const input: unknown = JSON.parse(Buffer.concat(chunks).toString()); if (!input || Array.isArray(input) || typeof input !== 'object') throw Error(); return input as Record<string,unknown>; }
  catch { throw new ContractError('올바른 JSON 객체를 보내 주세요.'); }
}
function fields(input: Record<string,unknown>, names: string[]) {
  if (Object.keys(input).sort().join(',') !== [...names].sort().join(',')) throw new ContractError('지원하지 않는 요청 필드입니다.');
}
function revision(input: unknown): number {
  if (!Number.isSafeInteger(input) || (input as number)<0) throw new ContractError('Invalid revision'); return input as number;
}
export async function startWorkbench(options: { root:string; port?:number; previewPort?:number; vite?:boolean }) {
  const service = await WorkbenchService.create(options.root);
  const capability = randomBytes(32).toString('hex');
  const authorized = (req:IncomingMessage) => {
    const value = req.headers.cookie?.split(';').map(item=>item.trim()).find(item=>item.startsWith(`${cookieName}=`))?.slice(cookieName.length+1) ?? '';
    return Buffer.byteLength(value) === Buffer.byteLength(capability) && timingSafeEqual(Buffer.from(value),Buffer.from(capability));
  };
  let uiOrigin = '';
  let previewOrigin = '';
  const preview = createServer(async(req,res)=>{
    try {
      if (req.headers.host !== new URL(previewOrigin).host || req.method !== 'GET') { res.writeHead(403); res.end(); return; }
      const url = new URL(req.url!,previewOrigin);
      const match = /^\/preview\/(session-[a-z0-9-]+)\/(editorial|workspace)$/.exec(url.pathname);
      if (!match || url.searchParams.get('token') !== capability) { res.writeHead(403); res.end(); return; }
      const work = await service.sessions.read(match[1]!);
      res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',
        'Content-Security-Policy':`default-src 'none'; style-src 'unsafe-inline'; frame-ancestors ${uiOrigin}; form-action 'none'; base-uri 'none'`,
        'Referrer-Policy':'no-referrer'});
      const direction=match[2] as 'editorial'|'workspace';
      const generated=latestScreen(work.generation.history,direction,url.searchParams.get('previous')==='1');
      res.end(generated?screenHtml(generated):candidateHtml(direction,work.session.brief.purpose));
    } catch { res.writeHead(404); res.end('미리보기를 불러올 수 없습니다.'); }
  });
  const previewPort = await listen(preview,options.previewPort ?? 4311); previewOrigin = `http://127.0.0.1:${previewPort}`;
  let vite: Awaited<ReturnType<typeof import('vite')['createServer']>>|undefined;
  if (options.vite !== false) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({ configFile:false,root:base,server:{ middlewareMode:true,host:'127.0.0.1',hmr:false,ws:false,
      fs:{ allow:[base,path.resolve('node_modules')],deny:['**/.ai-local/**','**/.git/**','**/.design-workspace/**','**/.env*'] } },
      esbuild:{jsx:'automatic'},build:{outDir:path.resolve('dist/workbench'),emptyOutDir:true} });
  }
  const server = createServer(async(req,res)=>{
    try {
      if (req.headers.host !== new URL(uiOrigin).host) { json(res,403,{error:'허용하지 않는 호스트입니다.'}); return; }
      const url = new URL(req.url!,uiOrigin);
      if (!url.pathname.startsWith('/api/')) {
        if (req.method !== 'GET') { json(res,405,{error:'Method not allowed'}); return; }
        res.setHeader('Set-Cookie',`${cookieName}=${capability}; HttpOnly; SameSite=Strict; Path=/`);
        res.setHeader('Referrer-Policy','no-referrer'); res.setHeader('X-Frame-Options','DENY');
        if (vite) vite.middlewares(req,res); else { res.writeHead(200,{'Content-Type':'text/html'});res.end('Workbench test server'); }
        return;
      }
      if (!authorized(req)) { json(res,401,{error:'비교 화면을 다시 열어 주세요.'}); return; }
      if (req.method === 'POST' && (req.headers.origin !== uiOrigin || req.headers['x-workbench'] !== '1')) {
        json(res,403,{error:'허용하지 않는 요청 출처입니다.'}); return;
      }
      if (url.pathname === '/api/sessions' && req.method === 'GET') {
        json(res,200,(await service.sessions.list()).map(work=>({id:work.session.id,purpose:work.session.brief.purpose,saved:work.saved,selected:work.selected}))); return;
      }
      if (url.pathname === '/api/sessions' && req.method === 'POST') {
        const input=await body(req);fields(input,['purpose']); if(typeof input.purpose!=='string') throw new ContractError('목적을 입력해 주세요.');
        json(res,201,service.view(await service.create(input.purpose)));return;
      }
      if (url.pathname === '/api/import' && req.method === 'POST') {
        json(res,201,service.view(await service.import(await body(req))));return;
      }
      const match=/^\/api\/sessions\/(session-[a-z0-9-]+)(?:\/(select|feedback|conflict|save|export|pack|handoff|reuse))?$/.exec(url.pathname);
      if (!match) { json(res,404,{error:'경로를 찾을 수 없습니다.'});return; }
      const id=match[1]!,action=match[2];
      if(req.method==='GET') {
        const work=await service.sessions.read(id);
        if(action==='export') {res.setHeader('Content-Disposition',`attachment; filename="${id}.json"`);json(res,200,work);return;}
        if(action==='pack') { if(!work.saved) throw new ContractError('저장된 팩이 없습니다.');
          res.setHeader('Content-Disposition',`attachment; filename="${work.saved.id}.json"`);json(res,200,await service.packs.read(work.saved.id,work.saved.version));return; }
        if(action==='handoff') { await service.sessions.locked(id,async()=>service.sessions.handoff(await service.sessions.read(id)));json(res,200,{path:`.design-workspace/handoffs/${id}.json`});return; }
        if(action) {json(res,405,{error:'Method not allowed'});return;}
        json(res,200,{...service.view(work),previewOrigin,previewToken:capability});return;
      }
      if(req.method!=='POST') {json(res,405,{error:'Method not allowed'});return;}
      const input=await body(req);const rev=revision(input.revision);
      let result;
      if(action==='select') {fields(input,['revision','direction']);result=await service.select(id,rev,input.direction);}
      else if(action==='feedback') {fields(input,['revision','text']);result=await service.feedback(id,rev,input.text);}
      else if(action==='conflict') {fields(input,['revision','conflictId','selectedRuleId']);
        if(typeof input.conflictId!=='string'||typeof input.selectedRuleId!=='string') throw new ContractError('Invalid conflict');
        result=await service.conflict(id,rev,input.conflictId,input.selectedRuleId);}
      else if(action==='save') {fields(input,['revision']);result=await service.save(id,rev);}
      else if(action==='reuse') {fields(input,['revision','purpose']);
        const source=await service.sessions.read(id);if(source.session.revision!==rev)throw new ContractError('최신 협의를 확인해 주세요.');
        if(typeof input.purpose!=='string')throw new ContractError('새 프로젝트의 목적을 입력해 주세요.');
        result=await service.reuse(id,input.purpose);}
      else {json(res,404,{error:'경로를 찾을 수 없습니다.'});return;}
      json(res,200,service.view(result));
    } catch(error) {
      if(error instanceof ContractError || error instanceof WorkspaceBusyError) json(res,409,{error:error.message});
      else {console.error('Local request failed:',error instanceof Error ? error.name : 'Unknown error');json(res,500,{error:'저장에 실패했습니다. 입력은 유지됩니다. 다시 시도해 주세요.'});}
    }
  });
  try { const port=await listen(server,options.port ?? 4310);uiOrigin=`http://127.0.0.1:${port}`; }
  catch(error) {await vite?.close();preview.close();throw error;}
  return { service,origin:uiOrigin,previewOrigin,close:async()=>{
    await vite?.close();await Promise.all([new Promise<void>(resolve=>server.close(()=>resolve())),new Promise<void>(resolve=>preview.close(()=>resolve()))]);
  } };
}
