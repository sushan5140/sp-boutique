# Hallim / design direction · September 2026

## Product identity
**A Korean learning desk, not a generic language-course template.** Hallim is a connected study system: a curriculum, interactive lessons, a language desk, evidence, review, intelligence and collaborative study. The public page should *show these relationships*, not hide them in uniform cards.

## Color theory / purposeful color roles
| Token | Hex | Role |
|---|---|---|
| Ink / midnight blue | `#192647` | Typography, high-contrast surfaces, primary navigation |
| Royal blue | `#374BC7` | Main interaction, active state, the connected graph, links |
| Cool paper | `#F7F9FE` | Restful large background, not another warm beige gradient |
| Frost | `#EAF0FF` | System map, instructional surfaces, explanatory UI |
| Soft sunlight | `#F0E6AB` | Sparse moments of delight and prominent dark-surface highlights |
| Study green | `#DCEFE8` | Companion practice and successful review context |
| Blush pink | `#F8DBE6` | Partner-focused social learning only |

The **ink/royal blue axis** gives the brand continuity; soft paper provides breathing space. Sunlight is an accent, **not a competing button color**. Green encodes learning actions, and pink identifies the partnership system. At least 4.5:1 contrast for body text; do not put pale words on pastel backgrounds. White/light text on ink or royal; dark ink on light surfaces.

## Type
**Plus Jakarta Sans (800)** for oversized confident headings, navigation, controls and body; **Noto Sans KR** fallback for Hangul. No random decorative italic serif on every heading. Korean text is functional content and a legitimate visual motif.

## Composition
1. Split hero: compact copy + a real learning-path interface preview. Show the product before making abstract claims.
2. High-contrast numerical proof strip (15 / 76 / 5 → 1).
3. Clickable five-input connection diagram with one intelligence hub. This is the distinctive moment.
4. Asymmetric deep dives: curriculum bands, actual Companion sample, Word Map/Grammar desk, evidence/review and AI tools.
5. Partner chapter in its own blush pink visual context.
6. Live local demo and concrete entry points. Keep the old live app, authentication and production Vercel project unchanged.

Use open page rhythm rather than wrapping every sentence in the same round-cornered card. Section backgrounds are intentional chapters, not a pastel rainbow. Corner radii scale by role (8px controls / 12px tool cards / 18–22px product surfaces).

## Interaction / accessibility
- CSS hover and press only where they confirm an action; 180–200ms with `cubic-bezier(.23,1,.32,1)`.
- Keep the five-way system a real button-controlled explainer with `aria-pressed`.
- A functional Korean micro-demo, not an animation of a fake chat.
- Prefer transforms and opacity over costly layout animation; respect `prefers-reduced-motion`.
- Keyboard focus visible; 44px touch targets for major controls; mobile cards stack without horizontal scrolling.
- Draw a clear line between marketing illustration and actual user results; no fabricated performance percentages.

## Guidance used
- Emil Kowalski skills / Design Engineering: restrained purposeful micro-interactions, press/hover feedback.
- Anthropic frontend-design skill: distinctive product-specific visual, real content, no generic template.
- UI/UX Pro Max: mobile hierarchy, accessible contrast, touch targets and structured landing sequence.
- Material 3 skill: tonal roles, shape hierarchy and responsive layout principles without importing a whole component library.
- Karpathy coding skill: surgical edit of preview-only repository; avoid touching Hallim product functions.
- delphi-ai animate skill and Design Motion Principles: purposeful 180–220ms CSS motion, reduced-motion fallback.
- AgentsORG Design Engineering: typography, surface hierarchy, marketing-vs-product distinction.

## Deployment boundary
Preview-only source: `sushan5140/sp-boutique/hallim-src/`. Compiled output: `/hallim/` on GitHub Pages. **Never push this redesign into the Vercel-connected `sushan5140/hallium` until the owner explicitly asks.**
