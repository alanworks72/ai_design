import { test, expect } from '@playwright/test';
import { WorkbenchService } from '../src/server/service.js';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import { directionRule } from '../src/server/model.js';
import type { Screen } from '../src/server/screens.js';

test('select, accept, save, reload and export using the browser',async({page})=>{
  await page.goto('/');await page.getByLabel('페이지의 목적').fill('테스트 서비스 소개');
  await page.getByRole('button',{name:'후보 비교 시작'}).click();
  await expect(page.getByRole('heading',{name:'어느 쪽이 더 나다운가요?'})).toBeVisible();
  const url=page.url();
  await expect(page.frameLocator('iframe').first().getByRole('heading',{name:/복잡한 생각을/})).toBeVisible();
  await page.getByRole('button',{name:'이 방향으로 시작'}).first().click();
  await page.getByRole('button',{name:/03 규칙 확인/}).click();
  await page.getByRole('button',{name:'이 규칙을 수용하고 팩 저장'}).click();
  await expect(page.getByText('✓ 개인 디자인 팩 저장 완료')).toBeVisible();
  await page.reload();await expect(page.getByText('✓ 개인 디자인 팩 저장 완료')).toBeVisible();expect(page.url()).toBe(url);
  const download=page.waitForEvent('download');await page.getByRole('link',{name:'팩 JSON 내보내기'}).click();
  expect((await download).suggestedFilename()).toMatch(/^pack-.*\.json$/);
});
test('feedback survives reload and offline failure without pretending AI reflection',async({page})=>{
  await page.goto('/');await page.getByRole('button',{name:'후보 비교 시작'}).click();
  await page.getByRole('button',{name:'다음 후보',exact:true}).click();
  await page.getByRole('button',{name:'이 방향으로 시작'}).click();
  await page.getByLabel('디자인 피드백').fill('과한 색상 없이 여백을 조금 넓혀 주세요.');
  await page.getByRole('button',{name:'피드백 저장',exact:true}).click();
  await expect(page.getByText('피드백 저장됨 · AI 반영 대기',{exact:true})).toBeVisible();
  await page.getByRole('button',{name:/03 규칙 확인/}).click();
  await expect(page.getByRole('button',{name:'이 규칙을 수용하고 팩 저장'})).toBeDisabled();
  await page.getByRole('button',{name:/02 피드백/}).click();
  await page.getByLabel('디자인 피드백').fill('추가로 제목은 짧게');await page.reload();
  await expect(page.getByLabel('디자인 피드백')).toHaveValue('추가로 제목은 짧게');
  await page.route('**/api/**',route=>route.abort());
  await page.getByRole('button',{name:'피드백 저장',exact:true}).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByLabel('디자인 피드백')).toHaveValue('추가로 제목은 짧게');
  await page.unroute('**/api/**');await page.getByRole('button',{name:'다시 연결'}).click();
});
for(const width of [360,768,1280]) test(`viewport ${width} retains controls without document overflow`,async({page})=>{
  await page.setViewportSize({width,height:1000});await page.goto('/');
  await page.getByRole('button',{name:'후보 비교 시작'}).click();await page.getByRole('button',{name:'이 방향으로 시작'}).first().click();
  await page.getByRole('button',{name:'01 화면 비교',exact:true}).click();
  await page.getByRole('button',{name:'모바일',exact:true}).click();
  await page.getByRole('button',{name:/02 피드백/}).click();
  await expect(page.getByLabel('디자인 피드백')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollHeight<=window.innerHeight)).toBe(true);
  await page.getByLabel('디자인 피드백').focus();await page.keyboard.type('키보드 입력');
  await expect(page.getByLabel('디자인 피드백')).toHaveValue('키보드 입력');
  await page.keyboard.press('Tab');await expect(page.getByRole('button',{name:'피드백 저장',exact:true})).toBeFocused();
});

test('agent proposal shows a conflict, waits for a browser decision and imports without acceptance',async({page})=>{
  await page.goto('/');await page.getByRole('button',{name:'후보 비교 시작'}).click();
  await page.getByRole('button',{name:'이 방향으로 시작'}).first().click();
  await page.getByLabel('디자인 피드백').fill('정보 구조를 다시 비교하고 싶어요.');
  await page.getByRole('button',{name:'피드백 저장',exact:true}).click();
  const id=page.url().split('/').at(-1)!;
  const service=await WorkbenchService.create(path.resolve('.design-workspace/e2e'));
  const work=await service.sessions.read(id);const rule=work.session.rules[0]!;
  await service.submit({sessionId:id,expectedRevision:work.session.revision,feedbackIds:work.session.feedback.map(item=>item.id),
    selected:'editorial',rules:[rule,{...rule,id:'other-layout',statement:'요약과 세부 정보를 나누어 배치한다.',effect:{key:rule.effect.key,value:'workspace'}}],tokens:work.draft.tokens});
  await page.reload();await page.getByRole('button',{name:/03 규칙 확인/}).click();await expect(page.getByText('선택이 필요한 규칙',{exact:true})).toBeVisible();
  await expect(page.getByRole('button',{name:'이 규칙을 수용하고 팩 저장'})).toBeDisabled();
  await page.getByRole('button',{name:/넓은 여백과 큰 제목으로 읽는 순서를 만든다/}).click();
  await expect(page.getByText('선택이 필요한 규칙',{exact:true})).toHaveCount(0);
  await page.getByRole('button',{name:'이 규칙을 수용하고 팩 저장'}).click();
  await expect(page.getByText('✓ 개인 디자인 팩 저장 완료')).toBeVisible();
  const exported=await (await page.request.get(`/api/sessions/${id}/export`)).json();
  await page.getByRole('button',{name:'＋ 새 디자인 협의'}).click();
  await page.locator('input[type=file]').setInputFiles({name:'session.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});
  await page.getByRole('button',{name:/03 규칙 확인/}).click();
  await expect(page.getByRole('button',{name:'이 규칙을 수용하고 팩 저장'})).toBeEnabled();
  await expect(page.getByText('✓ 개인 디자인 팩 저장 완료')).toHaveCount(0);
});

for(const size of [{width:1440,height:680},{width:360,height:640}])test(`carousel fits ${size.width}x${size.height} and browsing never selects a candidate`,async({page})=>{
  await page.setViewportSize(size);await page.goto('/');await page.getByRole('button',{name:'후보 비교 시작'}).click();
  await expect(page.locator('iframe')).toHaveCount(1);
  await page.getByRole('button',{name:'다음 후보',exact:true}).click();
  await expect(page.getByRole('heading',{name:'업무 도구',exact:true})).toBeVisible();
  await expect(page.getByRole('button',{name:/02 피드백/})).toBeDisabled();
  await page.getByRole('region',{name:'디자인 후보',exact:true}).press('ArrowLeft');
  await expect(page.getByRole('heading',{name:'읽기 중심',exact:true})).toBeVisible();
  const main=page.locator('#main');const frame=page.locator('iframe');
  expect(await main.evaluate(element=>element.scrollHeight<=element.clientHeight)).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollHeight<=window.innerHeight)).toBe(true);
  const box=await frame.boundingBox();expect(box!.height).toBeGreaterThan(100);
  await expect(page.getByRole('button',{name:'이 방향으로 시작'})).toBeInViewport();
});

test('development file serving cannot read the private data workspace',async({page})=>{
  const file=path.resolve('.design-workspace/e2e/private-probe.txt');
  const marker='PRIVATE-WORKSPACE-PROBE';await writeFile(file,marker);
  await page.goto('/');
  const response=await page.request.get(`/@fs/${file.replaceAll('\\','/')}`);
  expect(response.status()).toBe(403);expect((await response.text()).includes(marker)).toBe(false);
});

test('generated content updates in place, compares history and reuses the accepted pack in a portfolio',async({page})=>{
  const service=await WorkbenchService.create(path.resolve('.design-workspace/e2e'));
  const work=await service.create('생성 화면 브라우저 검증');
  const screen:Screen={direction:'editorial',title:'서비스의 목적을 먼저 보여줍니다.',eyebrow:'SERVICE',summary:'제공 내용과 진행 방식을 소개합니다.',action:'문의 안내 보기',sections:[{id:'details',layout:'cards',title:'제공 내용',body:'방문자가 필요한 정보를 찾습니다.',items:[{title:'내용 하나',body:'실제 연결은 없는 화면 예시입니다.'}]}]};
  const proposal={sessionId:work.session.id,expectedRevision:0,feedbackIds:[],selected:'editorial' as const,rules:[directionRule('editorial')],tokens:[{id:'text.primary',kind:'color' as const,value:'#123456',ruleIds:['layout-direction']}],screens:[screen],reason:'큰 제목과 명확한 제공 내용으로 시작합니다.'};
  await service.submit(proposal);
  await page.goto(`/sessions/${work.session.id}`);
  await expect(page.frameLocator('iframe').getByRole('heading',{name:screen.title})).toBeVisible();
  await expect(page.getByRole('button',{name:/02 피드백/})).toBeDisabled();
  await page.getByRole('button',{name:'이 방향으로 시작'}).click();
  await page.getByLabel('디자인 피드백').fill('제목을 더 짧게');await page.getByRole('button',{name:'피드백 저장',exact:true}).click();
  await expect(page.getByText('피드백 저장됨 · AI 반영 대기',{exact:true})).toBeVisible();
  const pending=await service.sessions.read(work.session.id);
  await service.submit({...proposal,expectedRevision:pending.session.revision,feedbackIds:pending.session.feedback.map(item=>item.id),screens:[{...screen,title:'필요한 일을 명확하게.'}],reason:'제목을 짧게 줄이고 기존 색상과 구성을 유지했습니다.'});
  await expect(page.getByText('화면·규칙 제안 반영 완료.',{exact:false})).toBeVisible();
  await page.getByRole('button',{name:'01 화면 비교',exact:true}).click();
  await expect(page.frameLocator('iframe').getByRole('heading',{name:'필요한 일을 명확하게.'})).toBeVisible();
  await page.getByRole('button',{name:'이전 화면 보기'}).click();
  await expect(page.frameLocator('iframe').getByRole('heading',{name:screen.title})).toBeVisible();
  await page.getByRole('button',{name:'현재 화면 보기'}).click();
  await page.getByRole('button',{name:/03 규칙 확인/}).click();await page.getByRole('button',{name:'이 규칙을 수용하고 팩 저장'}).click();
  await page.getByLabel('이 스타일을 사용할 새 프로젝트').fill('대표 작업을 소개하는 개인 포트폴리오');
  await page.getByRole('button',{name:'같은 팩으로 새 프로젝트'}).click();
  await expect(page.getByText('팩 v1 재사용',{exact:true})).toBeVisible();
  const project=await service.sessions.read(page.url().split('/').at(-1)!);
  await service.submit({...proposal,sessionId:project.session.id,rules:project.draft.rules,tokens:project.draft.tokens,screens:[{...screen,title:'문제를 해결한 작업들',sections:[{...screen.sections[0]!,title:'대표 프로젝트'}]}],reason:'색상과 배치 규칙을 유지하며 포트폴리오 콘텐츠를 구성했습니다.'});
  await expect(page.frameLocator('iframe').getByRole('heading',{name:'문제를 해결한 작업들'})).toBeVisible();
  for(const size of [{width:1280,height:800},{width:768,height:800},{width:360,height:640}]) {
    await page.setViewportSize(size);
    expect(await page.locator('#main').evaluate(element=>element.scrollHeight<=element.clientHeight)).toBe(true);
    expect(await page.frameLocator('iframe').locator('body').evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.getByRole('button',{name:'이 방향으로 시작'}).click();await page.getByRole('button',{name:/03 규칙 확인/}).click();
  await page.getByRole('button',{name:'이 프로젝트 화면 수용'}).click();await expect(page.getByText('✓ 프로젝트 화면 수용 완료')).toBeVisible();
  await page.reload();await expect(page.getByText('✓ 프로젝트 화면 수용 완료')).toBeVisible();
});
