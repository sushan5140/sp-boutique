# SP Boutique — Website

A single-page marketing site for **SP Boutique**, a women's clothing boutique, tailoring
shop, and stitching school in Tandur, Vikarabad District, Telangana 501141.

The site covers the three sides of the business:

- **Boutique** — ready and custom Indian womenswear
- **Tailoring** — stitching, fitting, and alterations
- **Classes** — hands-on stitching and tailoring courses

Live site: <https://sushan5140.github.io/sp-boutique/>

## Stack

Deliberately none. This is one hand-written `index.html` containing its own `<style>` and
`<script>` blocks — no build step, no framework, no dependencies. Fonts come from Google
Fonts over CDN; everything else is local.

```
index.html          the entire site (markup, CSS, JS)
assets/logo.png     brand logo, also used as the favicon
assets/shopfront.jpg  shopfront photo, used as the hero background via --hero-bg
```

## Running locally

Because the page loads images by relative path, open it through a local web server rather
than double-clicking the file:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

Any equivalent works — `npx serve`, VS Code's Live Server extension, etc. Opening
`index.html` directly via `file://` will mostly work too, but a server matches production.

## Deploying

The site is deployed with **GitHub Pages** from the `main` branch, root directory.
Pushing to `main` republishes it; a deploy usually goes live within a minute.

To point it at a custom domain later, add a `CNAME` file at the repo root containing the
domain, then set the matching DNS records at your registrar.

## Known placeholders

These are intentional and still need real values before launch:

- **Prices** show `₹X` throughout.
- **Class batch dates and seat counts** show `X`.
- **Instagram handle** is a guess: `sp.boutique`.
- **Photography** — around 39 images are Unsplash stock URLs pending replacement with
  real shop photos.
- **Address** — the page currently reads *Sai Tharun Hospital Lane, near Fly Over, Indira
  Nagar, Tandur, Telangana 501141*, which does not match the *Adarsh Nagar* address used
  elsewhere. Worth confirming which is correct.

The phone number (`+91 98480 54521`) and WhatsApp links are real and current.
