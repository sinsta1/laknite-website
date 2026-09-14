/* ============================================================
   LAKNITE® — shared site script (index, men, women, kids)
   ------------------------------------------------------------
   EDIT ZONE 1 — business details
   EDIT ZONE 2 — images
   EDIT ZONE 3 — catalogue PDF links
   EDIT ZONE 4 — third-party branded product shots
   Everything below the edit zones is machinery.
   ============================================================ */

/* ---------- EDIT ZONE 1 · business details -------------------
   whatsapp: country code + number, digits only, no + or spaces. */
const LAKNITE = {
  phone:     "+91 84391 64090",
  whatsapp:  "918439164090",
  email:     "info@laknite.com",
  address:   "Ludhiana, Punjab, India",
  instagram: "",          // e.g. "https://instagram.com/laknite"
  facebook:  ""           // e.g. "https://facebook.com/laknite"
};

/* ---------- EDIT ZONE 2 · images -----------------------------
   Every picture on the site is named once here. Drop a new file
   into images/ and point the key at it to change it everywhere.
   Leave a value as "" to show a clean placeholder instead. */
const IMAGES = {
  /* brand marks */
  "logo-charcoal": "images/logo-charcoal.png",
  "logo-ivory":    "images/logo-ivory.png",
  "logo-navy":     "images/logo-navy.png",

  /* ---- MEN · product photography ---- */
  "m-gilet-navy":           "images/m-gilet-navy.jpg",
  "m-thermal-vest":         "images/m-thermal-vest.jpg",
  "m-mufflers-four":        "images/m-mufflers-four.jpg",
  "m-hoodie-black":         "images/m-hoodie-black.jpg",
  "m-hoodie-clean":         "images/m-hoodie-clean.png",
  "m-halfzip-sand":         "images/m-halfzip-sand.jpg",
  "m-halfzip-clean":        "images/m-halfzip-clean.png",
  "m-hoodie-colourblock":   "images/m-hoodie-colourblock.jpg",
  "m-colourblock-clean":    "images/m-colourblock-clean.png",

  /* ---- WOMEN · product photography ---- */
  "w-cape-fur":      "images/w-cape-fur.jpg",
  "w-stole-fringe":  "images/w-stole-fringe.jpg",
  "w-beanie-pink":   "images/w-beanie-pink.jpg",
  "w-cardigan-white": "images/w-cardigan-white.png",
  "w-shawl-s8411":   "images/w-shawl-s8411.jpg",
  "w-shawl-s8507":   "images/w-shawl-s8507.jpg",

  /* ---- KIDS · product photography ---- */
  "k-monkey-cap-bear":     "images/k-monkey-cap-bear.jpg",
  "k-boys-sweaters":       "images/k-boys-sweaters.jpg",
  "k-boys-sweaters-5331":  "images/k-boys-sweaters-5331.jpg",
  "k-slippers":            "images/k-slippers.jpg",
  "k-gilet-quilted":       "images/k-gilet-quilted.jpg",
  "k-collar-knitwear":     "images/k-collar-knitwear.png",
  "k-slippers-clean":      "images/k-slippers-clean.png",
  "k-girls-winter-top":    "images/k-girls-winter-top.png",
  "k-winter-gloves":       "images/k-winter-gloves.png",

  /* ---- catalogue covers (2026-27) ---- */
  "c-men":     "images/c-men.jpg",
  "c-ladies":  "images/c-ladies.jpg",
  "c-capes":   "images/c-capes.jpg",
  "c-monkey":  "images/c-monkey.jpg",
  "c-boys":    "images/c-boys.jpg",
  "c-muffler": "images/c-muffler.jpg",
  "c-thermal": "images/c-thermal.jpg",
  "c-shawls-s8400": "images/c-shawls-s8400.png",
  "c-kids-slippers-m9000": "images/c-kids-slippers-m9000.png",

  /* ---- showroom + manufacturing ---- */
  "showroom":            "images/showroom.jpg",
  "f-cone-winding":      "images/f-cone-winding.jpg",
  "f-cutting-press":     "images/f-cutting-press.jpg",
  "f-drying":            "images/f-drying.jpg",
  "f-folding":           "images/f-folding.jpg",
  "f-inspection":        "images/f-inspection.jpg",
  "f-knitting-cixing":   "images/f-knitting-cixing.jpg",
  "f-knitting-fabric":   "images/f-knitting-fabric.jpg",
  "f-knitting-flat":     "images/f-knitting-flat.jpg",
  "f-material-store":    "images/f-material-store.jpg",
  "f-pressing":          "images/f-pressing.jpg",
  "f-production-floor":  "images/f-production-floor.jpg",
  "f-stitching-hall":    "images/f-stitching-hall.jpg",
  "f-washing":           "images/f-washing.jpg",
  "f-yarn-prep":         "images/f-yarn-prep.jpg",
  "f-yarn-winding":      "images/f-yarn-winding.jpg"
};

/* ---------- EDIT ZONE 3 · catalogue PDF links ----------------
   Paste a PDF URL against a series to turn its Download button
   into a real download. Left empty, the button asks for the
   catalogue on WhatsApp instead, so nothing is ever broken. */
const CATALOGUES = {
  "W-1000": "",   // Men's Windcheater & Outerwear
  "M-9500": "",   // Premium Mufflers
  "T-6000": "",   // Thermal Innerwear
  "L-8000": "",   // Ladies Caps
  "P-3200": "",   // Fancy Capes & Ponchos
  "S-8400": "",   // Ladies Shawls & Stoles
  "C-2000": "",   // Kids Monkey Caps
  "K-5300": "",   // Boys Winter Tops
  "M-9000": "",   // Kids Slippers
  "FULL":   ""    // Complete 2026-27 set
};

/* ---------- EDIT ZONE 4 · third-party branded shots ----------
   Five of the uploaded photographs show garments carrying other
   companies' trademarks (adidas, Calvin Klein, Tommy Hilfiger,
   Peppa Pig). Their slots are built and sized, but they render
   as clean placeholders until you set this to true.
   Publishing another brand's mark on a wholesale site is the
   easiest thing in the world for that brand's legal team to
   find, so the decision is deliberately left to you. */
const SHOW_THIRD_PARTY_BRANDED = false;

/* ============================================================
   MACHINERY — no need to edit below this line
   ============================================================ */

/* ---- images + branded placeholders ---- */
const phMarkup = (label, note) =>
  '<div class="ph">' +
    '<i>Image slot</i>' +
    '<b>' + (label || "Photograph") + '</b>' +
    '<small>' + (note || "Drop a file into images/ and name it in the IMAGES list.") + '</small>' +
  '</div>';

document.querySelectorAll("[data-img]").forEach(el => {
  const branded = el.hasAttribute("data-branded");
  const src = IMAGES[el.dataset.img];

  if (branded && !SHOW_THIRD_PARTY_BRANDED) {
    el.outerHTML = phMarkup(
      el.dataset.phLabel || "Own-label photograph",
      el.dataset.phNote  || "Reserved for a LAKNITE-labelled shot of this article."
    );
    return;
  }
  if (src) { el.src = src; return; }
  el.outerHTML = phMarkup(el.dataset.phLabel, el.dataset.phNote);
});

/* ---- links built from the business details ---- */
const waLink = t => "https://wa.me/" + LAKNITE.whatsapp + "?text=" + encodeURIComponent(t);

document.querySelectorAll("[data-tel]").forEach(a => {
  a.href = "tel:" + LAKNITE.phone.replace(/\s/g, "");
  a.textContent = LAKNITE.phone;
});
document.querySelectorAll("[data-mail]").forEach(a => {
  a.href = "mailto:" + LAKNITE.email;
  a.textContent = LAKNITE.email;
});
document.querySelectorAll("[data-walabel]").forEach(a => { a.textContent = LAKNITE.phone; });
document.querySelectorAll("[data-addr]").forEach(el => { el.textContent = LAKNITE.address; });

document.querySelectorAll(".wa").forEach(a => {
  if (a.tagName === "A") {
    a.href = waLink(a.dataset.wa || "Hello LAKNITE");
    a.target = "_blank";
    a.rel = "noopener";
  }
});

document.querySelectorAll("[data-social]").forEach(a => {
  const url = LAKNITE[a.dataset.social];
  if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
  else { a.addEventListener("click", e => e.preventDefault()); }
});

/* ---- download catalogue buttons ---- */
document.querySelectorAll("[data-cat]").forEach(a => {
  const key = a.dataset.cat;
  const url = CATALOGUES[key];
  if (url) {
    a.href = url;
    a.setAttribute("download", "");
    a.target = "_blank";
    a.rel = "noopener";
  } else {
    a.href = waLink("Hello LAKNITE, please send me the " + (a.dataset.catName || key) +
                    " catalogue for 2026-27.");
    a.target = "_blank";
    a.rel = "noopener";
    a.title = "The PDF is sent over WhatsApp";
  }
});

const yr = document.getElementById("yr");
if (yr) yr.textContent = new Date().getFullYear();

/* ---- homepage hero slideshow: Men → Women → Kids ---- */
const heroSlides = [...document.querySelectorAll(".hero-plates .hero-slide")];
if (heroSlides.length > 1) {
  let heroIndex = 0;
  heroSlides.forEach((slide, index) => slide.classList.toggle("active", index === 0));
  window.setInterval(() => {
    heroSlides[heroIndex].classList.remove("active");
    heroIndex = (heroIndex + 1) % heroSlides.length;
    heroSlides[heroIndex].classList.add("active");
  }, 3500);
}

/* ---- mobile menu ---- */
const burger = document.getElementById("burger"), mnav = document.getElementById("mnav");
if (burger && mnav) {
  burger.addEventListener("click", () => {
    const open = mnav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  mnav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    mnav.classList.remove("open");
    burger.setAttribute("aria-expanded", false);
  }));
}

/* ---- in-page nav highlighting (works on any page) ---- */
const spyLinks = [...document.querySelectorAll(".subnav a, .nav a")]
  .filter(l => (l.getAttribute("href") || "").startsWith("#"));
const spyTargets = spyLinks
  .map(l => ({ link: l, el: document.querySelector(l.getAttribute("href")) }))
  .filter(t => t.el);

if (spyTargets.length && "IntersectionObserver" in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      spyTargets.forEach(t => t.link.classList.toggle("on", t.el === en.target));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  spyTargets.forEach(t => obs.observe(t.el));
}

/* ---- dealer enquiry, packaged into a WhatsApp message ---- */
const form = document.getElementById("enq");
if (form) {
  const done = document.getElementById("done");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const showErr = (n, m) => {
    const s = form.querySelector('[data-err="' + n + '"]');
    if (s) s.textContent = m || "";
  };

  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    let ok = true;
    ["name", "business", "city", "phone"].forEach(k => showErr(k, ""));
    if (!d.name.trim())     { showErr("name", "Enter your name"); ok = false; }
    if (!d.business.trim()) { showErr("business", "Enter your business name"); ok = false; }
    if (!d.city.trim())     { showErr("city", "Enter your city"); ok = false; }
    if ((d.phone || "").replace(/\D/g, "").length < 10) {
      showErr("phone", "Enter a 10 digit phone number"); ok = false;
    }
    if (!ok) return;

    /* No server is connected. To also store leads, post this object to
       your own endpoint (Formspree, Web3Forms, your script) right here,
       before WhatsApp opens. */
    const summary =
      "New dealer enquiry from the LAKNITE website\n\n" +
      "Name: " + d.name + "\nBusiness: " + d.business + "\nCity: " + d.city +
      "\nType: " + d.type + "\nPhone: " + d.phone +
      "\nCategories: " + d.category +
      "\nRequirement: " + (d.requirement || "—");

    const link = waLink(summary);
    document.getElementById("doneWa").href = link;
    document.getElementById("doneLine").textContent =
      "Thank you, " + d.name.split(" ")[0] + ". WhatsApp is opening with your details " +
      "ready to send. If it did not open, use the button below.";
    window.open(link, "_blank", "noopener");
    form.style.display = "none";
    done.classList.add("show");
    done.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  });

  const again = document.getElementById("againBtn");
  if (again) again.addEventListener("click", () => {
    form.reset();
    form.style.display = "";
    done.classList.remove("show");
    document.getElementById("f-name").focus();
  });
}
