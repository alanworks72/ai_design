import { readFile, lstat } from 'node:fs/promises';
import path from 'node:path';
import { WorkbenchService } from './service.js';
import type { Submission } from './service.js';

const filename = process.argv[2];
if(!filename) throw new Error('사용법: npm run agent-submit -- <response.json>');
const stat=await lstat(filename);
if(!stat.isFile() || stat.isSymbolicLink() || stat.size>2_000_000) throw new Error('Invalid response file');
const service=await WorkbenchService.create(path.resolve(process.env.DESIGN_WORKSPACE ?? '.design-workspace'));
const work=await service.submit(JSON.parse(await readFile(filename,'utf8')) as Submission);
console.log(`규칙 제안 반영 완료: ${work.session.id}, revision ${work.session.revision}. 사용자 수용은 아직 필요합니다.`);
