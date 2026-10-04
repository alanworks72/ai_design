import path from 'node:path';
import { startWorkbench } from './http.js';

const app = await startWorkbench({root:path.resolve(process.env.DESIGN_WORKSPACE ?? '.design-workspace'),
  port:Number(process.env.WORKBENCH_PORT ?? 4310),previewPort:Number(process.env.PREVIEW_PORT ?? 4311)});
console.log(`비교 화면: ${app.origin}`);
console.log('직접 작성한 후보 또는 제출된 생성 화면을 표시합니다. 화면 생성·피드백 반영은 기존 에이전트 대화에서 요청하세요.');
for(const signal of ['SIGINT','SIGTERM'] as const) process.on(signal,()=>{void app.close().then(()=>process.exit(0));});
