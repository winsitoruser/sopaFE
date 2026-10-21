const nav = document.querySelector("#site-nav");
const toggle = nav ? document.querySelector(".nav-toggle") : null;
const demo = document.querySelector("#demo-modal");
const video = document.querySelector("#video-modal");
const dash = document.querySelector("#dash-pop");
const form = document.querySelector("#demo-form");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const heroWash = document.querySelector(".hero__wash video");
if (heroWash && reduceMotion) heroWash.pause();

function closeNav() {
  nav?.classList.remove("is-open");
  toggle?.setAttribute("aria-expanded", "false");
  toggle?.setAttribute("aria-label", "Buka menu");
  document.body.classList.remove("nav-open");
}

toggle?.addEventListener("click", () => {
  const open = nav?.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  document.body.classList.toggle("nav-open", open);
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a, button") && event.target !== toggle) closeNav();
});

const heroStage = document.querySelector(".hero__stage");
const heroLinks = heroStage?.querySelector(".hero__links");
if (heroStage && heroLinks) {
  const hub = heroStage.querySelector(".hero__portrait");
  const nodes = [...heroStage.querySelectorAll("[data-node]")];
  const beats = { shop: 7.2, clinic: 6.4, hotel: 6.8 };
  const flows = [
    { id: "clinic", label: "Booking", phase: 0.2 },
    { id: "hotel", label: "Grooming", phase: 0.12 },
    { id: "shop", label: "Belanja", phase: 0.22 },
    { id: "hotel", label: "Order", phase: 0.58 }
  ];
  heroLinks.innerHTML = nodes.map((node) => {
    const id = node.dataset.node;
    return `<path class="hero__string" data-link="${id}"></path><path class="hero__pulse-line" data-link="${id}"></path>`;
  }).join("");
  const chips = flows.map((flow) => {
    const chip = document.createElement("span");
    chip.className = "hero__flow";
    chip.textContent = flow.label;
    heroStage.appendChild(chip);
    return chip;
  });
  const curves = new Map();
  const point = (p0, c1, c2, p3, t) => {
    const u = 1 - t;
    return {
      x: u * u * u * p0.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * p3.x,
      y: u * u * u * p0.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * p3.y
    };
  };
  const drawLinks = (time) => {
    const stage = heroStage.getBoundingClientRect();
    if (!stage.width || !hub) return;
    heroLinks.setAttribute("viewBox", `0 0 ${stage.width} ${stage.height}`);
    const hubBox = hub.getBoundingClientRect();
    const hx = hubBox.left - stage.left + hubBox.width / 2;
    const hy = hubBox.top - stage.top + hubBox.height / 2;
    nodes.forEach((node) => {
      const id = node.dataset.node;
      const anchor = node.querySelector(".hero__anchor").getBoundingClientRect();
      const tx = anchor.left - stage.left + anchor.width / 2;
      const ty = anchor.top - stage.top + anchor.height / 2;
      const dx = tx - hx;
      const dy = ty - hy;
      const length = Math.hypot(dx, dy) || 1;
      const ux = dx / length;
      const uy = dy / length;
      const rim = hubBox.width / 2;
      const p0 = { x: hx + ux * rim, y: hy + uy * rim };
      const bend = id === "hotel" ? -42 : id === "shop" ? -26 : 18;
      const c1 = {
        x: p0.x + dx * 0.42 - uy * bend,
        y: p0.y + dy * 0.42 + ux * bend
      };
      const c2 = {
        x: tx + (c1.x - tx) * 0.18,
        y: ty + (c1.y - ty) * 0.18
      };
      const d = `M ${p0.x} ${p0.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${tx} ${ty}`;
      heroLinks.querySelectorAll(`[data-link="${id}"]`).forEach((path) => path.setAttribute("d", d));
      curves.set(id, [p0, c1, c2, { x: tx, y: ty }]);
    });
    flows.forEach((flow, index) => {
      const curve = curves.get(flow.id);
      const chip = chips[index];
      if (!curve || !chip) return;
      const travel = reduceMotion ? 0.5 : ((time / 1000) / beats[flow.id] + flow.phase) % 1;
      const spot = point(curve[0], curve[1], curve[2], curve[3], travel);
      chip.style.left = `${spot.x}px`;
      chip.style.top = `${spot.y}px`;
    });
  };
  const tick = (time) => {
    drawLinks(time);
    if (!reduceMotion) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  window.addEventListener("resize", () => drawLinks(performance.now()));
}

const sections = [...document.querySelectorAll("main > section")];
if (reduceMotion) {
  document.body.classList.add("loaded");
  document.getElementById("loader")?.classList.add("done");
  sections.forEach((section) => section.classList.add("in"));
} else if (sections.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
    });
  }, { threshold: 0.3 });
  sections.forEach((section) => revealObserver.observe(section));
}

function parallax() {
  if (reduceMotion) return;
  document.querySelectorAll("[data-speed]").forEach((el) => {
    const sec = el.closest("section");
    if (!sec) return;
    const p = -sec.getBoundingClientRect().top / innerHeight;
    const speed = Number(el.dataset.speed) || 0;
    const rot = Number(el.dataset.rot) || 0;
    el.style.transform = `translate3d(0, ${p * speed * innerHeight}px, 0) rotate(${p * rot}deg)`;
  });
}

function theme() {
  const y = innerHeight * 0.06;
  const current = sections.find((sec) => {
    const rect = sec.getBoundingClientRect();
    return rect.top <= y && rect.bottom >= y;
  });
  document.body.classList.toggle("on-dark", current?.dataset.theme === "dark");
}

function onScroll() {
  parallax();
  theme();
}
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);

document.querySelectorAll("[data-hero-slides]").forEach((frame) => {
  const slides = [...frame.querySelectorAll(".hero__slide")];
  const dots = [...frame.querySelectorAll(".hero__dots button")];
  if (slides.length < 2) return;
  let index = 0;
  let timer = 0;
  const show = (next) => {
    slides[index].classList.remove("is-on");
    dots[index]?.removeAttribute("aria-current");
    index = (next + slides.length) % slides.length;
    slides[index].classList.add("is-on");
    dots[index]?.setAttribute("aria-current", "true");
  };
  const start = () => {
    if (reduceMotion) return;
    timer = window.setInterval(() => show(index + 1), 4200);
  };
  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      window.clearInterval(timer);
      show(dotIndex);
      start();
    });
  });
  start();
});

document.querySelectorAll("[data-monitor]").forEach((monitor) => {
  const slides = [...monitor.querySelectorAll(".monitor-screen img")];
  const dots = [...monitor.querySelectorAll(".monitor-dots button")];
  if (slides.length < 2) return;
  let index = 0;
  let timer = 0;

  slides.forEach((slide, slideIndex) => {
    slide.setAttribute("aria-hidden", slideIndex === 0 ? "false" : "true");
  });

  const show = (next) => {
    slides[index].classList.remove("is-on");
    slides[index].setAttribute("aria-hidden", "true");
    dots[index]?.classList.remove("is-on");
    dots[index]?.removeAttribute("aria-current");
    index = (next + slides.length) % slides.length;
    slides[index].classList.add("is-on");
    slides[index].setAttribute("aria-hidden", "false");
    dots[index]?.classList.add("is-on");
    dots[index]?.setAttribute("aria-current", "true");
  };

  const start = () => {
    if (reduceMotion) return;
    timer = window.setInterval(() => show(index + 1), 4200);
  };

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      window.clearInterval(timer);
      show(dotIndex);
      start();
    });
  });

  start();
});

function openModal(dialog) {
  if (dialog && !dialog.open) dialog.showModal();
}

const demoTitle = document.querySelector("#demo-title");
const demoLead = document.querySelector("#demo-lead");
const demoKicker = document.querySelector("#demo-kicker");
const demoTitleDefault = demoTitle?.textContent || "";
const demoLeadDefault = demoLead?.textContent || "";
const demoKickerDefault = demoKicker?.textContent || "";

document.querySelectorAll("[data-open-demo]").forEach((button) => {
  button.addEventListener("click", () => {
    video?.close();
    const integrasi = button.dataset.demo === "integrasi";
    if (form) form.dataset.mode = integrasi ? "integrasi" : "demo";
    if (demoTitle && demoLead && demoKicker) {
      if (integrasi) {
        demoKicker.textContent = "Konsultasi";
        demoTitle.textContent = "Konsultasikan Integrasi";
        demoLead.textContent = "Ceritakan sistem yang sudah berjalan. Tim SoPaws membalas lewat WhatsApp.";
      } else {
        demoKicker.textContent = demoKickerDefault;
        demoTitle.textContent = demoTitleDefault;
        demoLead.textContent = demoLeadDefault;
      }
    }
    form?.querySelector(".demo-pop__error")?.setAttribute("hidden", "");
    form?.querySelectorAll(".is-bad").forEach((field) => field.classList.remove("is-bad"));
    openModal(demo);
  });
});

document.querySelector("[data-open-video]")?.addEventListener("click", () => openModal(video));

document.querySelectorAll("[data-open-dash]").forEach((button) => {
  button.addEventListener("click", () => {
    video?.close();
    demo?.close();
    openModal(dash);
  });
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog")?.close());
});

demo?.addEventListener("click", (event) => {
  if (event.target === demo) demo.close();
});

form?.addEventListener("input", (event) => {
  event.target.classList?.remove("is-bad");
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const nama = String(data.get("nama") || "").trim();
  const bisnis = String(data.get("bisnis") || "").trim();
  const wa = String(data.get("wa") || "").trim();
  const jenis = String(data.get("jenis") || "").trim();
  const catatan = String(data.get("catatan") || "").trim();
  const digits = wa.replace(/\D/g, "");
  const error = form.querySelector(".demo-pop__error");
  const invalid = [
    [form.nama, !nama],
    [form.bisnis, !bisnis],
    [form.wa, digits.length < 9 || digits.length > 15],
    [form.jenis, !jenis]
  ].filter(([, bad]) => bad).map(([field]) => field);

  form.querySelectorAll(".is-bad").forEach((field) => field.classList.remove("is-bad"));
  if (invalid.length) {
    invalid.forEach((field) => field.classList.add("is-bad"));
    if (error) error.hidden = false;
    invalid[0].focus();
    return;
  }
  if (error) error.hidden = true;

  const integrasi = form.dataset.mode === "integrasi";
  const lines = [
    integrasi
      ? "Halo SobatPaws, saya ingin konsultasi integrasi sistem."
      : "Halo SobatPaws, saya ingin menjadwalkan demo.",
    "",
    `Nama: ${nama}`,
    `Bisnis: ${bisnis}`,
    `WhatsApp: ${wa}`,
    `Jenis bisnis: ${jenis}`
  ];
  if (catatan) lines.push(`Catatan: ${catatan}`);
  const url = `https://wa.me/6285117767264?text=${encodeURIComponent(lines.join("\n"))}`;
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) window.location.assign(url);
});

const impact = document.querySelector("[data-impact]");
if (impact) {
  const track = impact.querySelector(".impact-track");
  const originals = [...track.children];
  const dotsWrap = document.querySelector("[data-impact-dots]");
  const format = (el, value) => `${el.dataset.prefix || ""}${value}${el.dataset.suffix || ""}`;
  const seen = new WeakSet();
  const countCard = (card) => {
    if (!card || seen.has(card)) return;
    seen.add(card);
    card.querySelectorAll(".impact-card__num").forEach((el) => {
      const target = Number(el.dataset.count) || 0;
      if (reduceMotion) {
        el.textContent = format(el, target);
        return;
      }
      const start = performance.now();
      const duration = 1100;
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) ** 3;
        el.textContent = format(el, Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      el.textContent = format(el, 0);
      requestAnimationFrame(tick);
    });
  };

  originals.forEach((card, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", card.querySelector("h3")?.textContent || `Dampak ${index + 1}`);
    if (index === 0) dot.setAttribute("aria-current", "true");
    dotsWrap?.appendChild(dot);
  });
  const dots = [...(dotsWrap?.children || [])];

  if (!reduceMotion) {
    originals.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("a").forEach((link) => link.setAttribute("tabindex", "-1"));
      track.appendChild(clone);
    });
  }

  let index = 0;
  let timer = 0;
  let resetTimer = 0;
  const gap = () => parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 18;
  const stepWidth = () => (track.children[0]?.getBoundingClientRect().width || 0) + gap();
  const mark = () => {
    const active = index % originals.length;
    [...track.children].forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === index);
    });
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  };
  const place = (animateNumbers) => {
    track.style.transition = reduceMotion ? "none" : "";
    track.style.transform = `translate3d(${-index * stepWidth()}px, 0, 0)`;
    mark();
    if (animateNumbers) countCard(track.children[index]);
    if (!reduceMotion && index === originals.length) {
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        track.style.transition = "none";
        index = 0;
        track.style.transform = "translate3d(0, 0, 0)";
        mark();
        requestAnimationFrame(() => {
          track.style.transition = "";
        });
      }, 1160);
    }
  };
  const go = (next, animateNumbers) => {
    window.clearTimeout(resetTimer);
    index = (next + originals.length) % originals.length;
    place(animateNumbers);
  };
  const start = () => {
    if (reduceMotion) return;
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      index += 1;
      place(true);
    }, 3800);
  };

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      window.clearInterval(timer);
      go(dotIndex, true);
      start();
    });
  });
  impact.addEventListener("mouseenter", () => window.clearInterval(timer));
  impact.addEventListener("mouseleave", start);
  impact.addEventListener("focusin", () => window.clearInterval(timer));
  impact.addEventListener("focusout", start);
  window.addEventListener("resize", () => go(index, false));

  const watch = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countCard(entry.target);
    });
  }, { threshold: 0.45 });
  originals.forEach((card) => watch.observe(card));
  mark();
  start();
}
