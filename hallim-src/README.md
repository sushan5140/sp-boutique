# Hallim static GitHub Pages preview

This folder is intentionally separate from `sushan5140/hallium`, whose `main` branch auto-deploys to Vercel. Do **not** push this preview source to the Hallim production repo.

The four `landing/` components were copied from Hallim commit `806a9f9f0293a35aede4deab8c898bec36e91ad8`; internal app routes are directed to the already-live Hallim service. `npm run build` emits the standalone static site into `../hallim/`.

The workflow builds this site on source changes; GitHub Pages continues to serve SP Boutique unchanged from the repository root and Hallim from `/hallim/`.
