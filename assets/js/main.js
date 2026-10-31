/* AgentDM @ WWW 2027 — interactions & data rendering */
(() => {
  const C = window.AGENTDM;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- AoE helpers (UTC-12, 23:59:59) ---------- */
  const aoe = d => new Date(d + "T23:59:59-12:00");
  const fmt = (d, o) => new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", ...o });

  /* ---------- Links ---------- */
  $("#emailLink").href = "mailto:" + C.links.email;
  $("#emailLink").textContent = C.links.email;
  $("#confLink").href = C.links.conference;
  $("#templateBtn").href = C.links.template;
  if (C.links.submission) {
    const b = $("#submitBtn");
    b.href = C.links.submission; b.target = "_blank"; b.rel = "noopener";
    b.classList.remove("is-disabled"); b.removeAttribute("aria-disabled");
    b.textContent = "Submit via portal ↗";
  }

  /* ---------- Timeline ---------- */
  const now = new Date();
  $("#timeline").innerHTML = C.dates.map(d => {
    const passed = aoe(d.date) < now;
    const status = passed ? "passed" : d.status;
    const tag = { tentative: '<span class="tag tag--tent">tentative</span>', confirmed: '<span class="tag tag--conf">confirmed</span>', passed: '<span class="tag tag--past">passed</span>' }[status];
    return `<li class="tl reveal ${d.highlight && !passed ? "tl--hl" : ""} ${passed ? "tl--passed" : ""}">
      <span class="tl__dot"></span>
      <div class="tl__card">
        <div class="tl__date">${fmt(d.date, { month: "short", day: "numeric", year: "numeric" })}</div>
        <div class="tl__day">${fmt(d.date, { weekday: "long" })}</div>
        <div class="tl__label">${esc(d.label)}</div>${tag}
        ${d.note ? `<p class="tl__note">${esc(d.note)}</p>` : ""}
      </div></li>`;
  }).join("");

  /* ---------- Countdown ---------- */
  const target = C.dates.find(d => d.countdown && aoe(d.date) > now) || C.dates.find(d => aoe(d.date) > now);
  if (target) {
    $("#cdLabel").textContent = `${target.label} · ${fmt(target.date, { month: "short", day: "numeric", year: "numeric" })} AoE${target.status === "tentative" ? " (tentative)" : ""}`;
    $("#cfpDeadline").textContent = fmt(target.date, { month: "short", day: "numeric", year: "numeric" }) + " AoE";
    const t = aoe(target.date).getTime(), pad = n => String(n).padStart(2, "0");
    const tick = () => {
      let s = Math.max(0, Math.floor((t - Date.now()) / 1000));
      $("#cdD").textContent = Math.floor(s / 86400); s %= 86400;
      $("#cdH").textContent = pad(Math.floor(s / 3600)); s %= 3600;
      $("#cdM").textContent = pad(Math.floor(s / 60));
      $("#cdS").textContent = pad(s % 60);
    };
    tick(); setInterval(tick, 1000);
  } else $("#countdown").hidden = true;

  /* ---------- Schedule ---------- */
  $("#schedule").innerHTML = C.schedule.map(s =>
    `<li class="t-${s.type} ${s.type === "break" ? "is-break" : ""}"><time>${esc(s.time)}</time><span class="s-title">${esc(s.title)}</span><span class="s-type">${esc(s.type)}</span></li>`
  ).join("");

  /* ---------- People ---------- */
  const initials = n => n.split(/\s+/).map(w => w[0]).slice(0, 2).join("");
  const card = (p, extra = "") => {
    const tag = p.url ? "a" : "div";
    const href = p.url ? ` href="${esc(p.url)}" target="_blank" rel="noopener"` : "";
    const img = p.photo ? `<img src="${esc(p.photo)}" alt="${esc(p.name)}" loading="lazy">` : `<span>${esc(initials(p.name))}</span>`;
    return `<${tag} class="person reveal"${href}><div class="avatar">${img}</div><h3>${esc(p.name)}</h3><p>${esc(p.aff)}</p>${p.country ? `<span class="country">${esc(p.country)}</span>` : ""}${extra}</${tag}>`;
  };
  $("#organizersGrid").innerHTML = C.organizers.map(p => card(p)).join("");
  $("#speakersGrid").innerHTML = C.speakers.length
    ? C.speakers.map(p => card(p, p.title ? `<p style="margin-top:10px;color:var(--text)">“${esc(p.title)}”</p>` : "")).join("")
    : Array.from({ length: C.speakerPlaceholders }, (_, i) =>
        `<div class="person person--tba reveal" style="transition-delay:${i * 80}ms"><div class="avatar"><span>?</span></div><h3>To be announced</h3><p>Keynote speaker ${i + 1}</p><span class="country">Coming soon</span></div>`).join("");
  if (C.showPC && C.pc.length) {
    $("#pcBlock").hidden = false; $("#pcSoon").hidden = true;
    $("#pcList").innerHTML = C.pc.map(p => `<li>${esc(p.name)} <span>· ${esc(p.aff)}</span></li>`).join("");
  }

  /* ---------- Nav ---------- */
  const nav = $("#nav"), toggle = $("#navToggle");
  const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  toggle.addEventListener("click", () => { const o = nav.classList.toggle("is-open"); toggle.setAttribute("aria-expanded", o); });
  $("#navLinks").addEventListener("click", e => { if (e.target.tagName === "A") nav.classList.remove("is-open"); });
  const links = [...document.querySelectorAll('.nav__links a:not(.nav__cta)')];
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach(s => spy.observe(s));

  /* ---------- Reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---------- Hero canvas: structured-data constellation ---------- */
  const cv = $("#heroCanvas"), ctx = cv.getContext("2d");
  let W, H, DPR, nodes = [], mouse = { x: -1e4, y: -1e4 }, t0 = performance.now();
  const COLORS = ["77,225,255", "62,240,176", "155,140,255"];
  function resize() {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const n = Math.round(Math.min(110, W * H / 14000));
    nodes = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
      r: Math.random() * 1.8 + .8, c: COLORS[Math.random() * 3 | 0],
      sq: Math.random() < .14   // some nodes drawn as "table cells"
    }));
  }
  function frame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);

    // time-series waves near the bottom
    for (let k = 0; k < 3; k++) {
      ctx.beginPath();
      for (let x = 0; x <= W; x += 8) {
        const y = H * (.78 + k * .05) + Math.sin(x * .006 + t * (.5 + k * .2) + k) * 18 + Math.sin(x * .017 - t * .7) * 7;
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = `rgba(${COLORS[k]},${.12 - k * .025})`; ctx.lineWidth = 1.4; ctx.stroke();
    }

    // graph edges
    const D = 140;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < D * D) {
          const o = (1 - Math.sqrt(d2) / D) * .28;
          ctx.strokeStyle = `rgba(${a.c},${o})`; ctx.lineWidth = .8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      const mx = a.x - mouse.x, my = a.y - mouse.y, md = Math.hypot(mx, my);
      if (md < 190) {
        ctx.strokeStyle = `rgba(${a.c},${(1 - md / 190) * .55})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    // nodes
    for (const p of nodes) {
      if (!reduce) { p.x += p.vx; p.y += p.vy; }
      if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
      ctx.fillStyle = `rgba(${p.c},.9)`;
      ctx.shadowColor = `rgba(${p.c},.8)`; ctx.shadowBlur = 8;
      if (p.sq) { const s = p.r * 3; ctx.strokeStyle = `rgba(${p.c},.7)`; ctx.lineWidth = 1; ctx.strokeRect(p.x - s, p.y - s, s * 2, s * 2); }
      else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
      ctx.shadowBlur = 0;
    }
    if (!reduce) requestAnimationFrame(frame);
  }
  addEventListener("resize", resize);
  $(".hero").addEventListener("pointermove", e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  $(".hero").addEventListener("pointerleave", () => { mouse.x = mouse.y = -1e4; });
  resize(); requestAnimationFrame(frame);
})();
