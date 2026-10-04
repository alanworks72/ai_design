import path from 'node:path';
import { startWorkbench } from './http.js';

const app = await startWorkbench({root:path.resolve(process.env.DESIGN_WORKSPACE ?? '.design-workspace'),
  port:Number(process.env.WORKBENCH_PORT ?? 4310),previewPort:Number(process.env.PREVIEW_PORT ?? 4311)});
console.log(`비교 화면: ${app.origin}`);
console.log('직접 작성한 후보로 시작합니다. 피드백 반영에는 기존 에이전트의 다음 턴이 필요합니다.');
for(const signal of ['SIGINT','SIGTERM'] as const) process.on(signal,()=>{void app.close().then(()=>process.exit(0));});
