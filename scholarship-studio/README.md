# Scholarship Studio — standalone GitHub Pages preview

This isolated preview is intentionally **not** part of the KMate application. It has its own HTML, CSS and JavaScript and does not import KMate routes, authentication, database, or landing page. It is temporarily hosted in a separate `scholarship-studio/` directory of an existing GitHub Pages preview repository so it can be reviewed before an eventual approved integration.

## Features

1. **Personalized criteria matching** — visitor profile (citizenship, study level, intended field, study language, intake, TOPIK, IELTS and optional academic details); transparent checks against *published* language/evidence conditions. Never claims admission acceptance, computes an arbitrary compatibility score, or misuses renewal GPAs as admission thresholds.
2. **Independent application tracking** — one application per scholarship with manually editable status, target intake, next action date, checklist, and notes.
3. **Side-by-side comparison** — up to three awards, comparing tuition, stipend, scholarship process, language criteria, renewal conditions and official source.

## Data and source controls

The curated undergraduate **non-GKS** snapshot was manually checked **24 September 2026** against official university scholarship webpages (KAIST, UNIST, Korea University, Ajou University). No new scholarship notices, dates, or eligibility rules are automatically fetched. The four Ajou English-track rows are explicitly shown as Business Administration opportunities, not presumed AI/CS scholarships.

Because the list is a static snapshot, **always check the source page and current intake admissions guide before applying**. Fixed deadlines are not invented from general scholarship pages. This prototype is not the KMate production university-catalog job.

## Privacy and limitations

The preview stores only profile details, tracked applications and selected comparison awards in this browser's localStorage. It does not create accounts, send data to KMate/Supabase, submit official applications or monitor live scholarship updates. Browser reset, private mode or different devices may lose this state. Use **Export my workspace** before clearing browsing data. It does not import exported data yet.

## Move into KMate later

Integrate only after approval. Replace this static curated catalogue with the existing KMate/Supabase scholarship schema; retain evidence links and separate undergraduate admission conditions from renewal conditions. Rework storage under authenticated user-scoped policies, add proper data retention/export, and merge UI styles into KMate's design system. Never overwrite the existing KMate application merely to publish this preview.

## Run locally

Serve the repository root with `python -m http.server 8000` and open `/scholarship-studio/`. No npm install or build is required.
