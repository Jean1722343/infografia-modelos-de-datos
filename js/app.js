/* Infografía interactiva — lógica, animaciones y panel de detalle (JavaScript puro). */
(() => {
  "use strict";

  const MODELOS = window.MODELOS;
  const $ = (sel, root = document) => root.querySelector(sel);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const colorOf = (m) => `var(--c-${m.id})`;
  const rawColor = (m) => getComputedStyle(document.documentElement).getPropertyValue(`--c-${m.id}`).trim();

  const ICON = {
    ok: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    bad: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>',
    ext: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>'
  };

  /* ---------- Portada: letras del título ---------- */
  const kicker = $(".hero__kicker");
  if (kicker) {
    kicker.innerHTML = [...kicker.textContent].map((ch, i) =>
      `<span class="ch" aria-hidden="true" style="--i:${i}">${ch === " " ? "&nbsp;" : ch}</span>`).join("");
  }

  /* ---------- Chips ---------- */
  $("#chips").innerHTML = MODELOS.map((m) =>
    `<a class="chip" href="#etapa-${m.id}" data-id="${m.id}" style="--c:${colorOf(m)}">${m.anio}<small>${m.nombre.replace("Modelo ", "")}</small></a>`
  ).join("");

  /* ---------- Etapas ---------- */
  const timeline = $("#linea");
  const stagesHTML = MODELOS.map((m) => `
    <section class="stage" id="etapa-${m.id}" data-id="${m.id}" style="--c:${colorOf(m)}" aria-labelledby="t-${m.id}">
      <div class="stage__head-mobile">
        <button class="year-btn" type="button" data-open="${m.id}" aria-label="Ver detalles de ${m.nombre} (${m.anio})">${m.anio}</button>
        <span class="etapa-m">ETAPA ${m.etapa}</span>
      </div>
      <div class="stage__media">
        <button class="media-btn" type="button" data-open="${m.id}" aria-label="Ver detalles de ${m.nombre}">
          <img src="${m.imagen}" alt="${m.alt}" width="1000" height="500" loading="lazy" decoding="async">
          <span class="tap"><span class="tap-dot" aria-hidden="true"></span>Toca para ver más</span>
        </button>
      </div>
      <div class="stage__mark">
        <span class="stage__etapa">ETAPA ${m.etapa}</span>
        <button class="year-btn desk" type="button" data-open="${m.id}" aria-label="Ver detalles de ${m.nombre} (${m.anio})">
          ${m.etapa === 1 ? "<small>AÑOS</small>" : ""}<span class="count" data-to="${m.anio}">${m.anio}</span>
        </button>
        <span class="stage__node" aria-hidden="true"></span>
      </div>
      <div class="stage__body">
        <h2 id="t-${m.id}"><button class="title-btn" type="button" data-open="${m.id}">${m.nombre}</button></h2>
        <p class="stage__origin">(${m.origen}) <span class="badge-rel">${m.relacion}</span></p>
        <p class="stage__summary">${m.resumen}</p>
        <ul class="stage__pc">
          <li><span class="ic ic--ok" aria-hidden="true">${ICON.ok}</span><span><span class="sr">Ventaja: </span>${m.pro}</span></li>
          <li><span class="ic ic--bad" aria-hidden="true">${ICON.bad}</span><span><span class="sr">Desventaja: </span>${m.contra}</span></li>
        </ul>
        <button class="more-btn" type="button" data-open="${m.id}">Ver ficha completa ${ICON.arrow}</button>
      </div>
    </section>`).join("");
  timeline.insertAdjacentHTML("beforeend", stagesHTML);
  document.querySelectorAll(".sr").forEach((el) => {
    Object.assign(el.style, { position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" });
  });

  /* ---------- Autor y fuentes ---------- */
  const avColors = MODELOS.map(rawColor);
  $("#equipo").innerHTML = window.EQUIPO.map((n, i) => {
    const ini = n.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("");
    return `<li><span class="av" style="background:${avColors[i % avColors.length]}" aria-hidden="true">${ini}</span>${n}</li>`;
  }).join("");
  $("#fuentes-lista").innerHTML = window.FUENTES.map((f) =>
    `<li><a href="${f.url}" target="_blank" rel="noopener noreferrer"><b>${f.titulo}</b><span>${f.sitio}</span>${ICON.ext}</a></li>`
  ).join("");
  $("#referencias").innerHTML = window.REFERENCIAS.map((r) => `<li>${r}</li>`).join("");

  /* ---------- Entrada al hacer scroll ---------- */
  const countUp = (el) => {
    const to = +el.dataset.to;
    if (reduceMotion) { el.textContent = to; return; }
    const from = to - 40, t0 = performance.now(), dur = 900;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      const c = e.target.querySelector(".count");
      if (c) countUp(c);
      revealObs.unobserve(e.target);
    });
  }, { threshold: 0.22, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".stage, .reveal").forEach((el) => revealObs.observe(el));

  /* ---------- Etapa actual (chips + nodo) ---------- */
  const chips = [...document.querySelectorAll(".chip")];
  const stages = [...document.querySelectorAll(".stage")];
  const currentObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = e.target.dataset.id;
      stages.forEach((s) => s.classList.toggle("is-current", s === e.target));
      chips.forEach((c) => {
        const on = c.dataset.id === id;
        c.classList.toggle("is-active", on);
        if (on) {                // centra el chip moviendo solo su barra (no la página)
          const track = c.parentElement;
          const left = c.offsetLeft - (track.clientWidth - c.offsetWidth) / 2;
          track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
        }
      });
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  stages.forEach((s) => currentObs.observe(s));

  /* ---------- Línea que se dibuja + barra de progreso ---------- */
  const rail = $("#rail"), progress = $("#progress");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const r = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.55 - r.top) / r.height));
      rail.style.transform = `scaleY(${p})`;
      const doc = document.documentElement;
      progress.style.transform = `scaleX(${doc.scrollTop / Math.max(1, doc.scrollHeight - vh)})`;
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Inclinación 3D de las ilustraciones ---------- */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".media-btn").forEach((btn) => {
      btn.addEventListener("pointermove", (ev) => {
        const r = btn.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        btn.style.setProperty("--rx", `${x * 10}deg`);
        btn.style.setProperty("--ry", `${-y * 8}deg`);
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.setProperty("--rx", "0deg");
        btn.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* =====================================================================
     Mini animaciones SVG (una por modelo)
     ===================================================================== */
  const W = 560, H = 250;
  const svgWrap = (inner) => `<svg viewBox="0 0 ${W} ${H}" role="img">${inner}</svg>`;
  const edge = (x1, y1, x2, y2, d, cls = "") =>
    `<line class="sv-edge ${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="--d:${d}s"/>`;
  const arrowHead = (id, color) =>
    `<marker id="${id}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="${color}"/></marker>`;

  const ANIM = {
    jerarquico(c) {
      const root = [280, 40], l2 = [[130, 120], [280, 120], [430, 120]], l3 = [[75, 192], [185, 192], [375, 192], [485, 192]];
      const parentOf = [0, 0, 2, 2];
      let s = "";
      l2.forEach((p, i) => { s += edge(root[0], root[1], p[0], p[1], 0.25 + i * 0.12, i === 2 ? "hl-later" : ""); });
      l3.forEach((p, i) => { const q = l2[parentOf[i]]; s += edge(q[0], q[1], p[0], p[1], 0.8 + i * 0.1); });
      s += `<line class="sv-edge hl" x1="${root[0]}" y1="${root[1]}" x2="430" y2="120" style="--d:1.7s"/>`;
      s += `<line class="sv-edge hl" x1="430" y1="120" x2="485" y2="192" style="--d:2.1s"/>`;
      const node = (p, d, r = 19) => `<circle class="sv-pop" cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${c}" stroke="#1d3d70" stroke-width="2" style="--d:${d}s"/>`;
      s += node(root, 0.05, 22);
      l2.forEach((p, i) => { s += node(p, 0.5 + i * 0.12); });
      l3.forEach((p, i) => { s += node(p, 1.05 + i * 0.1); });
      s += `<circle class="sv-pop sv-pulse" cx="485" cy="192" r="25" fill="none" stroke="${c}" stroke-width="3" style="--d:2.5s"/>`;
      s += `<text class="sv-label sv-fade" x="312" y="38" style="--d:.3s">Raíz</text>`;
      s += `<text class="sv-small sv-fade" x="18" y="242" style="--d:1.4s">Cada hijo tiene un solo padre (1 : N)</text>`;
      s += `<text class="sv-small sv-fade" x="328" y="242" style="--d:2.4s" fill="${c}">Ruta de punteros desde la raíz</text>`;
      return svgWrap(s);
    },

    red(c) {
      const N = { A: [95, 60], B: [280, 40], C: [465, 70], D: [175, 195], E: [395, 195] };
      const links = [["A", "D"], ["B", "D"], ["B", "E"], ["C", "E"], ["A", "B"], ["D", "E"], ["C", "B"], ["A", "E"]];
      let s = `<defs>${arrowHead("ah-red", "#23324a")}${arrowHead("ah-red-hl", c)}</defs>`;
      links.forEach(([a, b], i) => {
        const hl = (b === "D" && (a === "A" || a === "B"));
        const [x1, y1] = N[a], [x2, y2] = N[b];
        const k = 26 / Math.hypot(x2 - x1, y2 - y1);
        s += `<line class="sv-edge ${hl ? "hl" : ""}" x1="${x1 + (x2 - x1) * k}" y1="${y1 + (y2 - y1) * k}" x2="${x2 - (x2 - x1) * k}" y2="${y2 - (y2 - y1) * k}" marker-end="url(#${hl ? "ah-red-hl" : "ah-red"})" style="--d:${(hl ? 1.6 : 0.5) + i * 0.1}s"/>`;
      });
      Object.entries(N).forEach(([k, [x, y]], i) => {
        s += `<g class="sv-pop" style="--d:${0.05 + i * 0.1}s"><circle cx="${x}" cy="${y}" r="24" fill="#cfdbea" stroke="#23324a" stroke-width="2.5"/><text class="sv-label" x="${x}" y="${y + 5}" text-anchor="middle">Nodo</text></g>`;
      });
      s += `<circle class="sv-pop sv-pulse" cx="175" cy="195" r="31" fill="none" stroke="${c}" stroke-width="3" style="--d:2.3s"/>`;
      s += `<text class="sv-small sv-fade" x="18" y="244" style="--d:2.2s" fill="${c}">Un miembro con dos dueños (N : M)</text>`;
      s += `<text class="sv-small sv-fade" x="355" y="244" style="--d:1.2s">Enlazados con punteros · CODASYL</text>`;
      return svgWrap(s);
    },

    relacional(c) {
      const table = (x, y, name, rows, d) => {
        let g = `<g class="sv-fade" style="--d:${d}s"><rect x="${x}" y="${y}" width="210" height="${34 + rows.length * 30}" rx="10" fill="#fff" stroke="#23324a" stroke-width="2"/>`;
        g += `<rect x="${x}" y="${y}" width="210" height="34" rx="10" fill="${c}"/><rect x="${x}" y="${y + 24}" width="210" height="10" fill="${c}"/>`;
        g += `<text class="sv-label" x="${x + 14}" y="${y + 23}" fill="#fff" style="fill:#fff">${name}</text></g>`;
        rows.forEach(([key, col], i) => {
          const ry = y + 34 + i * 30;
          g += `<g class="sv-fade" style="--d:${d + 0.25 + i * 0.15}s">`;
          if (i) g += `<line x1="${x}" y1="${ry}" x2="${x + 210}" y2="${ry}" stroke="#d4dbe6"/>`;
          if (key) g += `<rect x="${x + 10}" y="${ry + 6}" width="34" height="19" rx="4" fill="${key === "PK" ? "#f6d77d" : "#9fe3e0"}" stroke="#23324a"/><text class="sv-label" x="${x + 27}" y="${ry + 20}" text-anchor="middle" style="font-size:12px">${key}</text>`;
          g += `<text class="sv-mono" x="${x + 54}" y="${ry + 20}">${col}</text></g>`;
        });
        return g;
      };
      let s = `<defs>${arrowHead("ah-rel", c)}</defs>`;
      s += table(24, 20, "Clientes", [["PK", "id_cliente"], ["", "nombre"], ["", "ciudad"]], 0.1);
      s += table(326, 20, "Pedidos", [["PK", "id_pedido"], ["FK", "id_cliente"], ["", "total"]], 0.5);
      s += `<path class="sv-edge hl" d="M326 119 C 280 119, 290 69, 236 69" marker-end="url(#ah-rel)" style="--d:1.5s"/>`;
      s += `<g class="sv-fade" style="--d:2.1s"><rect x="24" y="178" width="512" height="56" rx="10" fill="#111827"/>`;
      s += `<text class="sv-mono" x="40" y="201" style="fill:#9fe3e0">SELECT</text><text class="sv-mono" x="100" y="201" style="fill:#fff">nombre, total FROM Pedidos</text>`;
      s += `<text class="sv-mono" x="40" y="222" style="fill:#9fe3e0">JOIN</text><text class="sv-mono" x="84" y="222" style="fill:#fff">Clientes USING (id_cliente);</text></g>`;
      return svgWrap(s);
    },

    "objeto-relacional"(c) {
      let s = `<defs>${arrowHead("ah-or", c)}</defs>`;
      const cube = (x, y, d, fill) => `<g class="sv-pop" style="--d:${d}s"><path d="M${x} ${y + 8} l14 -8 14 8 v16 l-14 8 -14 -8z" fill="${fill}" stroke="#23324a" stroke-width="1.6"/><path d="M${x} ${y + 8} l14 8 14 -8 M${x + 14} ${y + 16} v16" fill="none" stroke="#23324a" stroke-width="1.6"/></g>`;
      // tabla padre
      s += `<g class="sv-fade" style="--d:.1s"><rect x="24" y="22" width="250" height="130" rx="10" fill="#fff" stroke="#23324a" stroke-width="2"/><rect x="24" y="22" width="250" height="34" rx="10" fill="${c}"/><rect x="24" y="46" width="250" height="10" fill="${c}"/><text class="sv-label" x="38" y="45" style="fill:#fff">Personas</text></g>`;
      s += `<text class="sv-mono sv-fade" x="40" y="80" style="--d:.4s">nombre   TEXT</text>`;
      s += `<text class="sv-mono sv-fade" x="40" y="108" style="--d:.6s">foto     IMAGEN</text>`;
      s += `<text class="sv-mono sv-fade" x="40" y="136" style="--d:.8s">domicilio Direccion</text>`;
      s += cube(222, 88, 1.0, "#f3d27a");
      s += cube(232, 118, 1.15, "#c9a8f0");
      // tabla hija con herencia
      s += `<g class="sv-fade" style="--d:1.3s"><rect x="326" y="22" width="210" height="102" rx="10" fill="#fff" stroke="#23324a" stroke-width="2"/><rect x="326" y="22" width="210" height="34" rx="10" fill="#23324a"/><rect x="326" y="46" width="210" height="10" fill="#23324a"/><text class="sv-label" x="340" y="45" style="fill:#fff">Estudiantes</text></g>`;
      s += `<text class="sv-mono sv-fade" x="342" y="82" style="--d:1.6s">matricula TEXT</text>`;
      s += `<text class="sv-small sv-fade" x="342" y="108" style="--d:1.8s">INHERITS (Personas)</text>`;
      s += `<path class="sv-edge hl" d="M326 74 C 300 74, 300 90, 276 90" marker-end="url(#ah-or)" style="--d:1.9s"/>`;
      s += `<text class="sv-small sv-fade" x="286" y="160" style="--d:2.1s" fill="${c}">Herencia de tablas</text>`;
      // función
      s += `<g class="sv-pop" style="--d:2.4s"><rect x="24" y="178" width="512" height="54" rx="10" fill="#111827"/><text class="sv-mono" x="40" y="201" style="fill:#f3d27a">CREATE FUNCTION</text><text class="sv-mono" x="176" y="201" style="fill:#fff">edad(Personas) RETURNS INT …</text><text class="sv-mono" x="40" y="222" style="fill:#9aa7bd">-- lógica de negocio dentro del motor</text></g>`;
      return svgWrap(s);
    },

    "orientado-objetos"(c) {
      const obj = (x, y, title, attrs, meths, d, oid) => {
        let g = `<g class="sv-pop" style="--d:${d}s"><rect x="${x}" y="${y}" width="160" height="${44 + (attrs.length + meths.length) * 20 + 12}" rx="12" fill="#f1e4f8" stroke="#5e2a73" stroke-width="2"/>`;
        g += `<rect x="${x}" y="${y}" width="160" height="32" rx="12" fill="${c}"/><rect x="${x}" y="${y + 22}" width="160" height="10" fill="${c}"/>`;
        g += `<text class="sv-label" x="${x + 12}" y="${y + 22}" style="fill:#fff">${title}</text>`;
        attrs.forEach((a, i) => { g += `<text class="sv-mono" x="${x + 12}" y="${y + 52 + i * 20}" style="font-size:13px">${a}</text>`; });
        const my = y + 52 + attrs.length * 20;
        g += `<line x1="${x + 8}" y1="${my - 13}" x2="${x + 152}" y2="${my - 13}" stroke="#b58bcc"/>`;
        meths.forEach((m, i) => { g += `<text class="sv-mono" x="${x + 12}" y="${my + 4 + i * 20}" style="font-size:13px;fill:#5e2a73">${m}</text>`; });
        g += `</g>`;
        if (oid) g += `<g class="sv-pop" style="--d:${d + 0.9}s"><rect x="${x + 96}" y="${y - 14}" width="74" height="24" rx="12" fill="#111"/><text class="sv-small" x="${x + 133}" y="${y + 3}" text-anchor="middle" style="fill:#fff">${oid}</text></g>`;
        return g;
      };
      let s = `<defs>${arrowHead("ah-oo", c)}</defs>`;
      s += obj(24, 26, "Persona", ["nombre", "edad"], ["saludar()"], 0.1, "OID #01");
      s += obj(376, 26, "Estudiante", ["matricula"], ["saludar()", "inscribir()"], 0.6, "OID #02");
      s += `<line class="sv-edge hl" x1="372" y1="80" x2="190" y2="80" marker-end="url(#ah-oo)" style="--d:1.2s"/>`;
      s += `<text class="sv-label sv-fade" x="236" y="70" style="--d:1.4s;fill:${c}">Herencia</text>`;
      s += `<text class="sv-small sv-fade" x="205" y="104" style="--d:1.7s">saludar() se comporta distinto:</text>`;
      s += `<text class="sv-label sv-fade" x="238" y="124" style="--d:1.9s">Polimorfismo</text>`;
      s += `<g class="sv-fade" style="--d:2.3s"><rect x="24" y="186" width="512" height="48" rx="10" fill="#111827"/><text class="sv-mono" x="40" y="207" style="fill:#c9a8f0">db.store(</text><text class="sv-mono" x="120" y="207" style="fill:#fff">new Estudiante("Ana", 20, "A-17"));</text><text class="sv-mono" x="40" y="226" style="fill:#9aa7bd">// el objeto se guarda tal cual, sin pasar a tablas</text></g>`;
      return svgWrap(s);
    }
  };

  const prepEdges = (root) => {
    root.querySelectorAll(".sv-edge").forEach((el) => {
      const len = Math.ceil(el.getTotalLength ? el.getTotalLength() : 300) + 2;
      el.style.setProperty("--len", len);
    });
  };

  /* =====================================================================
     Panel de detalle
     ===================================================================== */
  const sheet = $("#sheet"), panel = $(".sheet__panel", sheet);
  const tabsEl = $("#tabs"), tabBtns = [...tabsEl.querySelectorAll("[role=tab]")], tabpanel = $("#tabpanel");
  const prevBtn = $("#prev"), nextBtn = $("#next");
  const pill = document.createElement("span");
  pill.className = "pill";
  tabsEl.prepend(pill);

  let current = -1, currentTab = "definicion", lastFocus = null, closeTimer = null;

  const listHTML = (items, kind) => `<ul class="anim-in">${items.map(([t, d], i) => `
      <li><span class="num ${kind === "bad" ? "bad" : ""}" aria-hidden="true">${kind === "ok" ? ICON.ok : kind === "bad" ? ICON.bad : i + 1}</span>
      <span><b>${t}</b>${d}</span></li>`).join("")}</ul>`;

  const renderTab = (name, animate = true) => {
    currentTab = name;
    const m = MODELOS[current];
    tabBtns.forEach((b) => {
      const on = b.dataset.tab === name;
      b.setAttribute("aria-selected", on);
      b.tabIndex = on ? 0 : -1;
      if (on) {
        pill.style.width = `${b.offsetWidth}px`;
        pill.style.transform = `translateX(${b.offsetLeft}px)`;
      }
    });
    let html = "";
    if (name === "definicion") html = `<div class="anim-in"><p class="lead">${m.definicion}</p></div>`;
    if (name === "caracteristicas") html = listHTML(m.caracteristicas, "num");
    if (name === "ventajas") html = listHTML(m.ventajas, "ok");
    if (name === "desventajas") html = listHTML(m.desventajas, "bad");
    tabpanel.innerHTML = html;
    if (!animate) tabpanel.querySelectorAll(".anim-in").forEach((el) => el.classList.remove("anim-in"));
    tabpanel.setAttribute("aria-label", `${name} de ${m.nombre}`);
  };

  const render = (i) => {
    current = i;
    const m = MODELOS[i];
    panel.style.setProperty("--c", colorOf(m));
    $("#sheet-stage").textContent = `ETAPA ${m.etapa} · ${m.anio} · RELACIÓN ${m.relacion.toUpperCase()}`;
    $("#sheet-title").textContent = m.nombre;
    $("#sheet-origin").textContent = m.origen;
    $("#sheet-creator").textContent = `${m.anio} · ${m.creador}`;
    const anim = $("#sheet-anim");
    anim.innerHTML = ANIM[m.id](rawColor(m));
    prepEdges(anim);
    const p = MODELOS[i - 1], n = MODELOS[i + 1];
    prevBtn.disabled = !p; nextBtn.disabled = !n;
    $(".navbtn__label", prevBtn).textContent = p ? `${p.anio} · ${p.nombre.replace("Modelo ", "")}` : "";
    $(".navbtn__label", nextBtn).textContent = n ? `${n.anio} · ${n.nombre.replace("Modelo ", "")}` : "";
    renderTab(currentTab);
    panel.scrollTop = 0;
    if (history.replaceState) history.replaceState(null, "", `#${m.id}`);
  };

  const open = (id, opener) => {
    const i = MODELOS.findIndex((m) => m.id === id);
    if (i < 0) return;
    clearTimeout(closeTimer);
    lastFocus = opener || document.activeElement;
    currentTab = "definicion";
    sheet.hidden = false;
    document.body.classList.add("locked");
    render(i);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      sheet.classList.add("is-open");
      renderTab(currentTab);           // reposiciona la píldora ya con el panel visible
      panel.focus({ preventScroll: true });
    }));
  };

  const close = () => {
    if (sheet.hidden) return;
    sheet.classList.remove("is-open");
    document.body.classList.remove("locked");
    if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    closeTimer = setTimeout(() => { sheet.hidden = true; }, reduceMotion ? 0 : 560);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    // deja a la vista la etapa que se estaba leyendo
    const st = document.getElementById(`etapa-${MODELOS[current].id}`);
    if (st && (st.getBoundingClientRect().bottom < 0 || st.getBoundingClientRect().top > innerHeight)) {
      st.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    }
  };

  const go = (delta) => {
    const i = current + delta;
    if (i < 0 || i >= MODELOS.length) return;
    panel.animate?.([{ opacity: 1, transform: "none" }, { opacity: 0, transform: `translateX(${delta * -24}px)` }],
      { duration: reduceMotion ? 0 : 160, easing: "ease-in" }).finished.then(() => {
      render(i);
      panel.animate?.([{ opacity: 0, transform: `translateX(${delta * 24}px)` }, { opacity: 1, transform: "none" }],
        { duration: reduceMotion ? 0 : 320, easing: "cubic-bezier(.16,1,.3,1)" });
    });
  };

  document.addEventListener("click", (ev) => {
    const opener = ev.target.closest("[data-open]");
    if (opener) { ev.preventDefault(); open(opener.dataset.open, opener); return; }
    if (ev.target.closest("[data-close]")) close();
  });
  tabBtns.forEach((b) => b.addEventListener("click", () => renderTab(b.dataset.tab)));
  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));

  document.addEventListener("keydown", (ev) => {
    if (sheet.hidden) return;
    if (ev.key === "Escape") { ev.preventDefault(); close(); return; }
    const inTabs = tabsEl.contains(document.activeElement);
    if (ev.key === "ArrowRight" || ev.key === "ArrowLeft") {
      const d = ev.key === "ArrowRight" ? 1 : -1;
      if (inTabs) {
        const idx = (tabBtns.findIndex((b) => b.dataset.tab === currentTab) + d + tabBtns.length) % tabBtns.length;
        renderTab(tabBtns[idx].dataset.tab);
        tabBtns[idx].focus();
      } else {
        go(d);
      }
      ev.preventDefault();
    }
    if (ev.key === "Tab") {                     // foco atrapado en el panel
      const f = [...panel.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')]
        .filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (ev.shiftKey && (document.activeElement === first || document.activeElement === panel)) { last.focus(); ev.preventDefault(); }
      else if (!ev.shiftKey && document.activeElement === last) { first.focus(); ev.preventDefault(); }
    }
  });

  // deslizar hacia abajo para cerrar (celular)
  let touchY = null;
  panel.addEventListener("touchstart", (e) => { touchY = panel.scrollTop <= 0 ? e.touches[0].clientY : null; }, { passive: true });
  panel.addEventListener("touchend", (e) => {
    if (touchY !== null && e.changedTouches[0].clientY - touchY > 110) close();
    touchY = null;
  });

  window.addEventListener("resize", () => { if (!sheet.hidden) renderTab(currentTab, false); });

  // enlace directo: …/#relacional abre esa ficha
  const fromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (MODELOS.some((m) => m.id === id)) {
      document.getElementById(`etapa-${id}`)?.scrollIntoView({ block: "center" });
      open(id);
    }
  };
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
