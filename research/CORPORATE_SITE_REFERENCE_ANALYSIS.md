# Corporate Website Reference Analysis — Research-to-Design Method

Reviewed: **2026-11-18 (KST)**. Scope: corporate/B2B websites, not a universal design template. Use this with [Site Architecture](../design/SITE_ARCHITECTURE.md), [Art Direction](../design/ART_DIRECTION.md) and [Website Quality Gate](../validation/WEBSITE_QUALITY_GATE.md).

## 1. Why it exists

The Website-first v3.0 Gaon pilot completed **8/8 routes** and **4/4 journeys** and self-scored **93.75/100**, yet its Company page mostly explained the buyer's procurement preparation and its three category detail pages repeated the same image/table/CTA shell. It was a functional **buyer guide split across routes**, not convincing corporate communication. These observations are from the user's supplied v3.0 screenshots and the pilot's self-report; functional pass counts have **not** been independently rerun here.

The missing link is **industry/company identity and substantive page content before visual composition**. The method must not cure this by fabricating credentials, making every site image-led or copying a competitor's visual design.

## 2. Actual primary-site observations (independent references)

The following are **observations of those companies' public websites**, not facts about a fictional client and not a mandate to copy their copy, route count, claims or imagery.

| Reference and inspected route | Publicly observable content | Design lesson to test, **not a fixed template** |
|---|---|---|
| [CJ프레시웨이 — Home](https://www.cjfreshway.com/index.jsp) and [Company](https://www.cjfreshway.com/solution/company.jsp) | Home branches into 식자재 유통, 푸드서비스, 상품 구매, 식품안전, 물류, and separate consultation types. Company states its role as a business partner, mission and distinct capability areas. | A B2B homepage introduces **what the business does**, not only how a buyer fills out an inquiry. Company page needs substance about company scope and value, from valid sources. |
| [동원홈푸드 — Home](https://www.dwhf.co.kr/kor/main) and [Company](https://www.dwhf.co.kr/kor/about/intro) | Corporate overview and distinct business areas (e.g., 조미사업, 식자재유통, 푸드서비스); About communicates its overall enterprise identity. | Structure business areas in terms of **the company's operations/offering** rather than only the buyer's preparatory tasks. No obligation to invent history, certification or scale. |
| [Bunzl — About](https://www.bunzl.com/about-us/) and [Homepage](https://www.bunzl.com/) | Explains value-added distribution, what it sources/consolidates/delivers, the customers it serves and the organization's business model. | Company identity/business model, customer value and product/service scope are different information needs and may deserve distinct pages. Never copy its numerical claims or proof. |

### Independent UX research

- [Nielsen Norman Group — About Us information on websites](https://www.nngroup.com/articles/about-us-information-on-websites/) reports usability research involving **more than 70 participants**, testing **100** and reviewing an additional **65** corporate sites. They found that **hard-to-find company purpose/contact information and content lacking substance** can reduce satisfaction. This is evidence of a usability issue, not proof that a particular site layout always wins.
- [Nielsen Norman Group — Information Scent](https://www.nngroup.com/articles/information-scent/) describes how link names, surrounding copy and representative imagery help users predict destination value. An aesthetically pleasing or generic image may not help users choose the right category.
- [Nielsen Norman Group — IA Mistakes](https://www.nngroup.com/articles/3-ia-mistakes/) warns that vague navigation/CTA labels do not adequately distinguish where a link leads.

## 3. Lightweight Agent reference protocol — before IA

For a **new corporate website**, inspect **2–3 actual comparable sources if public access is available and relevant**; select sites by comparable business model/user jobs, not because their visual style is fashionable. If live research is unavailable, use a **user-provided or pinned, verifiably sourced** reference pack such as the table above. Mark **OFFLINE_REFERENCE** and inspection limitations; do not claim new browsing happened.

In one concise matrix, record:

| Field | Concrete question |
|---|---|
| Company/business model | What does the organization actually do, for whom, and how is value delivered? |
| Page purpose | What job does Home, About, offering/index, detail, process, Contact do **differently**? |
| Evidence / content | What real facts support the page? Which missing facts would leave it empty? |
| Navigation / CTA | What does the link promise, and does the destination actually deliver? |
| Visual / media role | Which imagery, diagrams, comparisons, photography or typography **adds meaning**? |
| Transfer / prohibition | What generalizable design principle is useful; what must NOT be copied? |

Collect **at least one actual page/content observation** per source, with official URL and review date. Distinguish **observed fact** from **our inference/recommendation**. Never claim competitor site screenshots, imagery, brand metrics, logos or copy are reusable client assets.

Output: a **short Reference Findings section in the existing Site Blueprint**, not a mandatory standalone benchmark report, separate prompt or approval meeting. When the existing project has an approved IA and adequate content, review only material gaps; do not force the Agent to redo settled scope.

## 4. Translating research to Site Blueprint

Apply this sequence:
1. **Identity first:** 1–2 factual/synthetic-authorized sentences: “We are [type of company], serving [audience], offering [capabilities], via [business/service model].” Mark every piece VERIFIED / authorized FICTIONAL_SAMPLE / TBD.
2. **Service model:** distinguish what **the company offers or performs** from instructions telling **the buyer** what to prepare. Put procurement requirements in Process/Guide, not as the only content on Company.
3. **Content-to-page ownership:** each route must answer a *different visitor question*, carry unique sourced substance and provide a clear next step. If not, reconsider that route/merge, **unless the brief fixed that route**; if fixed but content is insufficient, report CONTENT_GAP rather than invent filler.
4. **Visual communication:** map each meaningful piece of content to an appropriate presentation (media, comparison, specifications, process, editorial narrative). A same-shape table on three category pages is not necessarily wrong, but three pages with essentially the **same information and identical composition** are poor page design.
5. **Proof and limits:** missing awards, customer cases or infrastructure details are **not invitations to fabricate**. For explicitly fictional experiments, use a **predefined scenario pack** whose contents are marked illustrative and fixed across runs.
6. **Review:** compare the finished **page's actual information** and rendered composition against the frozen Page Spec and reference observations. Distinct pages should not become procurement-guide clones.

## 5. Review signals — avoid blind template copying

For each required page type, ask:
- **Home:** can a visitor state what the company actually does and see routes to its different services/business areas?
- **About:** can a visitor tell how the organization operates and what it offers, even without history/metrics/client logos?
- **Index/detail:** is there substantive, category-specific information beyond relabelled rows? Can a visitor make a better-informed choice?
- **Process:** is it actually a process/requirements explanation, rather than a repackaged About page?
- **Contact:** does it complete a truthful task, with real error/success semantics?
- **Whole site:** would removing any non-mandatory page lose **unique** content or a useful customer step? If not, question its necessity.

These are **judgement prompts backed by screen/content evidence**. Do not mandate that every company use the same menu, hero photography, color accents, number of sections or page types.

## 6. Research and experiment integrity

The reference set is **qualitative and small**; it neither proves the reference layouts are best practice for all companies nor establishes numeric evaluation weights. **Do not turn reference similarity into a score.** Evaluate user-task fit, truth, structure, and content substance.

For methodology comparison, hold the same fictional company profile, site brief, user prompt, assets authorization, model and runtime constant across the pinned **v3.0** and new candidate whenever practicable. Historic sparse-content v3.0 and enriched-content revisions **cannot** establish causal improvement alone. Keep both versions and user acceptance separately archived.
