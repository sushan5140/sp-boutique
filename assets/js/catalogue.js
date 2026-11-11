/*
  SP Boutique — shop data.
  This is the only file you need to edit to change designs, prices or contact details.

  PRICES
    price: null   -> the site shows "Ask for price"
    price: 1850   -> the site shows "₹1,850" and includes it in the WhatsApp message
    priceFrom: true (with a price) -> shows "From ₹1,850"

  PHOTOS
    photo: an Unsplash photo id (style-reference stock photo), or
    image: "assets/products/your-photo.jpg" to use the shop's own photo instead.
    Own photos look best at 4:5 (for example 1200 x 1500 px).
    focus: optional crop hint for a stock photo (zooms in on the garment).
*/
window.SPB = {
  contact: {
    name: "SP Boutique",
    whatsapp: "919848054521",
    phoneDisplay: "+91 98480 54521",
    phoneHref: "tel:+919848054521",
    instagram: "sp_boutique_tandur",
    instagramUrl: "https://www.instagram.com/sp_boutique_tandur",
    mapsUrl: "https://maps.app.goo.gl/NTVmJQ5ktLZbze8V6",
    address: ["Adarsh Nagar", "Tandur 501141", "Vikarabad District, Telangana"]
  },

  categories: [
    { id: "sarees",   name: "Sarees",                   cover: "1617627143750-d86bc21e42bb" },
    { id: "blouses",  name: "Blouses",                  cover: "1751968064162-5dc57d8de0cc" },
    { id: "lehengas", name: "Half sarees & lehengas",   cover: "1746372283841-dbb3838f9935" },
    { id: "suits",    name: "Suits & kurtas",           cover: "1745313452052-0e4e341f326c" },
    { id: "gowns",    name: "Anarkalis & gowns",        cover: "1610048869310-d889ff25c374" }
  ],

  products: [
    /* ---------- Sarees ---------- */
    { id: "navy-pattu-gold-butta", code: "SP-S01", cat: "sarees", price: null,
      name: "Navy pattu saree with gold butta",
      photo: "1610189012906-4c0aa9b9781e",
      desc: "Deep navy body scattered with gold butta, finished with a red and gold zari border." },
    { id: "pink-pattu-orange-border", code: "SP-S02", cat: "sarees", price: null,
      name: "Pink pattu saree, orange zari border",
      photo: "1617627143750-d86bc21e42bb",
      desc: "Rani pink silk-style saree with a broad orange and gold border and a matching blouse." },
    { id: "red-gold-silk-saree", code: "SP-S03", cat: "sarees", price: null,
      name: "Red and gold silk saree",
      photo: "1727430228383-aa1fb59db8bf",
      desc: "Red silk with gold zari woven through the body and pallu. A wedding and function classic." },
    { id: "green-pattu-pink-border", code: "SP-S04", cat: "sarees", price: null,
      name: "Parrot green pattu saree, pink border",
      photo: "1748799026383-8e10aff0e722",
      desc: "Bright parrot green with a contrast pink border, worn with a short-sleeve work blouse." },
    { id: "sky-blue-saree-printed-blouse", code: "SP-S05", cat: "sarees", price: null,
      name: "Sky blue saree with printed blouse",
      photo: "1610189019389-975bbbc2f8f3",
      desc: "A light, soft-draping saree in sky blue, styled with a printed elbow-sleeve blouse." },
    { id: "bottle-green-zari-saree", code: "SP-S06", cat: "sarees", price: null,
      name: "Bottle green saree with zari border",
      photo: "1770838447151-05a876cdee3d",
      desc: "Bottle green with a slim gold border. Easy to wear for pujas and family functions." },

    /* ---------- Blouses ---------- */
    { id: "contrast-pattu-blouse", code: "SP-B01", cat: "blouses", price: null,
      name: "Contrast pattu blouse, elbow sleeve",
      photo: "1751968064162-5dc57d8de0cc",
      desc: "Lavender silk blouse with gold zari sleeve borders, cut to contrast a cream pattu saree." },
    { id: "work-blouse-embroidered-sleeves", code: "SP-B02", cat: "blouses", price: null,
      name: "Work blouse with embroidered sleeves",
      photo: "1675866149822-7343bcaf803c",
      desc: "Dark blouse with gold motif work across elbow-length sleeves. Ask us about computer embroidery or maggam work on your own blouse piece." },
    { id: "deep-back-blouse-dori", code: "SP-B03", cat: "blouses", price: null,
      name: "Deep-back blouse with dori tie",
      photo: "1787753650999-be192162fd40",
      desc: "Full-sleeve blouse with a deep square back and a dori tie at the neck." },
    { id: "maroon-puff-sleeve-blouse", code: "SP-B04", cat: "blouses", price: null,
      name: "Maroon puff-sleeve blouse",
      photo: "1739429942146-122ea1aa7987",
      desc: "Short puff sleeves in maroon, paired with a printed saree and green border." },
    { id: "wide-back-neck-blouse", code: "SP-B05", cat: "blouses", price: null,
      name: "Wide back-neck blouse",
      photo: "1612273882937-44c5313400e5",
      desc: "Purple short-sleeve blouse with a wide back neck, worn with an olive silk saree." },

    /* ---------- Half sarees & lehengas ---------- */
    { id: "pink-green-langa-voni", code: "SP-H01", cat: "lehengas", price: null,
      name: "Pink and green langa voni",
      photo: "1666187716211-70f18b7d05ee", focus: "&crop=focalpoint&fp-x=0.42&fp-y=0.62&fp-z=1.5",
      desc: "Pink langa with a zari border, bottle green voni and a matching blouse." },
    { id: "mustard-lehenga-pink-dupatta", code: "SP-H02", cat: "lehengas", price: null,
      name: "Mustard lehenga with pink dupatta",
      photo: "1574847872646-abff244bbd87",
      desc: "Plain flared mustard skirt, white blouse and a sheer pink dupatta." },
    { id: "pink-bridal-lehenga", code: "SP-L01", cat: "lehengas", price: null,
      name: "Pink bridal lehenga",
      photo: "1746372283841-dbb3838f9935",
      desc: "Heavily worked pink lehenga with a contrast blouse and net dupatta." },
    { id: "mustard-maroon-bridal-lehenga", code: "SP-L02", cat: "lehengas", price: null,
      name: "Mustard and maroon bridal lehenga",
      photo: "1767955694884-d4bf352c23c2",
      desc: "Mustard lehenga with all-over work and a deep maroon dupatta." },
    { id: "lilac-lehenga-choli", code: "SP-L03", cat: "lehengas", price: null,
      name: "Lilac lehenga choli",
      photo: "1649930055986-ca57250a7fd4",
      desc: "Lilac lehenga with tone-on-tone work and a short-sleeve choli." },
    { id: "teal-layered-lehenga", code: "SP-L04", cat: "lehengas", price: null,
      name: "Teal layered lehenga",
      photo: "1619715613791-89d35b51ff81",
      desc: "Teal lehenga with layered frills and an embroidered choli." },
    { id: "girls-pattu-pavadai", code: "SP-K01", cat: "lehengas", price: null,
      name: "Girls' pattu pavadai",
      photo: "1785393153529-107a4729b0d2",
      desc: "Cream pavadai with a dark printed top for little ones, stitched to the child's size." },

    /* ---------- Suits & kurtas ---------- */
    { id: "white-block-print-kurta-set", code: "SP-U01", cat: "suits", price: null,
      name: "White block-print kurta set",
      photo: "1745313452052-0e4e341f326c",
      desc: "White straight-cut kurta with floral block print and matching pants." },
    { id: "pink-printed-kurta-pant-set", code: "SP-U02", cat: "suits", price: null,
      name: "Pink printed kurta and pant set",
      photo: "1741847639057-b51a25d42892",
      desc: "Soft pink printed kurta with three-quarter sleeves and matching pants." },
    { id: "red-kurta-suit-printed-dupatta", code: "SP-U03", cat: "suits", price: null,
      name: "Red kurta suit with printed dupatta",
      photo: "1759840278381-bf7d5e332050",
      desc: "Red kurta with yoke work and a light printed dupatta." },
    { id: "blue-salwar-suit-neck-work", code: "SP-U04", cat: "suits", price: null,
      name: "Blue salwar suit with neck work",
      photo: "1780247723311-2dae151784d1",
      desc: "Bright blue suit with embroidery along the neckline and sleeves." },
    { id: "red-floral-coord-set", code: "SP-U05", cat: "suits", price: null,
      name: "Red floral co-ord set",
      photo: "1764928947261-f5687e0faa4a",
      desc: "Short floral-print top with matching palazzo pants." },
    { id: "pink-short-kurta-palazzo", code: "SP-U06", cat: "suits", price: null,
      name: "Pink short kurta with palazzo",
      photo: "1762777777819-4d9aa5529368",
      desc: "Pink printed short kurta over wide matching palazzos." },
    { id: "green-sharara-suit", code: "SP-U07", cat: "suits", price: null,
      name: "Green sharara suit with dupatta",
      photo: "1597983073540-684a10b15ab1",
      desc: "Printed kurta with a flared green sharara and matching dupatta." },
    { id: "maroon-embroidered-kurta", code: "SP-U08", cat: "suits", price: null,
      name: "Maroon embroidered kurta",
      photo: "1708534419572-6e6614a53ca1",
      desc: "Maroon kurta with white thread embroidery on the yoke and sleeves." },

    /* ---------- Anarkalis & gowns ---------- */
    { id: "sage-green-anarkali-gown", code: "SP-G01", cat: "gowns", price: null,
      name: "Sage green anarkali gown",
      photo: "1610048869310-d889ff25c374",
      desc: "Floor-length sage green anarkali with all-over work and a net dupatta." },
    { id: "maroon-flared-gown", code: "SP-G02", cat: "gowns", price: null,
      name: "Maroon flared gown",
      photo: "1668371679302-a8ec781e876e",
      desc: "Plain maroon gown with a full flare and worked sleeves." },
    { id: "ivory-gold-anarkali", code: "SP-G03", cat: "gowns", price: null,
      name: "Ivory and gold anarkali",
      photo: "1610047592780-aa246f5635c2",
      desc: "Ivory anarkali with gold work from yoke to hem and full sleeves." },
    { id: "ice-blue-party-gown", code: "SP-G04", cat: "gowns", price: null,
      name: "Ice blue party gown",
      photo: "1610048616025-11a3dcc9fd0b",
      desc: "Ice blue gown with sheer worked sleeves and a wide flare." }
  ],

  /* Stitching work. Fill in `price` (a number) when ready and the site shows "From ₹…". */
  services: [
    { name: "Blouse stitching",       note: "With your fabric, plain or lined",          price: null },
    { name: "Saree fall and pico",    note: "Fall stitching and edge finishing",         price: null },
    { name: "Salwar or churidar set", note: "Top, bottom and dupatta finishing",         price: null },
    { name: "Lehenga alteration",     note: "Resizing, panels and restyling",            price: null },
    { name: "Basic repairs",          note: "Seams, zips, hooks and hems",               price: null }
  ],

  classes: [
    { name: "Hand to Machine",    level: "Beginner",     note: "Hand stitches, using the sewing machine and a first simple salwar top." },
    { name: "Blouse Drafting",    level: "Intermediate", note: "Drafting a blouse pattern from measurements: princess cuts, boat necks and sleeve variations." },
    { name: "Lehenga & Draping",  level: "Advanced",     note: "Multi-panel lehenga construction and saree pre-draping." }
  ]
};
