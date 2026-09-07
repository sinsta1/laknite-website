# LAKNITE — website files

- `index.html` — the whole website, one page with anchored sections
- `images/` — the logo, the shawl photographs and the factory photographs
- `catalogs/` — empty; drop catalog PDFs here

The Node server serves the site and saves validated enquiry submissions to
Supabase before opening WhatsApp.

1. Create a free Supabase project.
2. Open its SQL Editor and run `supabase.sql` from this folder.
3. Copy `.env.example` to `.env` and add the project URL and server secret key.
4. Load those environment variables and run `npm start`.

PowerShell example:

```powershell
$env:SUPABASE_URL="https://your-project-ref.supabase.co"
$env:SUPABASE_SECRET_KEY="your-server-secret-key"
npm start
```

Never put the secret key in `index.html` or commit `.env`.

## Deploy free on Render

1. Push this folder to a GitHub repository.
2. In Render, choose **New > Blueprint** and connect that repository.
3. Render reads `render.yaml`. Enter `SUPABASE_URL` and
   `SUPABASE_SECRET_KEY` when prompted.
4. Deploy, then verify `/api/health` and submit one test enquiry.

The free Render service sleeps after inactivity, so the first visit after a
quiet period can take about a minute. Upgrade later if instant wake-up matters.

---

## 1. Your phone, WhatsApp and email

Open `index.html`, search for `const LAKNITE` near the bottom, and change the four
values. Every phone link, WhatsApp button and email link on the site updates from
there.

```js
const LAKNITE = {
  phone:    "+91 98765 43210",
  whatsapp: "919876543210",   // country code + number, digits only
  email:    "info@laknite.com",
  address:  "Ludhiana, Punjab, India"
};
```

WhatsApp buttons open a chat with a message already typed for the section the
buyer clicked from, so you know what they were looking at.

## 2. Factory photographs

Your 15 factory photos are in place across the About section, the Manufacturing
section, the factory gallery and the production-process timeline. They live in
`images/` with descriptive names — `f-production-floor.jpg`, `f-knitting-cixing.jpg`,
`f-inspection.jpg`, `f-folding.jpg` and so on — and are listed once in the `IMAGES`
object inside `index.html`.

To replace one, drop a new file into `images/` using the same filename; nothing
else changes. To add more, add a line to `IMAGES`:

```js
"f-warehouse": "images/f-warehouse.jpg"
```

then add a tile to the gallery:

```html
<figure class="photo" tabindex="0" role="button"><img data-img="f-warehouse" alt="Warehouse"><figcaption>Warehouse</figcaption></figure>
```

Clicking any photo opens it full size. The photos were brightened slightly for
the web. Two views the site does not have yet: the factory exterior with signage,
and the office or sampling room — worth shooting when you get a chance.

## 3. Shawl photographs

Same system. Article photos are keyed by article number in `IMAGES`. To add an
article to the featured grid, add a line to `ARTICLES`:

```js
{ no:"8810", img:"8810", name:"Designer shawl", note:"Velvet finish" }
```

and add `"8810": "images/8810.jpg"` to `IMAGES`.

## 4. Catalogs

Catalog cards no longer link to a PDF or an on-site viewer. Both buttons on each
card open WhatsApp, so buyers have to reach you before they see the range. Every
other button on the site does the same — header, hero, collections, articles,
statistics and the enquiry form.

Each button carries its own pre-typed message naming what the buyer clicked, so
the chat arrives with context ("Interested in: Luxury Pattern Shawls"). To change
the wording, edit the `data-wa` attribute on that button, or the `reqMsg` function
in the script for the Request Catalog buttons.

## 5. Google Map

In the contact section, replace the block marked `data-slot="google-map"` with the
embed code from Google Maps. Set the iframe to `width:100%;height:100%;border:0`.

## 6. The enquiry form

There is no server behind the form yet, so submitted details are packaged into a
WhatsApp message the buyer sends you in one tap. To also receive them by email,
connect the form to a service like Formspree, Web3Forms or your own script — the
submit handler in `index.html` is marked with a comment showing where to post it.

## 7. Testimonials

The three quotes are placeholders and marked with a comment in the HTML. Replace
them with real buyer feedback once you have permission to use it.
