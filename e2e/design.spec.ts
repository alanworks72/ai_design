import { test, expect } from '@playwright/test';
import { WorkbenchService } from '../src/server/service.js';
import path from 'node:path';

for(const direction of ['editorial','workspace'] as const)test(`${direction} reference renders local fonts, readable colors and long content without overflow`,async({page})=>{
  await page.goto('/');await page.getByLabel('페이지의 목적').fill('방문자가 제공 내용을 이해하고 문의할 수 있도록 안내합니다. '.repeat(12));
  await page.getByRole('button',{name:'후보 비교 시작'}).click();
  await page.waitForURL(/\/sessions\/session-[a-z0-9-]+$/);
  if(direction==='workspace')await page.getByRole('button',{name:'업무 도구 후보 보기',exact:true}).click();
  const id=page.url().split('/').at(-1)!;
  const service=await WorkbenchService.create(path.resolve('.design-workspace/e2e'));
  expect((await service.sessions.read(id)).selected).toBeNull();
  for(const width of [360,768,1280]) {
    await page.setViewportSize({width,height:800});
    const preview=page.frameLocator('iframe');
    await expect(preview.getByRole('heading',{name:/복잡한 생각을/})).toBeVisible();
    const frame=page.frames().find(frame=>frame.url().includes('/preview/'))!;
    const audit=await frame.evaluate(async()=>{
      await document.fonts.ready;
      const luminance=(rgb:string)=>{
        const channels=rgb.match(/\d+/g)!.slice(0,3).map(value=>{const x=Number(value)/255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;});
        return channels[0]!*.2126+channels[1]!*.7152+channels[2]!*.0722;
      };
      const contrast=(a:string,b:string)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
      const body=getComputedStyle(document.body),summary=getComputedStyle(document.querySelector('.summary')!),action=getComputedStyle(document.querySelector('.action')!);
      return {overflow:document.documentElement.scrollWidth>window.innerWidth,
        fontLoaded:document.fonts.check('16px Pretendard'),bodyContrast:contrast(body.color,body.backgroundColor),
        secondaryContrast:contrast(summary.color,body.backgroundColor),actionContrast:contrast(action.color,action.backgroundColor)};
    });
    expect(audit.overflow).toBe(false);expect(audit.fontLoaded).toBe(true);
    expect(audit.bodyContrast).toBeGreaterThanOrEqual(4.5);expect(audit.secondaryContrast).toBeGreaterThanOrEqual(4.5);expect(audit.actionContrast).toBeGreaterThanOrEqual(4.5);
    expect(await page.locator('#main').evaluate(element=>element.scrollHeight<=element.clientHeight)).toBe(true);
  }
  await page.getByRole('button',{name:'디자인 근거',exact:true}).click();
  await expect(page.getByRole('complementary',{name:'디자인 적용 근거'})).toBeVisible();
  await expect(page.getByText('외부 화면 미연결',{exact:true})).toBeVisible();
  expect((await service.sessions.read(id)).session.acceptances).toHaveLength(0);
  await page.getByRole('button',{name:'미리보기로 돌아가기'}).click();
  await expect(page.getByRole('button',{name:'다음 후보',exact:true})).toBeVisible();
});
