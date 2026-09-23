# Hallim V3 / product-aligned design decisions

## Source of truth

Inspected `sushan5140/hallium/app/globals.css` (Hallium V4 canonical tokens), `app/hangul/page.module.css`, `app/page.js`, `app/partner/PartnerKorean.jsx`, `app/study-partners/PartnerStudio.jsx` and `app/demo/page.js`. Avoided importing production app assets or modifying Vercel source.

## Actual V4 palette — not V2's cobalt theme

| Canonical role | Hex | V3 usage |
|---|---|---|
| Paper | `#F4F5F1` | Page, navigation and connected sections |
| White surface | `#FFFFFF` | Realistic product-interface mockups |
| Surface 2 | `#ECEEE9` | Controls, segmented backgrounds |
| Ink | `#17191F` | Primary text; no dark-blue marketing slabs |
| Muted | `#676B75` | Explanatory copy |
| Indigo | `#5147E8` | App identity, primary action, focused/selected |
| Indigo soft | `#E8E7FF` | Selected learning context, product panels |
| Jade | `#087F69` | Review, correct feedback, path continuity |
| Jade soft | `#DFF2EB` | Review surfaces |
| Papaya | `#E76F51` | Micro-highlights, active focus where meaningful |
| Sun soft | `#FFF5C8` | Grammar explanation |
| Blush / pink | `#F3D6E2`, `#FFF5F9` | Study Partners social section |

Font stack tracks V4's `Pretendard, Noto Sans KR, Inter, system-ui`, with browser fallback. Keep headings strong 800. No stock gradients or dark-blue sections.

## One connected product story

Hero with working Starter / Elementary switch → five signals into an Intelligence hub → actual Companion/Word Map/Grammar/practice/review interactive walkthrough → Intelligence and Study Partners → cohesive end invitation. Refine content rather than adding miscellaneous full-width pages.

The six **documented** Intelligence tools are Explain My Mistake, Automatic Difficulty, Adaptive Review, Personal Study Plan, Fresh AI Checkpoint and Level Promotion Audit. AI learning audit is the evidence foundation, NOT counted as a separate seventh tool. No fake TOPIK certification or speaking scores.

Study Partners: opt-in discovery, mutual acceptance, selectively shared and revocable notes, shared room and three-round guided practice using the pair's vocabulary+grammar, no auto-grading. Real Korean includes casual/polite usage and AI Message Makeover. Public lesson sample, fake learner cards and example review history are labeled illustrative; Google sign-in stores private learner data.

Motion uses 155–210ms purpose-driven feedback, ease-out, reduced-motion override. Keyboard focus, responsive layouts, no infinite attention loops.

## Deployment boundary

`hallim-v3-src/` → isolated Vite build `hallim-v3/` → existing GitHub Pages. No mutation to `hallim/`, `hallim-v2/`, or `sushan5140/hallium`. No Vercel.
