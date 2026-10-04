import { test, expect } from '@playwright/test';
import { WorkbenchService } from '../src/server/service.js';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';

test('select, accept, save, reload and export using the browser',async({page})=>{
  await page.goto('/');await page.getByLabel('페이지의 목적').fill('테스트 서비스 소개');
  await page.getByRole('button',{name:'후보 비교 시작'}).click();
  await expect(page.getByRole('heading',{name:'어느 쪽이 더 나다운가요?'})).toBeVisible();
  const url=page.url();
  await expect(page.frameLocator('iframe').first().getByRole('heading',{name:/복잡한 생각을/})).toBeVisible();
  await page.getByRole('button',{name:'이 방향으로 시작'}).first().click();
  await page.getByRole('button',{name:'이 규칙을 수용하고 팩 저장'}).click();
  await expect(page.getByText('✓ 개인 디자인 팩 저장 완료')).toBeVisible();
  await page.reload();await expect(page.getByText('✓ 개인 디자인 팩 저장 완료')).toBeVisible();expect(page.url()).toBe(url);
  const download=page.waitForEvent('download');await page.getByRole('link',{name:'팩 JSON 내보내기'}).click();
  expect((await download).suggestedFilename()).toMatch(/^pack-.*\.json$/);
});
test('feedback survives reload and offline failure without pretending AI reflection',async({page})=>{
  await page.goto('/');await page.getByRole('button',{name:'후보 비교 시작'}).click();
  await page.getByRole('button',{name:'이 방향으로 시작'}).nth(1).click();
  await page.getByLabel('디자인 피드백').fill('과한 색상 없이 여백을 조금 넓혀 주세요.');
  await page.getByRole('button',{name:'피드백 저장',exact:true}).click();
  await expect(page.getByText('피드백 저장됨 · AI 반영 대기',{exact:true})).toBeVisible();
  await expect(page.getByRole('button',{name:'이 규칙을 수용하고 팩 저장'})).toBeDisabled();
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
  await page.getByRole('button',{name:'모바일',exact:true}).click();
  await expect(page.getByLabel('디자인 피드백')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
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
  await page.reload();await expect(page.getByText('선택이 필요한 규칙',{exact:true})).toBeVisible();
  await expect(page.getByRole('button',{name:'이 규칙을 수용하고 팩 저장'})).toBeDisabled();
  await page.getByRole('button',{name:/넓은 여백과 큰 제목으로 읽는 순서를 만든다/}).click();
  await expect(page.getByText('선택이 필요한 규칙',{exact:true})).toHaveCount(0);
  await page.getByRole('button',{name:'이 규칙을 수용하고 팩 저장'}).click();
  await expect(page.getByText('✓ 개인 디자인 팩 저장 완료')).toBeVisible();
  const exported=await (await page.request.get(`/api/sessions/${id}/export`)).json();
  await page.getByRole('button',{name:'＋ 새 디자인 협의'}).click();
  await page.locator('input[type=file]').setInputFiles({name:'session.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});
  await expect(page.getByRole('button',{name:'이 규칙을 수용하고 팩 저장'})).toBeEnabled();
  await expect(page.getByText('✓ 개인 디자인 팩 저장 완료')).toHaveCount(0);
});

test('development file serving cannot read the private data workspace',async({page})=>{
  const file=path.resolve('.design-workspace/e2e/private-probe.txt');
  const marker='PRIVATE-WORKSPACE-PROBE';await writeFile(file,marker);
  await page.goto('/');
  const response=await page.request.get(`/@fs/${file.replaceAll('\\','/')}`);
  expect(response.status()).toBe(403);expect((await response.text()).includes(marker)).toBe(false);
});
