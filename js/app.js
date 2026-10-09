/* Hoja de infografía interactiva — recreación 1:1 del diseño de Canva (1536 × 2752).
   Cada pieza y cada texto están en sus coordenadas originales; todo se puede tocar. */
(() => {
  "use strict";

  const MODELOS = window.MODELOS;
  const byId = Object.fromEntries(MODELOS.map((m) => [m.id, m]));
  const $ = (s, r = document) => r.querySelector(s);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = matchMedia("(hover: hover)").matches;
  const cssColor = (id) => getComputedStyle(document.documentElement).getPropertyValue(`--c-${id}`).trim();

  const sheet = $("#sheet");
  const inner = $("#sheet-inner");

  /* ---------- escala: 1 unidad de Canva = --u px ---------- */
  const setScale = () => sheet.style.setProperty("--u", `${sheet.clientWidth / 1536}px`);
  new ResizeObserver(setScale).observe(sheet);
  setScale();

  /* =====================================================================
     Maqueta (coordenadas exactas del diseño de Canva, página 2)
     ===================================================================== */
  const STAGES = [
    {
      id: "jerarquico", n: 1, zone: [440, 860],
      etapa: [733.9, 463.7, 135, 40.4, 33.7], year: [717.7, 529, 140, 110, 50], yearLabel: "Años",
      title: [879.8, 469.5, 548.4, 67.2, 56.1, "Modelo jerárquico", true, 1],
      origin: [894.5, 554.8, 600, 43.7, 36.7, "(IBM IMS · programa Apolo)"],
      body: [886.4, 615, 563.1, 183.4, 33.56, 1.099,
        "Organiza datos en un árbol invertido con relación padre-hijo.\nRelación 1 : N; cada hijo tiene un solo padre.\n✔ Muy rápido con grandes volúmenes.\n✘ Rígido; no permite relaciones N:M."],
      pieces: [
        ["s1-mainframe", "fromLeft", "<b>Mainframe</b> · computadora central donde corría IMS"],
        ["s1-tree", "dropIn", "<b>Árbol</b> · una raíz y sus hijos (1 : N)"]
      ],
      pulses: [[512, 534, 80]], hint: [96, 476]
    },
    {
      id: "red", n: 2, zone: [860, 1280],
      etapa: [728, 927.5, 135, 40.4, 33.7], year: [725.5, 921, 140, 110, 50],
      title: [886.4, 853.8, 412.1, 67.2, 56.1, "Modelo de red", true, 1],
      origin: [883.5, 942.7, 600, 43.7, 36.7, "(Charles Bachman · IDS, GE)"],
      body: [875, 997.5, 603.7, 255.4, 33.56, 1.0996,
        "Organiza los datos en forma de grafo o red de nodos. Relación N : M; un hijo puede tener varios padres mediante punteros. Estándar CODASYL (1969).\n✔ Modela relaciones complejas de muchos a muchos.\n✘ Difícil de diseñar y programar."],
      pieces: [
        ["s2-server", "riseIn", "<b>Servidor</b> · guarda la red de registros"],
        ["s2-network", "spinIn", "<b>Red de nodos</b> · un hijo con varios padres (N : M)"]
      ],
      pulses: [[421, 907, 92], [617, 986, 92]], hint: [96, 872]
    },
    {
      id: "relacional", n: 3, zone: [1280, 1700],
      etapa: [728, 1329, 135, 40.4, 33.7], year: [725.5, 1323, 140, 110, 50],
      title: [873.5, 1282, 551, 67.2, 56.1, "Modelo relacional", true, 1],
      origin: [882, 1369.7, 601.5, 43.7, 36.7, "(Edgar F. Codd · IBM)"],
      body: [879.8, 1427.2, 553.9, 255.4, 33.6, 1.0996,
        "Organiza la información en tablas independientes compuestas por filas y columnas. Claves (PK y FK). Álgebra relacional. Se consulta con SQL (Oracle, DB2).\n✔ Fácil de usar y consultar.\n✘ Lento con muchas uniones (JOIN)."],
      pieces: [
        ["s3-t1", "flipIn", "<b>Tabla</b> con su clave primaria (PK)"],
        ["s3-t2", "flipIn", "<b>Tabla</b> · filas y columnas"],
        ["s3-t3", "flipIn", "<b>Tabla</b> independiente con su PK"],
        ["s3-t4", "flipIn", "<b>Clave foránea (FK)</b> · enlaza con otra tabla"],
        ["s3-legend", "riseIn", "<b>PK</b> = clave primaria · <b>FK</b> = clave foránea"],
        ["s3-sql", "bounceIn", "<b>SQL</b> · se pide qué datos, no cómo buscarlos"]
      ],
      pulses: [], hint: [96, 1290]
    },
    {
      id: "objeto-relacional", n: 4, zone: [1700, 2120],
      etapa: [728, 1764.6, 135, 40.8, 34], year: [730.8, 1750.4, 130.4, 110, 50],
      title: [886.4, 1718.6, 600, 120.1, 56.33, "Modelo\nobjeto-relacional", false, 0.95],
      origin: [875, 1849.7, 600, 43.1, 36.7, "(Michael Stonebraker · POSTGRES)"],
      body: [879.8, 1906.8, 523.7, 214.7, 33.6, 1.0596,
        "Extiende las tablas SQL agregando capacidades de Programación Orientada a Objetos. Tablas SQL + tipos de datos complejos, herencia y funciones.\n✔ Une SQL con la flexibilidad de objetos.\n✘ Más complejo; varía por fabricante."],
      pieces: [
        ["s4-server", "fromLeft", "<b>Servidor</b> de base de datos"],
        ["s4-cube1", "popIn", "<b>Tabla con un objeto</b> · tipo de dato complejo"],
        ["s4-diagram", "fromRight", "<b>Funciones y tipos</b> dentro del propio motor"],
        ["s4-cube2", "popIn", "<b>Herencia</b> · tablas que extienden a otras"],
        ["s4-elephant", "bounceIn", "<b>PostgreSQL</b> · heredero del proyecto POSTGRES"]
      ],
      pulses: [[610, 1900, 110]], hint: [96, 1700]
    },
    {
      id: "orientado-objetos", n: 5, zone: [2120, 2520],
      etapa: [728, 2194.9, 135, 40.8, 34], year: [730.8, 2182.5, 126.8, 110, 50],
      title: [886.4, 2145.2, 600, 120.1, 56.33, "Modelo orientado\na objetos", false, 0.95],
      origin: [868, 2280, 600, 81.1, 36.7, "(Atkinson et al. · Manifiesto OO / Estándar ODMG)"],
      body: [873.5, 2361.1, 549.6, 214.7, 33.6, 1.0596,
        "Guarda la información directamente como objetos (datos + métodos). (Encapsulamiento, herencia y polimorfismo integrado con C++ o Java.)\n✔ Ideal para datos complejos.\n✘ Poco usado; sin estándar universal."],
      pieces: [
        ["s5-objects", "spinIn", "<b>Objetos</b> con datos y métodos · herencia y polimorfismo"]
      ],
      pulses: [[150, 2208, 100], [555, 2208, 100], [374, 2340, 100]], hint: [96, 2110]
    }
  ];
  const ARROWS = [[650, 862], [1085, 1287], [1472, 1735], [1890, 2150]];
  const BOX = { // piezas recortadas: x, y, w, h (lienzo de Canva)
    "s1-mainframe": [66, 512, 334, 320], "s1-tree": [400, 512, 312, 320],
    "s2-server": [84, 922, 142, 320], "s2-network": [226, 888, 500, 338],
    "s3-t1": [86, 1328, 218, 199], "s3-legend": [86, 1527, 240, 101],
    "s3-t2": [316, 1328, 204, 146], "s3-t3": [520, 1328, 204, 174],
    "s3-t4": [316, 1474, 204, 172], "s3-sql": [520, 1502, 204, 144],
    "s4-server": [82, 1696, 216, 362], "s4-cube1": [298, 1748, 172, 142], "s4-diagram": [470, 1748, 254, 142],
    "s4-cube2": [298, 1890, 172, 160], "s4-elephant": [470, 1890, 254, 160],
    "s5-objects": [96, 2136, 616, 378]
  };

  /* ---------- utilidades de construcción ---------- */
  const pos = (x, y, w, h) => `--x:${x};--y:${y};--w:${w};--h:${h}`;
  const make = (tag, cls, style = "", html = "", attrs = {}) => {
    const el = document.createElement(tag);
    el.className = cls;
    if (style) el.setAttribute("style", style);
    if (html) el.innerHTML = html;
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    inner.appendChild(el);
    return el;
  };
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const bodyHTML = (text) => text.split("\n").map((ln, i) => {
    let t = esc(ln);
    t = t.replace(/^✔/, '<span class="chk chk--ok" aria-hidden="true">✔</span><span class="sr">Ventaja:</span>')
         .replace(/^✘/, '<span class="chk chk--bad" aria-hidden="true">✘</span><span class="sr">Desventaja:</span>');
    return `<span class="line" style="--i:${i}">${t}</span>`;
  }).join("");

  /* ---------- cabecera ---------- */
  const kicker = make("p", "el tx tx--serif c kicker", `${pos(144.7, 81.8, 1214.3, 110.6)};--fs:92.8;--lh:1`,
    [..."La evolución de los"].map((ch, i) => `<span class="ch" style="--i:${i}">${ch === " " ? "&nbsp;" : ch}</span>`).join(""),
    { "data-zone": "0", "aria-label": "La evolución de los" });
  const title = make("h1", "el tx tx--display c maintitle hit", `${pos(92.1, 178.4, 1322.2, 169.3)};--fs:141.4;--lh:1`,
    "<span>Modelos de datos</span>", { "data-zone": "0", "data-tip": "Toca para <b>repetir la animación</b>", role: "button", tabindex: "0" });
  make("p", "el tx tx--sub c sub", `${pos(101, 378.5, 1304.4, 60)};--fs:50.2;--lh:1.1`,
    "El viaje de cómo estructuramos la información (1964–1999)".split(" ").map((w, i) => `<span class="word" style="--i:${i}">${w}</span>`).join(" "),
    { "data-zone": "0" });

  /* ---------- etapas ---------- */
  const ICON = {
    ok: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    bad: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    ext: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    person: '<svg class="ic" viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0"/></svg>',
    book: '<svg class="ic" viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 5v16M8 7h7"/></svg>',
    chev: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    link: '<svg class="ic" viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/></svg>'
  };
  STAGES.forEach((st) => {
    const c = `var(--c-${st.id})`;
    const open = { "data-open": st.id, role: "button", tabindex: "0" };
    // resplandor de color detrás del grupo de dibujos (solo aparece al señalar la etapa)
    const bx0 = Math.min(...st.pieces.map(([k]) => BOX[k][0])), by0 = Math.min(...st.pieces.map(([k]) => BOX[k][1]));
    const bx1 = Math.max(...st.pieces.map(([k]) => BOX[k][0] + BOX[k][2])), by1 = Math.max(...st.pieces.map(([k]) => BOX[k][1] + BOX[k][3]));
    make("span", "el blob", `${pos(bx0 - 20, by0 - 20, bx1 - bx0 + 40, by1 - by0 + 40)};--c:${c}`, "", { "data-blob": st.id, "aria-hidden": "true" });
    // piezas de la ilustración
    st.pieces.forEach(([key, anim, tip], i) => {
      const [x, y, w, h] = BOX[key];
      const src = `assets/pieces/${key}.webp`;
      make("div", "el pc hit",
        `${pos(x, y, w, h)};--c:${c};--in:${anim};--d:${(i * 0.14).toFixed(2)}s;--fd:${(5.5 + (i % 3) * 0.9).toFixed(1)}s`,
        `<div class="pc__float"><img class="pc__img" src="${src}" alt="" draggable="false" width="${w * 2}" height="${h * 2}"><span class="pc__shine" style="-webkit-mask-image:url('${src}');mask-image:url('${src}')"></span></div>`,
        { ...open, "data-zone": st.n, "data-stage": st.n, "data-tip": tip, "aria-label": `${st.title[5].replace("\n", " ")}: ${tip.replace(/<[^>]+>/g, "")}` });
    });
    st.pulses.forEach(([x, y, s], i) =>
      make("span", "pulse", `left:calc(${x} * var(--u));top:calc(${y} * var(--u));width:calc(${s} * var(--u));height:calc(${s} * var(--u));--c:${c};--d:${1.4 + i * 0.6}s`, "", { "data-zone": st.n, "aria-hidden": "true" }));
    // etapa y año (como en Canva)
    const [ex, ey, ew, eh, efs] = st.etapa;
    make("button", "el tx tx--label etapa hit reveal", `${pos(ex, ey, ew, eh)};--fs:${efs};--lh:1.1;--c:${c};--d:.15s;text-align:${st.n === 5 ? "left" : "center"}`,
      `Etapa ${st.n}`, { ...open, type: "button", "data-zone": st.n, "aria-label": `Etapa ${st.n}: ver ${st.title[5].replace("\n", " ")}` });
    const [yx, yy, yw, yh, yfs] = st.year;
    make("button", "el tx tx--label year hit reveal", `${pos(yx, yy, yw, yh)};--fs:${yfs};--lh:1;--c:${c};--d:.3s`,
      `${st.yearLabel ? `<span class="yl">${st.yearLabel}</span>` : ""}<span class="num" data-to="${byId[st.id].anio}">${byId[st.id].anio}</span>`,
      { ...open, type: "button", "data-zone": st.n, "aria-label": `Año ${byId[st.id].anio}: ver ${st.title[5].replace("\n", " ")}` });
    // título, origen y texto (como en Canva)
    const [tx, ty, tw, th, tfs, ttxt, tcenter, tlh] = st.title;
    make("h2", `el tx tx--head mtitle hit reveal ${tcenter ? "c" : ""}`, `${pos(tx, ty, tw, th)};--fs:${tfs};--lh:${tlh};--c:${c};--d:.35s;--in:none;opacity:1`,
      `<span class="tx-in">${esc(ttxt)}</span>`, { ...open, "data-zone": st.n });
    // el nombre abre directamente "de dónde sale" (pestaña Fuentes)
    const [ox, oy, ow, oh, ofs, otxt] = st.origin;
    make("p", "el tx tx--origin origin hit reveal", `${pos(ox, oy, ow, oh)};--fs:${ofs};--lh:1.06;--c:${c};--d:.6s`,
      esc(otxt),
      { ...open, "data-tab": "fuentes", "data-zone": st.n, "data-tip": "¿De dónde sale este dato? <b>Ver las fuentes</b>", "aria-label": `${otxt}: ver de dónde sale la información` });
    const [bx, by, bw, bh, bfs, blh, btxt] = st.body;
    make("p", "el tx tx--body body hit reveal-lines", `${pos(bx, by, bw, bh)};--fs:${bfs};--lh:${blh};--c:${c};--d:.75s;white-space:normal`,
      bodyHTML(btxt), { ...open, "data-zone": st.n });
    // pista "toca"
    make("span", "hint", `left:calc(${st.hint[0]} * var(--u));top:calc(${st.hint[1]} * var(--u));--c:${c};--d:1.6s`,
      "<i></i>Toca cualquier imagen o texto", { "data-zone": st.n, "aria-hidden": "true" });
  });

  /* ---------- flechas centrales ---------- */
  ARROWS.forEach(([y0, y1], i) => {
    const h = y1 - y0, nextId = STAGES[i + 1].id;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "el arrow");
    svg.setAttribute("style", `${pos(764, y0, 60, h)};--c:var(--c-${nextId});--d:.9s;--len:${h - 26};--travel:${h - 40}px`);
    svg.setAttribute("viewBox", `0 0 60 ${h}`);
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("data-zone", i + 1);
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = `<line class="shaft" x1="30" y1="0" x2="30" y2="${h - 26}"/>
       <path class="head" d="M13 ${h - 32} L47 ${h - 32} L30 ${h} Z"/>
       <circle class="packet" cx="30" cy="6" r="9"/>`;
    inner.appendChild(svg);
  });

  const socialHTML = (cls = "soc") => window.DEV.redes.map((r) =>
    `<a class="${cls}" href="${r.url}" target="_blank" rel="noopener noreferrer" style="--sc:${r.color}" aria-label="${r.red} de ${window.DEV.nombre}" data-tip="<b>${r.red}</b>"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${r.d}"/></svg></a>`).join("");

  /* ---------- autor y fuentes: desplegable ---------- */
  const credBtn = make("button", "el tx tx--head hit reveal credits-btn", `${pos(76.2, 2520.6, 600, 48.8)};--fs:41.8;--lh:1.06;--c:#3a72c8;--d:.1s;text-align:left;letter-spacing:.02em`,
    `Autor y fuentes <span class="chev" aria-hidden="true">${ICON.chev}</span>`,
    { type: "button", "data-zone": "6", "aria-expanded": "false", "aria-controls": "drawer", "data-tip": "Toca para <b>desplegar</b> equipo y fuentes" });
  make("p", "el tx tx--body reveal", `${pos(81.3, 2580, 1380, 30)};--fs:22;--lh:1.06;--d:.3s`,
    "Bases de Datos · Unidad 1: Introducción a las bases de datos", { "data-zone": "6" });

  const avColors = MODELOS.map((m) => `var(--c-${m.id})`);
  const drawer = make("div", "drawer", "", `
    <div class="drawer__head">
      <p class="drawer__kicker">Equipo 1 · Universidad del Istmo</p>
      <button type="button" class="drawer__close" data-drawer-close aria-label="Cerrar">${ICON.x}</button>
    </div>
    <ul class="drawer__team">${window.EQUIPO.map((nm, i) => {
      const ini = nm.split(" ").slice(0, 2).map((w) => w[0]).join("");
      const dev = nm === window.DEV.nombre;
      return `<li class="${dev ? "is-dev" : ""}" style="--i:${i};--c:${avColors[i]}"><span class="member__av" style="background:${avColors[i]}">${ini}</span>
        <span class="drawer__name">${nm}${dev ? ' <em>(desarrollador)</em>' : ""}</span>${dev ? `<span class="member__soc">${socialHTML()}</span>` : ""}</li>`;
    }).join("")}</ul>
    <p class="drawer__label">Fuentes consultadas</p>
    <div class="drawer__src">${window.FUENTES.map((f, i) =>
      `<a class="src-chip" href="${f.url}" target="_blank" rel="noopener noreferrer" style="--i:${i}" data-tip="<b>${esc(f.titulo)}</b>">${ICON.link}<span>${f.sitio}</span></a>`).join("")}
      <button type="button" class="src-chip src-chip--all" data-credits="1">${ICON.book}<span>Qué dice cada una</span></button>
    </div>`, { id: "drawer", role: "region", "aria-label": "Autor y fuentes" });

  const setDrawer = (on) => {
    drawer.classList.toggle("is-open", on);
    credBtn.classList.toggle("is-open", on);
    credBtn.setAttribute("aria-expanded", on);
    hideTip();
  };
  credBtn.addEventListener("click", (e) => { e.stopPropagation(); setDrawer(!drawer.classList.contains("is-open")); });
  drawer.addEventListener("click", (e) => { if (e.target.closest("[data-drawer-close]")) setDrawer(false); });
  document.addEventListener("click", (e) => {
    if (drawer.classList.contains("is-open") && !drawer.contains(e.target) && !credBtn.contains(e.target)) setDrawer(false);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("is-open")) setDrawer(false); });

  document.querySelectorAll(".sr").forEach((el) =>
    Object.assign(el.style, { position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }));

  /* =====================================================================
     Animaciones de entrada por zona (con cola para que se vean en orden)
     ===================================================================== */
  const ZONES = [[0, 440], ...STAGES.map((s) => s.zone), [2520, 2752]];
  const zoneEls = ZONES.map(([y0, y1], i) =>
    make("div", "el", `${pos(0, y0, 1536, y1 - y0)};pointer-events:none`, "", { "data-zone-box": i, "aria-hidden": "true" }));

  const countUp = (el) => {
    const to = +el.dataset.to;
    if (reduce) { el.textContent = to; return; }
    const from = to - 45, t0 = performance.now(), dur = 1000;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  let queue = Promise.resolve(), lastRun = 0;
  const shown = new Set();
  const playZone = (i) => {
    if (shown.has(i)) return;
    shown.add(i);
    queue = queue.then(() => new Promise((res) => {
      const wait = Math.max(0, lastRun + (reduce ? 0 : 520) - performance.now());
      setTimeout(() => {
        lastRun = performance.now();
        document.querySelectorAll(`[data-zone="${i}"]`).forEach((el) => {
          el.classList.add("is-in");
          el.querySelectorAll(".num").forEach(countUp);
        });
        res();
      }, wait);
    }));
  };
  const zoneObs = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting)
      .sort((a, b) => +a.target.dataset.zoneBox - +b.target.dataset.zoneBox)
      .forEach((e) => playZone(+e.target.dataset.zoneBox));
  }, { threshold: 0.3 });
  zoneEls.forEach((z) => zoneObs.observe(z));

  const replay = () => {
    shown.clear();
    document.querySelectorAll(".is-in").forEach((el) => el.classList.remove("is-in"));
    void inner.offsetWidth;                       // reinicia las animaciones CSS
    lastRun = 0;
    zoneEls.forEach((z) => { zoneObs.unobserve(z); zoneObs.observe(z); });
  };

  /* =====================================================================
     Interacción: tooltip, resaltado, onda al tocar
     ===================================================================== */
  const tip = $("#tip");
  let tipTarget = null;
  const showTip = (el) => {
    if (!canHover || !el.dataset.tip) return;
    tipTarget = el;
    const r = el.getBoundingClientRect();
    tip.innerHTML = el.dataset.tip;
    tip.style.left = `${r.left + r.width / 2}px`;
    tip.style.top = `${Math.max(48, r.top)}px`;
    tip.hidden = false;
  };
  const hideTip = () => { tip.hidden = true; tipTarget = null; };
  inner.addEventListener("pointerover", (e) => {
    const el = e.target.closest("[data-tip]");
    if (el && el !== tipTarget) showTip(el);
    const pc = e.target.closest(".pc");
    inner.querySelectorAll(".pc").forEach((p) => p.classList.toggle("group-hover", !!pc && p !== pc && p.dataset.stage === pc.dataset.stage));
  });
  inner.addEventListener("pointerout", (e) => {
    if (!e.relatedTarget || !inner.contains(e.relatedTarget) || !e.relatedTarget.closest("[data-tip]")) hideTip();
    if (!e.relatedTarget || !e.relatedTarget.closest?.(".pc")) inner.querySelectorAll(".group-hover").forEach((p) => p.classList.remove("group-hover"));
  });
  window.addEventListener("scroll", hideTip, { passive: true });
  inner.addEventListener("pointerover", (e) => {
    const id = e.target.closest("[data-open]")?.dataset.open;
    inner.querySelectorAll(".blob").forEach((b) => b.classList.toggle("is-lit", b.dataset.blob === id));
  });
  inner.addEventListener("pointerleave", () => inner.querySelectorAll(".blob.is-lit").forEach((b) => b.classList.remove("is-lit")));

  // atenúa las piezas hermanas mientras se señala una
  const style = document.createElement("style");
  style.textContent = ".pc.group-hover{opacity:.55}";
  document.head.appendChild(style);

  const ripple = (ev, color) => {
    if (reduce) return;
    const r = sheet.getBoundingClientRect();
    const d = document.createElement("span");
    d.className = "ripple";
    d.style.left = `${ev.clientX - r.left}px`;
    d.style.top = `${ev.clientY - r.top}px`;
    d.style.setProperty("--c", color);
    sheet.appendChild(d);
    setTimeout(() => d.remove(), 750);
  };

  /* =====================================================================
     Mini animaciones SVG de cada modelo (en la ficha)
     ===================================================================== */
  const W = 560, H = 250;
  const svgWrap = (s) => `<svg viewBox="0 0 ${W} ${H}" role="img">${s}</svg>`;
  const edge = (x1, y1, x2, y2, d, cls = "") => `<line class="sv-edge ${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="--d:${d}s"/>`;
  const arrowHead = (id, color) => `<marker id="${id}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="${color}"/></marker>`;
  const ANIM = {
    jerarquico(c) {
      const root = [280, 40], l2 = [[130, 120], [280, 120], [430, 120]], l3 = [[75, 192], [185, 192], [375, 192], [485, 192]], par = [0, 0, 2, 2];
      let s = "";
      l2.forEach((p, i) => { s += edge(root[0], root[1], p[0], p[1], 0.25 + i * 0.12); });
      l3.forEach((p, i) => { const q = l2[par[i]]; s += edge(q[0], q[1], p[0], p[1], 0.8 + i * 0.1); });
      s += `<line class="sv-edge hl" x1="280" y1="40" x2="430" y2="120" style="--d:1.7s"/><line class="sv-edge hl" x1="430" y1="120" x2="485" y2="192" style="--d:2.1s"/>`;
      const node = (p, d, r = 19) => `<circle class="sv-pop" cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${c}" stroke="#1d3d70" stroke-width="2" style="--d:${d}s"/>`;
      s += node(root, 0.05, 22); l2.forEach((p, i) => { s += node(p, 0.5 + i * 0.12); }); l3.forEach((p, i) => { s += node(p, 1.05 + i * 0.1); });
      s += `<circle class="sv-pop sv-pulse" cx="485" cy="192" r="25" fill="none" stroke="${c}" stroke-width="3" style="--d:2.5s"/>`;
      s += `<text class="sv-label sv-fade" x="312" y="38" style="--d:.3s">Raíz</text><text class="sv-small sv-fade" x="18" y="242" style="--d:1.4s">Cada hijo tiene un solo padre (1 : N)</text><text class="sv-small sv-fade" x="328" y="242" style="--d:2.4s" fill="${c}">Ruta de punteros desde la raíz</text>`;
      return svgWrap(s);
    },
    red(c) {
      const N = { A: [95, 60], B: [280, 40], C: [465, 70], D: [175, 195], E: [395, 195] };
      const links = [["A", "D"], ["B", "D"], ["B", "E"], ["C", "E"], ["A", "B"], ["D", "E"], ["C", "B"], ["A", "E"]];
      let s = `<defs>${arrowHead("ah-red", "#23324a")}${arrowHead("ah-red-hl", c)}</defs>`;
      links.forEach(([a, b], i) => {
        const hl = b === "D" && (a === "A" || a === "B"); const [x1, y1] = N[a], [x2, y2] = N[b]; const k = 26 / Math.hypot(x2 - x1, y2 - y1);
        s += `<line class="sv-edge ${hl ? "hl" : ""}" x1="${x1 + (x2 - x1) * k}" y1="${y1 + (y2 - y1) * k}" x2="${x2 - (x2 - x1) * k}" y2="${y2 - (y2 - y1) * k}" marker-end="url(#${hl ? "ah-red-hl" : "ah-red"})" style="--d:${(hl ? 1.6 : 0.5) + i * 0.1}s"/>`;
      });
      Object.values(N).forEach(([x, y], i) => { s += `<g class="sv-pop" style="--d:${0.05 + i * 0.1}s"><circle cx="${x}" cy="${y}" r="24" fill="#cfdbea" stroke="#23324a" stroke-width="2.5"/><text class="sv-label" x="${x}" y="${y + 5}" text-anchor="middle">Nodo</text></g>`; });
      s += `<circle class="sv-pop sv-pulse" cx="175" cy="195" r="31" fill="none" stroke="${c}" stroke-width="3" style="--d:2.3s"/><text class="sv-small sv-fade" x="18" y="244" style="--d:2.2s" fill="${c}">Un miembro con dos dueños (N : M)</text><text class="sv-small sv-fade" x="355" y="244" style="--d:1.2s">Enlazados con punteros · CODASYL</text>`;
      return svgWrap(s);
    },
    relacional(c) {
      const table = (x, y, name, rows, d) => {
        let g = `<g class="sv-fade" style="--d:${d}s"><rect x="${x}" y="${y}" width="210" height="${34 + rows.length * 30}" rx="10" fill="#fff" stroke="#23324a" stroke-width="2"/><rect x="${x}" y="${y}" width="210" height="34" rx="10" fill="${c}"/><rect x="${x}" y="${y + 24}" width="210" height="10" fill="${c}"/><text class="sv-label" x="${x + 14}" y="${y + 23}" style="fill:#fff">${name}</text></g>`;
        rows.forEach(([key, col], i) => {
          const ry = y + 34 + i * 30;
          g += `<g class="sv-fade" style="--d:${d + 0.25 + i * 0.15}s">${i ? `<line x1="${x}" y1="${ry}" x2="${x + 210}" y2="${ry}" stroke="#d4dbe6"/>` : ""}`;
          if (key) g += `<rect x="${x + 10}" y="${ry + 6}" width="34" height="19" rx="4" fill="${key === "PK" ? "#f6d77d" : "#9fe3e0"}" stroke="#23324a"/><text class="sv-label" x="${x + 27}" y="${ry + 20}" text-anchor="middle" style="font-size:12px">${key}</text>`;
          g += `<text class="sv-mono" x="${x + 54}" y="${ry + 20}">${col}</text></g>`;
        });
        return g;
      };
      let s = `<defs>${arrowHead("ah-rel", c)}</defs>`;
      s += table(24, 20, "Clientes", [["PK", "id_cliente"], ["", "nombre"], ["", "ciudad"]], 0.1);
      s += table(326, 20, "Pedidos", [["PK", "id_pedido"], ["FK", "id_cliente"], ["", "total"]], 0.5);
      s += `<path class="sv-edge hl" d="M326 119 C 280 119, 290 69, 236 69" marker-end="url(#ah-rel)" style="--d:1.5s"/>`;
      s += `<g class="sv-fade" style="--d:2.1s"><rect x="24" y="178" width="512" height="56" rx="10" fill="#111827"/><text class="sv-mono" x="40" y="201" style="fill:#9fe3e0">SELECT</text><text class="sv-mono" x="100" y="201" style="fill:#fff">nombre, total FROM Pedidos</text><text class="sv-mono" x="40" y="222" style="fill:#9fe3e0">JOIN</text><text class="sv-mono" x="84" y="222" style="fill:#fff">Clientes USING (id_cliente);</text></g>`;
      return svgWrap(s);
    },
    "objeto-relacional"(c) {
      let s = `<defs>${arrowHead("ah-or", c)}</defs>`;
      const cube = (x, y, d, fill) => `<g class="sv-pop" style="--d:${d}s"><path d="M${x} ${y + 8} l14 -8 14 8 v16 l-14 8 -14 -8z" fill="${fill}" stroke="#23324a" stroke-width="1.6"/><path d="M${x} ${y + 8} l14 8 14 -8 M${x + 14} ${y + 16} v16" fill="none" stroke="#23324a" stroke-width="1.6"/></g>`;
      s += `<g class="sv-fade" style="--d:.1s"><rect x="24" y="22" width="250" height="130" rx="10" fill="#fff" stroke="#23324a" stroke-width="2"/><rect x="24" y="22" width="250" height="34" rx="10" fill="${c}"/><rect x="24" y="46" width="250" height="10" fill="${c}"/><text class="sv-label" x="38" y="45" style="fill:#fff">Personas</text></g>`;
      s += `<text class="sv-mono sv-fade" x="40" y="80" style="--d:.4s">nombre   TEXT</text><text class="sv-mono sv-fade" x="40" y="108" style="--d:.6s">foto     IMAGEN</text><text class="sv-mono sv-fade" x="40" y="136" style="--d:.8s">domicilio Direccion</text>`;
      s += cube(222, 88, 1.0, "#f3d27a") + cube(232, 118, 1.15, "#c9a8f0");
      s += `<g class="sv-fade" style="--d:1.3s"><rect x="326" y="22" width="210" height="102" rx="10" fill="#fff" stroke="#23324a" stroke-width="2"/><rect x="326" y="22" width="210" height="34" rx="10" fill="#23324a"/><rect x="326" y="46" width="210" height="10" fill="#23324a"/><text class="sv-label" x="340" y="45" style="fill:#fff">Estudiantes</text></g>`;
      s += `<text class="sv-mono sv-fade" x="342" y="82" style="--d:1.6s">matricula TEXT</text><text class="sv-small sv-fade" x="342" y="108" style="--d:1.8s">INHERITS (Personas)</text>`;
      s += `<path class="sv-edge hl" d="M326 74 C 300 74, 300 90, 276 90" marker-end="url(#ah-or)" style="--d:1.9s"/><text class="sv-small sv-fade" x="286" y="160" style="--d:2.1s" fill="${c}">Herencia de tablas</text>`;
      s += `<g class="sv-pop" style="--d:2.4s"><rect x="24" y="178" width="512" height="54" rx="10" fill="#111827"/><text class="sv-mono" x="40" y="201" style="fill:#f3d27a">CREATE FUNCTION</text><text class="sv-mono" x="176" y="201" style="fill:#fff">edad(Personas) RETURNS INT …</text><text class="sv-mono" x="40" y="222" style="fill:#9aa7bd">-- lógica de negocio dentro del motor</text></g>`;
      return svgWrap(s);
    },
    "orientado-objetos"(c) {
      const obj = (x, y, t, attrs, meths, d, oid) => {
        let g = `<g class="sv-pop" style="--d:${d}s"><rect x="${x}" y="${y}" width="160" height="${44 + (attrs.length + meths.length) * 20 + 12}" rx="12" fill="#f1e4f8" stroke="#5e2a73" stroke-width="2"/><rect x="${x}" y="${y}" width="160" height="32" rx="12" fill="${c}"/><rect x="${x}" y="${y + 22}" width="160" height="10" fill="${c}"/><text class="sv-label" x="${x + 12}" y="${y + 22}" style="fill:#fff">${t}</text>`;
        attrs.forEach((a, i) => { g += `<text class="sv-mono" x="${x + 12}" y="${y + 52 + i * 20}" style="font-size:13px">${a}</text>`; });
        const my = y + 52 + attrs.length * 20;
        g += `<line x1="${x + 8}" y1="${my - 13}" x2="${x + 152}" y2="${my - 13}" stroke="#b58bcc"/>`;
        meths.forEach((m, i) => { g += `<text class="sv-mono" x="${x + 12}" y="${my + 4 + i * 20}" style="font-size:13px;fill:#5e2a73">${m}</text>`; });
        g += "</g>";
        if (oid) g += `<g class="sv-pop" style="--d:${d + 0.9}s"><rect x="${x + 96}" y="${y - 14}" width="74" height="24" rx="12" fill="#111"/><text class="sv-small" x="${x + 133}" y="${y + 3}" text-anchor="middle" style="fill:#fff">${oid}</text></g>`;
        return g;
      };
      let s = `<defs>${arrowHead("ah-oo", c)}</defs>`;
      s += obj(24, 26, "Persona", ["nombre", "edad"], ["saludar()"], 0.1, "OID #01") + obj(376, 26, "Estudiante", ["matricula"], ["saludar()", "inscribir()"], 0.6, "OID #02");
      s += `<line class="sv-edge hl" x1="372" y1="80" x2="190" y2="80" marker-end="url(#ah-oo)" style="--d:1.2s"/><text class="sv-label sv-fade" x="236" y="70" style="--d:1.4s;fill:${c}">Herencia</text><text class="sv-small sv-fade" x="205" y="106" style="--d:1.7s">saludar() se comporta distinto:</text><text class="sv-label sv-fade" x="238" y="128" style="--d:1.9s">Polimorfismo</text>`;
      s += `<g class="sv-fade" style="--d:2.3s"><rect x="24" y="186" width="512" height="48" rx="10" fill="#111827"/><text class="sv-mono" x="40" y="207" style="fill:#c9a8f0">db.store(</text><text class="sv-mono" x="120" y="207" style="fill:#fff">new Estudiante("Ana", 20, "A-17"));</text><text class="sv-mono" x="40" y="226" style="fill:#9aa7bd">// el objeto se guarda tal cual, sin pasar a tablas</text></g>`;
      return svgWrap(s);
    }
  };
  const prepEdges = (root) => root.querySelectorAll(".sv-edge").forEach((el) =>
    el.style.setProperty("--len", Math.ceil(el.getTotalLength ? el.getTotalLength() : 300) + 2));

  /* =====================================================================
     Ficha (modal)
     ===================================================================== */

  const modal = $("#modal"), card = $(".modal__card", modal), body = $("#m-body");
  let current = -1, currentTab = "definicion", lastFocus = null, closeTimer = null;

  const listHTML = (items, kind) => `<ul class="anim-in">${items.map(([t, d], i) =>
    `<li><span class="num ${kind === "bad" ? "bad" : ""}" aria-hidden="true">${kind === "ok" ? ICON.ok : kind === "bad" ? ICON.bad : i + 1}</span><span><b>${t}</b>${d}</span></li>`).join("")}</ul>`;

  const citasHTML = (id) => {
    const c = window.CITAS[id];
    return `<p class="cite-intro">Esto es lo que dice cada fuente que usamos sobre este modelo:</p>
      <ul class="anim-in cites">${c.fuentes.map(([i, nota]) => {
        const f = window.FUENTES[i];
        return `<li><span class="num" aria-hidden="true">${ICON.book}</span><span><b>${f.sitio}</b><span class="cite-t">${f.titulo}</span>${nota}
          <a class="cite-a" href="${f.url}" target="_blank" rel="noopener noreferrer">Abrir la fuente ${ICON.ext}</a></span></li>`;
      }).join("")}</ul>
      <p class="cite-ref"><strong>Referencia académica:</strong> ${c.refs.join(" · ")}</p>`;
  };

  const renderTab = (name) => {
    currentTab = name;
    const m = MODELOS[current];
    const tabs = body.querySelectorAll("[role=tab]"), pill = $(".pill", body), panel = $(".tabpanel", body);
    tabs.forEach((b) => {
      const on = b.dataset.tab === name;
      b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1;
      if (on && pill) { pill.style.width = `${b.offsetWidth}px`; pill.style.transform = `translateX(${b.offsetLeft - 4}px)`; }
    });
    panel.innerHTML = name === "definicion" ? `<div class="anim-in"><p>${m.definicion}</p></div>`
      : name === "caracteristicas" ? listHTML(m.caracteristicas, "num")
      : name === "ventajas" ? listHTML(m.ventajas, "ok")
      : name === "desventajas" ? listHTML(m.desventajas, "bad") : citasHTML(m.id);
  };

  const renderModel = (i) => {
    current = i;
    const m = MODELOS[i], p = MODELOS[i - 1], n = MODELOS[i + 1];
    card.style.setProperty("--c", `var(--c-${m.id})`);
    body.innerHTML = `
      <p class="m-stage">ETAPA ${m.etapa} · ${m.anio} · RELACIÓN ${m.relacion.toUpperCase()}</p>
      <h2 class="m-title" id="m-title">${m.nombre}</h2>
      <p class="m-origin">${m.origen}</p>
      <figure class="m-anim" aria-hidden="true">${ANIM[m.id](cssColor(m.id))}</figure>
      <p class="m-creator"><strong>Año y creador:</strong> ${m.anio} · ${m.creador}
        <button type="button" class="cite-link" data-tabjump="fuentes">${ICON.book}¿De dónde sale?</button></p>
      <div class="tabs" role="tablist" aria-label="Información del modelo"><span class="pill"></span>
        <button role="tab" type="button" data-tab="definicion">Definición</button>
        <button role="tab" type="button" data-tab="caracteristicas">Características</button>
        <button role="tab" type="button" data-tab="ventajas">Ventajas</button>
        <button role="tab" type="button" data-tab="desventajas">Desventajas</button>
        <button role="tab" type="button" data-tab="fuentes">Fuentes</button>
      </div>
      <div class="tabpanel" role="tabpanel" tabindex="0"></div>
      <footer class="m-nav">
        <button type="button" class="navbtn" data-go="-1" ${p ? "" : "disabled"}><span aria-hidden="true">←</span> <span class="lbl">${p ? `${p.anio} · ${p.nombre.replace("Modelo ", "")}` : ""}</span></button>
        <button type="button" class="navbtn navbtn--next" data-go="1" ${n ? "" : "disabled"}><span class="lbl">${n ? `${n.anio} · ${n.nombre.replace("Modelo ", "")}` : ""}</span> <span aria-hidden="true">→</span></button>
      </footer>`;
    prepEdges(body);
    renderTab(currentTab);
    card.scrollTop = 0;
    history.replaceState?.(null, "", `#${m.id}`);
  };

  const renderCredits = () => {
    current = -1;
    card.style.setProperty("--c", "#3a72c8");
    const colors = MODELOS.map((m) => cssColor(m.id));
    body.innerHTML = `
      <p class="m-stage">BASES DE DATOS · UNIDAD 1</p>
      <h2 class="m-title" id="m-title">Autor y fuentes</h2>
      <p class="m-origin">Equipo 1 · Universidad del Istmo</p>
      <h3 class="m-h">Integrantes</h3>
      <ul class="team">${window.EQUIPO.map((nm, i) => `<li style="--i:${i}"><span class="av" style="background:${colors[i % colors.length]}" aria-hidden="true">${nm.split(" ").slice(0, 2).map((w) => w[0]).join("")}</span><span class="tm">${nm}${nm === window.DEV.nombre ? ` <em class="role">(desarrollador)</em><span class="tm__soc">${socialHTML("soc soc--lg")}</span>` : ""}</span></li>`).join("")}</ul>
      <h3 class="m-h">Fuentes consultadas</h3>
      <ul class="sources">${window.FUENTES.map((f, i) => {
        const usados = MODELOS.filter((m) => window.CITAS[m.id].fuentes.some(([k]) => k === i)).map((m) => m.nombre.replace("Modelo ", ""));
        return `<li><a href="${f.url}" target="_blank" rel="noopener noreferrer" style="--i:${i}"><b>${f.titulo}</b><span>${f.sitio} · Respaldó: ${usados.join(", ")}</span>${ICON.ext}</a></li>`;
      }).join("")}</ul>
      <p class="cite-ref">En cada ficha, la pestaña <strong>Fuentes</strong> muestra qué dice cada una sobre ese modelo.</p>
      <h3 class="m-h">Referencias</h3>
      <ul class="refs">${window.REFERENCIAS.map((r) => `<li>${r}</li>`).join("")}</ul>`;
    history.replaceState?.(null, "", "#fuentes");
  };

  const openModal = (what, ev, opener) => {
    clearTimeout(closeTimer);
    lastFocus = opener || document.activeElement;
    currentTab = opener?.dataset?.tab || "definicion";
    hideTip();
    modal.hidden = false;
    document.body.classList.add("locked");
    what === "credits" ? renderCredits() : renderModel(MODELOS.findIndex((m) => m.id === what));
    // la ficha "nace" desde el punto tocado
    const cx = ev?.clientX ?? innerWidth / 2, cy = ev?.clientY ?? innerHeight / 2;
    card.style.setProperty("--ox", `${cx - card.offsetLeft}px`);
    card.style.setProperty("--oy", `${cy - card.offsetTop}px`);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      modal.classList.add("is-open");
      if (current >= 0) renderTab(currentTab);
      card.focus({ preventScroll: true });
    }));
  };

  const closeModal = () => {
    if (modal.hidden) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("locked");
    history.replaceState?.(null, "", location.pathname + location.search);
    closeTimer = setTimeout(() => { modal.hidden = true; }, reduce ? 0 : 600);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  };

  const go = (d) => {
    const i = current + d;
    if (current < 0 || i < 0 || i >= MODELOS.length) return;
    const out = card.animate?.([{ opacity: 1, transform: "none" }, { opacity: 0, transform: `translateX(${-d * 30}px) scale(.98)` }], { duration: reduce ? 0 : 170, easing: "ease-in" });
    (out ? out.finished : Promise.resolve()).then(() => {
      renderModel(i);
      card.animate?.([{ opacity: 0, transform: `translateX(${d * 30}px) scale(.98)` }, { opacity: 1, transform: "none" }], { duration: reduce ? 0 : 340, easing: "cubic-bezier(.16,1,.3,1)" });
    });
  };

  /* ---------- eventos ---------- */
  document.addEventListener("click", (ev) => {
    const op = ev.target.closest("[data-open]");
    if (op) { ripple(ev, `var(--c-${op.dataset.open})`); openModal(op.dataset.open, ev, op); return; }
    if (ev.target.closest("[data-credits]")) { ripple(ev, "#3a72c8"); openModal("credits", ev, ev.target.closest("[data-credits]")); return; }
    if (ev.target.closest(".credits-btn")) { ripple(ev, "#3a72c8"); return; }
    if (ev.target.closest(".maintitle")) { ripple(ev, "#3a72c8"); replay(); return; }
    if (ev.target.closest("[data-close]")) { closeModal(); return; }
    const jump = ev.target.closest("[data-tabjump]");
    if (jump) { renderTab(jump.dataset.tabjump); $(".tabs", body)?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" }); return; }
    const tab = ev.target.closest("[role=tab]");
    if (tab && body.contains(tab)) { renderTab(tab.dataset.tab); return; }
    const nav = ev.target.closest("[data-go]");
    if (nav) go(+nav.dataset.go);
  });
  inner.addEventListener("keydown", (ev) => {
    if ((ev.key === "Enter" || ev.key === " ") && ev.target.matches('[role="button"]')) { ev.preventDefault(); ev.target.click(); }
  });

  document.addEventListener("keydown", (ev) => {
    if (modal.hidden) return;
    if (ev.key === "Escape") { ev.preventDefault(); closeModal(); return; }
    const tabs = [...body.querySelectorAll("[role=tab]")];
    const inTabs = tabs.includes(document.activeElement);
    if (ev.key === "ArrowRight" || ev.key === "ArrowLeft") {
      const d = ev.key === "ArrowRight" ? 1 : -1;
      if (inTabs) {
        const idx = (tabs.findIndex((b) => b.dataset.tab === currentTab) + d + tabs.length) % tabs.length;
        renderTab(tabs[idx].dataset.tab); tabs[idx].focus();
      } else go(d);
      ev.preventDefault();
    }
    if (ev.key === "Tab") {
      const f = [...card.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')].filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (ev.shiftKey && (document.activeElement === first || document.activeElement === card)) { last.focus(); ev.preventDefault(); }
      else if (!ev.shiftKey && document.activeElement === last) { first.focus(); ev.preventDefault(); }
    }
  });

  // deslizar hacia abajo para cerrar (celular)
  let touchY = null;
  card.addEventListener("touchstart", (e) => { touchY = card.scrollTop <= 0 ? e.touches[0].clientY : null; }, { passive: true });
  card.addEventListener("touchend", (e) => { if (touchY !== null && e.changedTouches[0].clientY - touchY > 110) closeModal(); touchY = null; });
  window.addEventListener("resize", () => { if (!modal.hidden && current >= 0) renderTab(currentTab); });

  /* ---------- barra de herramientas ---------- */
  const fitBtn = $("#t-fit");
  fitBtn.addEventListener("click", () => {
    const on = document.body.classList.toggle("fit");
    fitBtn.setAttribute("aria-pressed", on);
    $("span", fitBtn).textContent = on ? "Ampliar" : "Hoja completa";
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
  $("#t-replay").addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "auto" }); replay(); });
  $("#t-credits").addEventListener("click", (ev) => openModal("credits", ev, ev.currentTarget));

  /* ---------- enlace directo (#relacional, #fuentes) ---------- */
  const fromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (byId[id]) openModal(id);
    else if (id === "fuentes") openModal("credits");
  };
  window.addEventListener("hashchange", fromHash);
  setTimeout(fromHash, 300);

  /* =====================================================================
     Fondo: partículas de datos flotando alrededor de la hoja
     ===================================================================== */
  const cv = $("#particles");
  if (cv && !reduce) {
    const ctx = cv.getContext("2d");
    let w, h, dots;
    const glyphs = ["0", "1", "{ }", "PK", "FK", "SQL", "⬡", "•"];
    const init = () => {
      w = cv.width = innerWidth * devicePixelRatio; h = cv.height = innerHeight * devicePixelRatio;
      dots = Array.from({ length: Math.round(Math.min(70, innerWidth / 18)) }, () => ({
        x: Math.random() * w, y: Math.random() * h, v: (0.15 + Math.random() * 0.45) * devicePixelRatio,
        s: (10 + Math.random() * 12) * devicePixelRatio, g: glyphs[(Math.random() * glyphs.length) | 0], a: 0.06 + Math.random() * 0.14
      }));
    };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d) => {
        d.y -= d.v; if (d.y < -30) { d.y = h + 30; d.x = Math.random() * w; }
        ctx.globalAlpha = d.a; ctx.fillStyle = "#cfe0ff"; ctx.font = `600 ${d.s}px Barlow Condensed, sans-serif`;
        ctx.fillText(d.g, d.x, d.y);
      });
      if (!document.hidden) requestAnimationFrame(tick);
    };
    init(); tick();
    addEventListener("resize", init);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) tick(); });
  }
})();
