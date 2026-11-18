# Website-first Development References

Reviewed: **2026-11-18**. Sources below support *specific practices*, not the overall claim that our exact 9-phase workflow, Website Gate or 85/100 threshold is scientifically optimal.

## Primary user-supplied basis

**기업 웹사이트 개발 표준 절차 및 R&R** (user-supplied document, 2026-11-18). Its scope explicitly covers full corporate sites. The main supplied practices applied here are:
- **Website ≠ Landing Page**, except an approved single-page scope.
- Scope/content → IA/Sitemap → Page Specs/flows → Wireframe → Design System → Implementation → QA → release handoff.
- Separate information architecture, route inventory, page content responsibilities and visual composition.
- Exit Gates and role ownership; Agent may draft/implement but cannot claim PM/content/brand human approval.
- Check mandatory route/requirement coverage, real navigation, page types and actual deployment behavior.
- Avoid fabricated corporate proof and template-clone pages.

This source is **the user's proposed workflow**, not an independent scientific validation.

## External verified references

| ID | Primary reference | Grounded principle | How we apply / limit |
|---|---|---|---|
| W01 | [Nielsen Norman Group: Information Architecture vs. Sitemaps](https://www.nngroup.com/articles/information-architecture-sitemaps/) | IA organizes content, and a Sitemap visualizes part of IA; they aren't interchangeable. | Freeze content model + Sitemap + user journeys + Page Specs rather than adding URLs to an arbitrary menu. |
| W02 | [NN/g: The Difference Between IA and Navigation](https://www.nngroup.com/articles/ia-vs-navigation/) | Navigation choices depend on the site's underlying content structure. | Plan IA before global menu patterns; do not design only the Home navigation mockup. |
| W03 | [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) | Logical site organization, descriptive URLs and coherent linking improve understanding. | Meaningful routes, distinct titles/description/link targets. SEO design depends on publication/indexability needs. |
| W04 | [Google Search Central: Link Best Practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) | Crawlable links generally need valid anchor hrefs to real URLs. | Avoid JS-only fake links and hash-fragment routes standing in for independent pages. |
| W05 | [Next.js: Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages) | Route-linked pages and shared nested layouts are explicit constructs; exact filenames depend on framework. | Separate shared site shell from page content and route-specific templates. We do **not** require Next.js specifically. |
| W06 | [Playwright: Web Server](https://playwright.dev/docs/test-webserver) and [Navigations](https://playwright.dev/docs/navigations) | Start the actual app under test; navigate URLs with controlled server behavior. | Test direct route access, reload, real journeys and exclude unrelated dev servers. |
| W07 | [W3C: WCAG 2.2](https://www.w3.org/TR/wcag/) | Accessibility applies across full page content and responsive variations, with testable success criteria. | Inspect representative page families + actual controls; axe alone is not conformance certification. |
| W08 | [OWASP: Web Security Testing Guide](https://owasp.org/projects/web-security-testing-guide) | Risk-based security testing includes configuration, auth, input and workflows as applicable. | Do not invent CMS/auth/backend for a marketing site; inspect real data/services if implemented. |
| W09 | [web.dev: Web Vitals](https://web.dev/articles/vitals) | LCP, INP and CLS are key site UX metrics requiring measured context. | Performance QA where appropriate, no fake field metrics. |
| W10 | [Google: SEO Guide for Web Developers](https://developers.google.com/search/docs/fundamentals/get-started-developers) | Pages need meaningful reachable URLs; JavaScript-rendered content can have crawlability limitations. | Make route and rendering/SEO choices explicit instead of assuming an arbitrary client SPA is fully indexable. |

## Mapping to ai_design

- [Website Anti-Slop](../governance/WEBSITE_ANTI_SLOP.md): site-wide fake navigation, duplicated page templates and fabricated content.
- [Site Architecture](../design/SITE_ARCHITECTURE.md): scope/content inventory/IA/Page Specs/user journeys and minimal wireframe.
- [Site System](../design-system/SITE_SYSTEM.md): shared shell, page-family composition, stable approved tokens.
- [Development Workflow](../development/WORKFLOW.md): user-supplied 9 phases grouped into an internally manageable Agent process.
- [Implementation Method](../development/IMPLEMENTATION.md): real routes, unique pages, source-backed content, truthful states and technical checks.
- [Website Gate](../validation/WEBSITE_QUALITY_GATE.md): W01–W06 whole-site checks **before** applying the existing 100-point rubric.
- [Multi-page Pilot](../validation/TEST_CASE_DISTRIBUTION_WEBSITE.md): new experiment with explicit routes and journeys, deliberately distinct from earlier Home-only studies.

**Methodological caution:** We do not treat the existence of multiple routes as proof of usable IA, or 0 axe violations as full accessibility. The Website Gate and site-level rubric applicability are **our engineering proposals**, to be validated by actual Code Agent runs and human feedback.

## Corporate-site fit and reference analysis (new)

[Corporate Reference Analysis](CORPORATE_SITE_REFERENCE_ANALYSIS.md) documents concrete, inspected official sites and distinguishes **their real company facts** from **transferable content structure practices**. Its evidence set includes:

- [CJ프레시웨이 Home](https://www.cjfreshway.com/index.jsp) and [Company](https://www.cjfreshway.com/solution/company.jsp) — distinguish business domains/solutions from company identity and consultation.
- [동원홈푸드 Home](https://www.dwhf.co.kr/kor/main) and [Company](https://www.dwhf.co.kr/kor/about/intro) — corporate introduction and business portfolios.
- [Bunzl About](https://www.bunzl.com/about-us/) — states its distribution business model and customer purpose.
- [Nielsen Norman Group: About Us Information on Websites](https://www.nngroup.com/articles/about-us-information-on-websites/) — site visitors need clear, authentic company-purpose information; **insufficient substance** is a documented problem.
- [Nielsen Norman Group: Information Scent](https://www.nngroup.com/articles/information-scent/) — meaningful link labels/context/category imagery help users predict destination content.

These references **do not** authorize copying visuals, inventing a fictional company's credibility metrics, changing Design System tokens or requiring a fixed number of page sections. Use them to decide **what the page must communicate**, then design an original presentation that serves the brief.
