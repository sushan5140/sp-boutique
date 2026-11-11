/* SP Boutique — site behaviour. Shop data lives in catalogue.js. */
(() => {
  "use strict";
  const D = window.SPB;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- helpers ---------- */
  const wa = (text) => `https://wa.me/${D.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  const unsplash = (id, w, h, q = 70) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=${q}`;
  const src = (p, w, h, q) => unsplash(p.photo, w, h, q) + (p.focus || "");
  const imgAttrs = (p, sizes) => {
    if (p.image) return `src="${esc(p.image)}"`;
    const set = [320, 480, 720, 960].map((w) => `${src(p, w, Math.round(w * 1.25))} ${w}w`).join(", ");
    return `src="${src(p, 480, 600)}" srcset="${set}" sizes="${sizes}"`;
  };
  const thumb = (p) => (p.image ? p.image : src(p, 160, 200, 60));
  const priceText = (p) => (p.price ? `${p.priceFrom ? "From " : ""}₹${Number(p.price).toLocaleString("en-IN")}` : "Ask for price");
  const catName = (id) => (D.categories.find((c) => c.id === id) || {}).name || "";
  const byId = (id) => D.products.find((p) => p.id === id);
  const pageUrl = (id) => `${location.origin}${location.pathname}#design=${id}`;

  let toastTimer;
  const toast = (msg) => {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("on"), 2200);
  };

  /* Static WhatsApp links: <a data-wa="message"> */
  $$("[data-wa]").forEach((a) => { a.href = wa(a.dataset.wa); });

  /* ---------- enquiry list (saved on this device) ---------- */
  const KEY = "spb-enquiry-list";
  let list = [];
  try { list = JSON.parse(localStorage.getItem(KEY) || "[]").filter(byId); } catch { list = []; }
  const saveList = () => { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* private mode */ } };

  const itemMessage = (p, extra = []) => [
    "Hello SP Boutique, I would like to enquire about this design:",
    "",
    `*${p.name}*`,
    `Code: ${p.code}`,
    `Category: ${catName(p.cat)}`,
    `Price on website: ${priceText(p)}`,
    ...extra,
    "",
    `Design link: ${pageUrl(p.id)}`,
    "",
    "Please share the price and availability."
  ].join("\n");

  const listMessage = () => [
    "Hello SP Boutique, I would like to enquire about these designs:",
    "",
    ...list.map(byId).map((p, i) => `${i + 1}. *${p.name}* (${p.code}) - ${priceText(p)}\n${pageUrl(p.id)}`),
    "",
    "Please share the prices and availability."
  ].join("\n");

  const renderList = () => {
    const count = $("[data-list-count]");
    count.textContent = list.length;
    count.hidden = !list.length;
    $("[data-open-list]").setAttribute("aria-label", `Open enquiry list, ${list.length} ${list.length === 1 ? "design" : "designs"}`);
    const box = $("#listItems");
    box.innerHTML = list.length
      ? list.map(byId).map((p) => `
        <div class="item">
          <img src="${thumb(p)}" alt="" width="64" height="80">
          <div><b>${esc(p.name)}</b><span>${priceText(p)}</span></div>
          <button class="iconbtn" type="button" data-remove="${p.id}" aria-label="Remove ${esc(p.name)}"><svg width="18" height="18"><use href="#i-x"/></svg></button>
        </div>`).join("")
      : `<div class="drawer__empty"><svg width="36" height="36"><use href="#i-heart"/></svg><p>Your list is empty.<br>Tap the heart on any design to add it here.</p></div>`;
    const send = $("#listSend");
    send.href = list.length ? wa(listMessage()) : "#collections";
    send.setAttribute("aria-disabled", String(!list.length));
    $$(".heart").forEach((h) => h.setAttribute("aria-pressed", String(list.includes(h.dataset.heart))));
    syncSheetSave();
  };

  const toggleList = (id, el) => {
    const on = !list.includes(id);
    list = on ? [...list, id] : list.filter((x) => x !== id);
    saveList();
    renderList();
    if (on) {
      const c = $("[data-list-count]");
      c.classList.remove("pop"); void c.offsetWidth; c.classList.add("pop");
      if (el) { el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }
    }
    toast(on ? "Added to your enquiry list" : "Removed from your enquiry list");
  };

  /* ---------- collections ---------- */
  const FIRST = 12;
  let filter = "all";
  let expanded = false;
  const shown = () => (filter === "all" ? D.products : D.products.filter((p) => p.cat === filter));

  $("#cats").innerHTML = D.categories.map((c) => `
    <button class="cat" type="button" role="listitem" data-cat="${c.id}" aria-pressed="false">
      <span class="cat__img"><img src="${unsplash(c.cover, 200, 200, 65)}" alt="" width="92" height="92"></span>
      <span>${esc(c.name)}</span>
    </button>`).join("");

  $("#filters").innerHTML = [{ id: "all", name: "All designs" }, ...D.categories].map((c) => {
    const n = c.id === "all" ? D.products.length : D.products.filter((p) => p.cat === c.id).length;
    return `<button class="filter" type="button" data-filter="${c.id}" aria-pressed="${c.id === filter}">${esc(c.name)}<small>${n}</small></button>`;
  }).join("");

  const renderGrid = () => {
    const all = shown();
    const items = filter === "all" && !expanded ? all.slice(0, FIRST) : all;
    $("#grid").innerHTML = items.map((p, i) => `
      <article class="card" style="--i:${Math.min(i, 11)}">
        <button class="card__open" type="button" data-open="${p.id}" aria-label="View ${esc(p.name)}">
          <img ${imgAttrs(p, "(max-width: 860px) 46vw, (max-width: 1040px) 30vw, 270px")} alt="${esc(p.name)}" width="480" height="600" loading="lazy">
        </button>
        <button class="heart" type="button" data-heart="${p.id}" aria-pressed="${list.includes(p.id)}" aria-label="Save ${esc(p.name)} to enquiry list"><svg width="20" height="20"><use href="#i-heart"/></svg></button>
        <div class="card__meta">
          <p class="card__cat">${esc(catName(p.cat))}</p>
          <h3><button type="button" data-open="${p.id}">${esc(p.name)}</button></h3>
          <div class="card__row">
            <span class="price">${priceText(p)}</span>
            <a class="card__wa" href="${wa(itemMessage(p))}" target="_blank" rel="noopener" aria-label="Enquire about ${esc(p.name)} on WhatsApp"><svg width="15" height="15"><use href="#i-wa"/></svg>Enquire</a>
          </div>
        </div>
      </article>`).join("");
    const more = $("#more");
    more.hidden = !(filter === "all" && !expanded && all.length > FIRST);
    more.textContent = `Show all ${all.length} designs`;
    $$(".filter").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === filter)));
    $$(".cat").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === filter)));
  };

  const setFilter = (id) => { filter = id; renderGrid(); };

  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter]");
    if (b) setFilter(b.dataset.filter);
  });
  $("#cats").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    setFilter(b.dataset.cat);
    $("#collections").scrollIntoView();
  });
  $("#more").addEventListener("click", () => { expanded = true; renderGrid(); });

  /* ---------- product sheet ---------- */
  const sheet = $("#sheet");
  let current = null;

  const sheetExtra = () => {
    const f = new FormData($("#sheetForm"));
    const note = (f.get("note") || "").trim();
    return [`I need: ${f.get("need")}`, ...(note ? [`Note: ${note}`] : [])];
  };
  const syncSheetWa = () => { if (current) $("#sheetWa").href = wa(itemMessage(current, sheetExtra())); };
  function syncSheetSave() {
    if (!current) return;
    const on = list.includes(current.id);
    $("#sheetSave").textContent = on ? "Remove from list" : "Add to enquiry list";
  }

  const fillSheet = (p) => {
    current = p;
    const img = $("#sheetImg");
    img.removeAttribute("srcset");
    if (p.image) { img.src = p.image; }
    else {
      img.srcset = [480, 800, 1200].map((w) => `${src(p, w, Math.round(w * 1.25), 72)} ${w}w`).join(", ");
      img.sizes = "(max-width: 860px) 100vw, 460px";
      img.src = src(p, 800, 1000, 72);
    }
    img.alt = p.name;
    $("#sheetCat").textContent = catName(p.cat);
    $("#sheetName").textContent = p.name;
    $("#sheetPrice").textContent = priceText(p);
    $("#sheetPriceNote").textContent = p.price
      ? "Final price depends on the fabric and work you choose."
      : "It depends on fabric and work. We reply with the exact price.";
    $("#sheetDesc").textContent = p.desc;
    $("#sheetCode").textContent = `Code ${p.code}`;
    syncSheetWa();
    syncSheetSave();
  };

  const openSheet = (id, push = true) => {
    const p = byId(id);
    if (!p) return;
    fillSheet(p);
    if (!sheet.open) sheet.showModal();
    if (push) history.replaceState(null, "", `#design=${id}`);
  };
  const stepSheet = (dir) => {
    const pool = shown().includes(current) ? shown() : D.products;
    const i = pool.indexOf(current);
    openSheet(pool[(i + dir + pool.length) % pool.length].id);
  };

  $("#sheetPrev").addEventListener("click", () => stepSheet(-1));
  $("#sheetNext").addEventListener("click", () => stepSheet(1));
  $("#sheetForm").addEventListener("input", syncSheetWa);
  $("#sheetForm").addEventListener("submit", (e) => e.preventDefault());
  $("#sheetSave").addEventListener("click", () => toggleList(current.id));
  $("#sheetShare").addEventListener("click", async () => {
    const url = pageUrl(current.id);
    try {
      if (navigator.share && matchMedia("(pointer: coarse)").matches) await navigator.share({ title: current.name, url });
      else { await navigator.clipboard.writeText(url); toast("Link copied"); }
    } catch { /* share sheet dismissed */ }
  });
  sheet.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    if (e.key === "ArrowLeft") stepSheet(-1);
    if (e.key === "ArrowRight") stepSheet(1);
  });
  sheet.addEventListener("close", () => {
    current = null;
    if (location.hash.startsWith("#design=")) history.replaceState(null, "", location.pathname + location.search + "#collections");
  });

  /* ---------- dialogs: shared open / close ---------- */
  const listDlg = $("#list");
  $$("dialog").forEach((d) => {
    d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-close]")) d.close(); });
  });
  $("[data-open-list]").addEventListener("click", () => listDlg.showModal());
  $("#listItems").addEventListener("click", (e) => {
    const b = e.target.closest("[data-remove]");
    if (b) toggleList(b.dataset.remove);
  });
  $("#listSend").addEventListener("click", (e) => {
    if (!list.length) { e.preventDefault(); listDlg.close(); }
  });

  document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]");
    if (open) return openSheet(open.dataset.open);
    const heart = e.target.closest("[data-heart]");
    if (heart) toggleList(heart.dataset.heart, heart);
  });

  const fromHash = () => {
    const m = location.hash.match(/^#design=([\w-]+)/);
    if (m) openSheet(m[1], false);
  };
  addEventListener("hashchange", fromHash);

  /* ---------- outfit studio ---------- */
  const STUDIO = {
    garment: [
      ["blouse", "Blouse"], ["suit", "Salwar suit / kurta"], ["lehenga", "Lehenga"],
      ["half", "Half saree"], ["gown", "Anarkali / gown"], ["pavadai", "Pattu pavadai"]
    ],
    neck: [["round", "Round"], ["boat", "Boat"], ["square", "Square"], ["sweet", "Sweetheart"], ["v", "V neck"], ["high", "High neck"]],
    sleeve: [["none", "Sleeveless"], ["cap", "Cap"], ["puff", "Puff"], ["elbow", "Elbow"], ["full", "Full"]],
    work: [["plain", "Plain"], ["computer", "Computer embroidery"], ["maggam", "Maggam / aari work"], ["zari", "Zari border"]],
    colour: [
      ["Coral", "#e8656c"], ["Rani pink", "#c2255c"], ["Maroon", "#7a1f2b"], ["Mustard", "#d9a520"],
      ["Bottle green", "#1f5d46"], ["Navy", "#1e4a78"], ["Lavender", "#a996d6"], ["Ivory", "#f1e7d3"]
    ],
    fabric: [["own", "I will bring my own fabric"], ["shop", "Help me choose fabric at the shop"]]
  };
  const pick = { garment: "blouse", neck: "boat", sleeve: "elbow", work: "computer", colour: "Coral", fabric: "own" };
  const labelOf = (g, v) => (STUDIO[g].find((o) => o[0] === v) || [])[1];

  $$("#studioForm [data-group]").forEach((box) => {
    const g = box.dataset.group;
    box.innerHTML = STUDIO[g].map(([v, l]) => g === "colour"
      ? `<label class="swatch" style="--c:${l}"><input type="radio" name="${g}" value="${v}" aria-label="${v}" ${pick[g] === v ? "checked" : ""}><span class="swatch__colour"></span><span class="swatch__name">${v}</span></label>`
      : `<label class="chip"><input type="radio" name="${g}" value="${v}" ${pick[g] === v ? "checked" : ""}><span>${l}</span></label>`
    ).join("");
  });

  /* Flat sketch, 240 x 280. Shoulders and armholes are shared by every garment,
     so neck and sleeve choices work on all of them. */
  const sketch = () => {
    const fill = STUDIO.colour.find((c) => c[0] === pick.colour)[1];
    const line = "#002544";
    const gold = pick.colour === "Mustard" || pick.colour === "Ivory" ? "#8a5a12" : "#e0b04a";
    const boat = pick.neck === "boat", high = pick.neck === "high";
    const NL = boat ? [86, 57] : high ? [106, 50] : [100, 52];
    const NR = [240 - NL[0], NL[1]];
    const neck = {
      round: "Q120,98 100,52",
      boat: "Q120,70 86,57",
      square: "L140,90 L100,90 L100,52",
      sweet: "C140,86 126,96 120,82 C114,96 100,86 100,52",
      v: "L120,100 L100,52",
      high: "Q120,57 106,50"
    }[pick.neck];
    const neckLine = `M${NR} ${neck}`;

    const lower = {
      blouse: "L70,150 Q120,158 170,150",
      suit: "L60,226 Q120,233 180,226",
      lehenga: "L70,138 Q120,145 170,138",
      half: "L70,138 Q120,145 170,138",
      pavadai: "L70,138 Q120,145 170,138",
      gown: "L74,126 C60,180 40,230 28,262 Q120,276 212,262 C200,230 180,180 166,126"
    }[pick.garment];
    const hem = {
      blouse: "M70,150 Q120,158 170,150",
      suit: "M60,226 Q120,233 180,226",
      gown: "M28,262 Q120,276 212,262"
    }[pick.garment] || "M28,262 Q120,276 212,262";
    const body = `M${NL} L56,68 Q74,90 66,112 ${lower} L174,112 Q166,90 184,68 L${NR} ${neck} Z`;

    const sleeves = {
      none: null,
      cap: ["M56,68 C40,68 34,84 42,98 L68,108 Z", "M42,98 L68,108"],
      puff: ["M56,68 C22,56 10,100 34,120 L68,116 Z", "M34,120 L68,116"],
      elbow: ["M56,68 L26,146 L54,154 L67,112 Z", "M26,146 L54,154"],
      full: ["M56,68 L12,214 L36,222 L67,112 Z", "M12,214 L36,222"]
    }[pick.sleeve];

    const skirt = ["lehenga", "half", "pavadai"].includes(pick.garment)
      ? `<path d="M76,138 C60,188 40,234 28,262 Q120,276 212,262 C200,234 180,188 164,138 Q120,146 76,138 Z" fill="${fill}" stroke="${line}"/>
         <path d="M96,146 C88,190 78,232 72,267 M144,146 C152,190 162,232 168,267 M120,145 L120,271" stroke="${line}" opacity=".28" fill="none"/>` : "";
    const pants = pick.garment === "suit"
      ? `<path d="M80,222 L76,272 L112,272 L118,222 Z M122,222 L128,272 L164,272 L160,222 Z" fill="#fff" stroke="${line}"/>` : "";
    const voni = pick.garment === "half"
      ? `<path d="M150,54 L182,68 L104,150 L70,140 Z" fill="#fff" fill-opacity=".72" stroke="${line}"/>
         <path d="M176,72 L96,152" stroke="${gold}" stroke-width="3"/>` : "";
    const collar = high ? `<path d="M106,50 L105,40 Q120,46 135,40 L134,50" fill="${fill}" stroke="${line}"/>` : "";

    const dots = (d, extra = "") => `<path d="${d}" fill="none" stroke="${gold}" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="0.1 7" ${extra}/>`;
    const band = (d, w = 5, extra = "") => `<path d="${d}" fill="none" stroke="${gold}" stroke-width="${w}" ${extra}/>`;
    const grow = (k) => `transform="translate(120 52) scale(${k}) translate(-120 -52)"`;
    const lift = 'transform="translate(0 -7)"';
    const sleeve = sleeves ? `<path d="${sleeves[0]}" fill="${fill}" stroke="${line}"/>` : "";
    const trims = sleeves && pick.work !== "plain"
      ? (pick.work === "zari" ? band(sleeves[1], 6, 'transform="translate(1 -4)"')
        : dots(sleeves[1], 'transform="translate(1 -6)"') + (pick.work === "maggam" ? dots(sleeves[1], 'transform="translate(3 -14)"') : "")) : "";
    let bodyWork = "";
    if (pick.work === "computer") bodyWork = dots(neckLine, grow(1.22)) + dots(hem, lift);
    if (pick.work === "maggam") bodyWork = dots(neckLine, grow(1.2)) + dots(neckLine, grow(1.42)) + dots(hem, lift) + dots(hem, 'transform="translate(0 -15)"');
    if (pick.work === "zari") bodyWork = band(neckLine, 4, grow(1.14)) + band(hem, 7, 'transform="translate(0 -5)"');

    const vb = pick.garment === "blouse" ? (pick.sleeve === "full" ? "0 28 240 204" : "0 28 240 140") : "0 28 240 256";
    return `<svg viewBox="${vb}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
      <g class="sk">
        ${pants}${skirt}
        <g>${sleeve}${trims}</g>
        <g transform="translate(240 0) scale(-1 1)">${sleeve}${trims}</g>
        <clipPath id="skClip"><path d="${body}"/></clipPath>
        <path d="${body}" fill="${fill}" stroke="${line}"/>
        <g clip-path="url(#skClip)">${bodyWork}</g>
        ${voni}${collar}
        <path d="${body}" fill="none" stroke="${line}"/>
      </g>
    </svg>`;
  };

  const fmtDate = (v) => {
    if (!v) return "";
    const d = new Date(`${v}T00:00:00`);
    return isNaN(d) ? "" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  let studioText = "";
  const renderStudio = () => {
    const need = fmtDate($("#needBy").value);
    const note = $("#studioNote").value.trim();
    const rows = [
      ["Garment", labelOf("garment", pick.garment)],
      ["Neck", labelOf("neck", pick.neck)],
      ["Sleeve", labelOf("sleeve", pick.sleeve)],
      ["Work", labelOf("work", pick.work)],
      ["Colour", pick.colour],
      ["Fabric", pick.fabric === "own" ? "My own fabric" : "Choose at the shop"],
      ...(need ? [["Needed by", need]] : []),
      ...(note ? [["Design note", note]] : [])
    ];
    $("#sketch").innerHTML = sketch();
    $("#sketch").setAttribute("aria-label", `Sketch: ${pick.colour} ${labelOf("garment", pick.garment)}, ${labelOf("neck", pick.neck)} neck, ${labelOf("sleeve", pick.sleeve)} sleeve, ${labelOf("work", pick.work)}`);
    $("#slipRows").innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("");
    $("#colourName").textContent = pick.colour;
    $("#lookName").textContent = `Your ${labelOf("garment", pick.garment).toLowerCase()}`;
    $("#lookDescription").textContent = `${pick.colour} · ${labelOf("neck", pick.neck)} neck · ${labelOf("work", pick.work)}`;
    studioText = [
      "Hello SP Boutique, I put this outfit together in the Outfit Studio on your website:",
      "",
      ...rows.map(([k, v]) => `${k}: ${k === "Fabric" ? labelOf("fabric", pick.fabric) : v}`),
      "",
      "Please share the price and how long it will take."
    ].join("\n");
    $("#studioSend").href = wa(studioText);
  };

  /* The wardrobe worksheet: three concise groups; choices persist between tabs. */
  let studioStep = 0;
  const STAGE_NAMES = ["Silhouette", "Details", "Finish"];
  const STAGE_NEXT = ["Choose details", "Finishing touches", "Review your sketch"];
  const setStudioStep = (next, focusTab = false) => {
    studioStep = Math.max(0, Math.min(2, next));
    $(".studio__step").forEach((panel, i) => { panel.hidden = i !== studioStep; });
    $(".studio__step-tab").forEach((tab, i) => {
      const active = i === studioStep;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focusTab) tab.focus();
    });
    $("#studioStepStatus").textContent = STAGE_NAMES[studioStep] + " · " + (studioStep + 1) + " of 3";
    $("#studioBack").hidden = studioStep === 0;
    $("#studioNext").innerHTML = STAGE_NEXT[studioStep] + ' <span aria-hidden="true">→</span>';
  };
  $(".studio__stepper").addEventListener("click", (e) => {
    const button = e.target.closest("[data-studio-step]");
    if (button) setStudioStep(Number(button.dataset.studioStep));
  });
  $(".studio__stepper").addEventListener("keydown", (e) => {
    const tab = e.target.closest("[data-studio-step]");
    if (!tab || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const next = e.key === "Home" ? 0 : e.key === "End" ? 2
      : (studioStep + (e.key === "ArrowRight" ? 1 : 2)) % 3;
    setStudioStep(next, true);
  });
  $("#studioBack").addEventListener("click", () => setStudioStep(studioStep - 1));
  $("#studioNext").addEventListener("click", () => {
    if (studioStep < 2) return setStudioStep(studioStep + 1);
    $(".slipwrap").scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
    $("#studioSend").focus({ preventScroll: true });
  });
  setStudioStep(0);

  $("#studioForm").addEventListener("change", (e) => {
    if (e.target.name in pick) pick[e.target.name] = e.target.value;
    renderStudio();
  });
  $("#studioForm").addEventListener("submit", (e) => e.preventDefault());
  $("#studioCopy").addEventListener("click", async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unsupported");
      await navigator.clipboard.writeText(studioText);
      toast("Design details copied");
    } catch { toast("Copy unavailable — use WhatsApp to send this design"); }
  });
  const today = new Date();
  const localToday = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
  $("#needBy").min = localToday;
  $("#studioNote").addEventListener("input", renderStudio);

  /* ---------- stitching: classes and rates ---------- */
  $("#classes").innerHTML = D.classes.map((c) => `<li><b>${esc(c.name)}<small>${esc(c.level)}</small></b><span>${esc(c.note)}</span></li>`).join("");
  $("#rates").innerHTML = D.services.map((s) => `
    <li><a href="${wa(`Hello SP Boutique, what is the charge for: ${s.name}?`)}" target="_blank" rel="noopener">
      <div><b>${esc(s.name)}</b><span>${esc(s.note)}</span></div>
      <em>${s.price ? `From ₹${Number(s.price).toLocaleString("en-IN")}` : "Ask for price"}</em>
    </a></li>`).join("");

  /* ---------- enquiry form -> WhatsApp ---------- */
  $("#enquiry").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#eName"), err = $("#eNameErr");
    const ok = name.value.trim().length > 0;
    name.setAttribute("aria-invalid", String(!ok));
    err.hidden = ok;
    if (!ok) return name.focus();
    const msg = $("#eMsg").value.trim();
    const text = [
      `Hello SP Boutique, this is ${name.value.trim()}.`,
      `I am interested in: ${$("#eTopic").value}.`,
      ...(msg ? ["", msg] : [])
    ].join("\n");
    window.open(wa(text), "_blank", "noopener");
  });
  $("#eName").addEventListener("input", (e) => {
    if (e.target.value.trim()) { e.target.removeAttribute("aria-invalid"); $("#eNameErr").hidden = true; }
  });

  /* ---------- scroll spy for nav pill and dock ---------- */
  const spyLinks = $$("[data-spy]");
  const ind = $(".nav__ind");
  const setActive = (id) => {
    spyLinks.forEach((a) => a.setAttribute("aria-current", String(a.dataset.spy === id)));
    const a = $(`.nav a[data-spy="${id}"]`);
    if (a && a.offsetWidth) {
      ind.style.width = `${a.offsetWidth}px`;
      ind.style.transform = `translateX(${a.offsetLeft}px)`;
      ind.style.opacity = 1;
    } else ind.style.opacity = 0;
  };
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["home", "collections", "studio", "stitching", "visit"].forEach((id) => spy.observe(document.getElementById(id)));
  addEventListener("resize", () => {
    const cur = $('.nav a[aria-current="true"]');
    setActive(cur ? cur.dataset.spy : "home");
  });

  /* ---------- go ---------- */
  renderGrid();
  renderList();
  renderStudio();
  fromHash();
})();
