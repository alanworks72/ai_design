import path from 'node:path';
import { WorkbenchService } from './service.js';

const id=process.argv[2];
if(!id)throw new Error('사용법: npm run agent-task -- <session-id>');
const service=await WorkbenchService.create(path.resolve(process.env.DESIGN_WORKSPACE??'.design-workspace'));
await service.sessions.locked(id,async()=>service.sessions.handoff(await service.sessions.read(id)));
console.log(`작업 파일: ${path.join(service.sessions.root,'handoffs',`${id}.json`)}\n계약: docs/AGENT_TASK.md\n현재 에이전트가 요청을 읽고 응답 JSON을 작성한 뒤 agent-submit을 실행하세요.`);
