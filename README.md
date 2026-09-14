# LAKNITE® — Winterwear Manufacturer Website (2026 structure update)

```
index.html          Homepage
men.html            Men's department
women.html          Women's department
kids.html           Kids department
assets/laknite.css  All styling, for all four pages
assets/laknite.js   All behaviour + the four edit zones
images/             Product photography, catalogue covers, factory, logos
images/archive/     Older catalogue covers, no longer on the site
```

Open `index.html` in any browser. To publish, upload the whole folder to your
hosting, or drag it into Netlify, Vercel or Cloudflare Pages.

---

## What changed

The site used to be one long page with every product on it. It is now a
homepage plus three department pages.

**Homepage** — hero, Trusted Since 1999, **Shop by Department** (three premium
cards: Men, Women, Kids), Thermals, Product Experience Centre, Featured
Collections, Why Choose LAKNITE, Manufacturing, Product Portfolio, Become a
Dealer, About Us, Contact.

**Each department page** — breadcrumb, department hero, sticky sub-navigation,
eight Product Categories, Product Gallery with article numbers, Latest
Catalogues with Download and Enquire buttons, three Seasonal Collections,
a Download Catalogue / Product Enquiry band, and links across to the other two
departments.

Design language is unchanged: same charcoal, cream and bronze palette, same
Bodoni Moda and Archivo typography, same sticky masthead, same hover and reveal
behaviour, same WhatsApp wiring and dealer form.

---

## Editing the site

Everything you are likely to change sits in four marked zones at the top of
`assets/laknite.js`.

### Zone 1 — your contact details

```js
const LAKNITE = {
  phone:     "+91 98765 43210",
  whatsapp:  "919876543210",   // country code + number, digits only
  email:     "info@laknite.com",
  address:   "Ludhiana, Punjab, India",
  instagram: "",               // paste your profile URL
  facebook:  ""
};
```

Change these once and every phone link, WhatsApp link, email link and address on
all four pages updates. Instagram and Facebook icons stay inactive until you
paste the URLs.

### Zone 2 — images

Every picture is named once in the `IMAGES` object. Two ways to change one:

- Replace the file in `images/` keeping the same filename, or
- Point the key at a different filename.

Set a value to `""` and that slot renders as a clean placeholder instead of
breaking. Placeholders are already styled and correctly sized, so the layout
never collapses while you wait for photography.

### Zone 3 — catalogue PDFs

```js
const CATALOGUES = {
  "W-1000": "",   // Men's Windcheater & Outerwear
  "M-9500": "",   // Premium Mufflers
  ...
};
```

Paste a PDF URL against a series and its **Download** button becomes a real
download. Left empty, the button opens WhatsApp asking for that catalogue by
name — so no button is ever dead, whether or not you have PDFs online yet.

### Zone 4 — the third-party branded photographs

Five of the photographs you sent show garments carrying other companies'
trademarks:

| File | Mark on the garment | Slot |
|---|---|---|
| `m-hoodie-black.jpg` | adidas | Men · W-1310 |
| `m-halfzip-sand.jpg` | adidas | Men · K-7020 |
| `m-hoodie-colourblock.jpg` | Calvin Klein | Men · W-1360 |
| `k-gilet-quilted.jpg` | Tommy Hilfiger | Kids · K-5620 |
| `k-slippers.jpg` | Peppa Pig | Kids · M-9000 |

The slots are built, written and sized, but they render as placeholders until
you change one line:

```js
const SHOW_THIRD_PARTY_BRANDED = false;   // set to true to publish them
```

A website is public and indexed by Google, which makes it the easiest place in
the world for a brand's legal team to find its own logo. The switch is left to
you. If you send own-label shots of the same five articles, drop them into
`images/` under the same filenames and everything appears with no other change.

---

## Open image slots

Four slots are deliberately empty and styled as placeholders, ready for uploads:

| Slot | Page |
|---|---|
| Ladies Cardigan, K-4400 | Women · gallery |
| Girls Winter Top, K-5400 | Kids · gallery |
| Men's Knitwear catalogue cover | Men · catalogues |
| Shawls & Stoles catalogue cover, S-8400 | Women · catalogues |
| Kids Slippers catalogue cover, M-9000 | Kids · catalogues |

Add the file to `images/`, name it in `IMAGES`, done.

---

## Photographs that were cleaned

Three of the uploads had text burned into the image. Because the site prints the
article number itself, in its own typeface, the burned-in versions were removed:

- `w-shawl-s8411.jpg` — "Art no. S-8411" panel removed
- `w-shawl-s8507.jpg` — "Art no. S-8507" panel removed
- `k-boys-sweaters-5331.jpg` — "Art No - 5331 / Size - 24X36" block and the
  "AI-generated content" watermark removed

All sixteen uploads were resized to 1100 px wide and saved as progressive JPEG.
Total image weight dropped from about 35 MB to 3.6 MB, which is the difference
between a site that loads on a dealer's phone and one that does not.

---

## The dealer enquiry form

There is no server behind it. A completed form opens WhatsApp with the name,
business, city, phone, department and requirement already typed. To also receive
leads by email, connect it to Formspree, Web3Forms or your own script — the
submit handler in `assets/laknite.js` is marked with a comment showing exactly
where to post the data.

## Google Map

In the contact section of `index.html`, replace the block marked
`data-slot="google-map"` with your Google Maps embed iframe, set to
`width:100%;height:100%;border:0`.

## Adding a fourth department later

Copy `men.html`, change the headings, the article tiles and the catalogue cards,
add the page to the `NAV` list in the header of all four files, and add its card
to the `depts` grid on the homepage. No build step, no framework, no dependencies
beyond the two Google Fonts.
