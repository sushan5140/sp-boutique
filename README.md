# SP Boutique — Website

The website for **SP Boutique**, a women's clothing boutique, tailoring shop and stitching
school in Adarsh Nagar, Tandur, Vikarabad District, Telangana 501141.

Customers browse the collections, open a design, and enquire or order on WhatsApp. There is
no cart, checkout or payment gateway.

## What is on the site

- **Collections** — designs by category with filters, a detail view for each design, and
  a shareable link per design (`#design=<id>`).
- **Enquiry list** — customers save several designs and send them in one WhatsApp message.
- **Outfit Studio** — choose garment, neck, sleeve, work, colour and fabric; a live sketch
  and summary slip are sent to the shop on WhatsApp.
- **Stitching, alterations and classes** — services, how an order works, common work rates.
- **Visit** — shopfront, address, phone, Instagram, directions, and an enquiry form that
  opens WhatsApp with the message filled in (nothing is stored or sent by the site itself).

## Stack

Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies.

```
index.html               page markup
assets/css/site.css      design system and layout
assets/js/catalogue.js   SHOP DATA: designs, prices, contact details, services, classes
assets/js/site.js        behaviour (filters, design sheet, enquiry list, studio, WhatsApp links)
assets/logo.png          brand logo (also the favicon)
assets/shopfront.jpg     shopfront photo
vercel.json              Vercel headers and clean URLs
.vercelignore            keeps the unrelated prototypes in this repo out of the Vercel deploy
```

## Updating designs and prices

Everything the shop needs to change is in `assets/js/catalogue.js`.

- **Price**: set `price: 1850` to show "₹1,850". Leave `price: null` to show "Ask for price".
  Add `priceFrom: true` to show "From ₹1,850".
- **Own photo**: add `image: "assets/products/my-photo.jpg"` to a design (4:5, about
  1200 × 1500 px). It replaces the stock photo.
- **New design**: copy an entry, give it a unique `id` and `code`, and set its `cat`.
- **Stitching rates**: set `price` on the entries in `services`.
- **Phone, WhatsApp, Instagram, address**: the `contact` block. The address and phone also
  appear as plain text in `index.html` (hero, visit section, footer).

## Running locally

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploying

The Vercel project is connected to this GitHub repository; pushing to `main` deploys the
site. GitHub Pages also still serves the repository root.

## Still needed from the business

- **Real product photos.** Collection photos are Unsplash stock photos used as style
  references and are loaded from Unsplash's image servers. The site says so.
- **Prices** for designs and stitching work (all show "Ask for price").
- **Shop timings.** The site asks customers to call or WhatsApp before visiting.
- **Class batch dates, durations and fees.**
- **Address confirmation.** The site uses the signboard address (Adarsh Nagar). The
  "Get directions" link is the earlier `maps.app.goo.gl` shortlink, which was created
  against an Indira Nagar address and should be checked.
- **Delivery area**, if the shop sends orders outside Tandur.

The phone number (`+91 98480 54521`), WhatsApp link and Instagram handle
(`sp_boutique_tandur`) are the ones recorded as current in the previous version of this file.
