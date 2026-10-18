const categoryNames = {
  kulit: "Kulit & Bulu",
  nutrisi: "Nutrisi",
  pencernaan: "Pencernaan",
  perilaku: "Perilaku",
  vaksin: "Vaksin & Perawatan",
  umum: "Konsultasi Umum",
  gigi: "Gigi & Mulut",
  mata: "Mata & Telinga",
  reproduksi: "Reproduksi",
  kucing: "Kucing",
  anjing: "Anjing",
  burung: "Burung",
  kelinci: "Kelinci",
  hamster: "Hamster",
  reptil: "Reptil",
  ikan: "Ikan",
  lainnya: "hewan lainnya",
};

const speciesComplaints = {
  kucing: [
    { id: "kulit", tag: "kulit", title: "Kulit & bulu", text: "Gatal, jamur, kebotakan, atau menjilat terus-menerus." },
    { id: "nutrisi", tag: "nutrisi", title: "Makan & hairball", text: "Nafsu makan turun, muntah hairball, atau pilihan pakan." },
    { id: "pencernaan", tag: "pencernaan", title: "Muntah & diare", text: "Muntah, diare, atau sembelit." },
    { id: "kemih", tag: "umum", title: "Susah kencing", text: "Sering ke kotak pasir, urin sedikit, atau mengejan." },
    { id: "perilaku", tag: "perilaku", title: "Perilaku", text: "Mengompol di luar kotak, agresif, atau stres." },
    { id: "vaksin", tag: "vaksin", title: "Vaksin kucing", text: "Tricat, rabies, dan obat cacing." },
    { id: "gigi", tag: "gigi", title: "Gigi & mulut", text: "Bau mulut, karang gigi, atau gusi merah." },
    { id: "mata", tag: "mata", title: "Mata & telinga", text: "Belekan, flu kucing, atau telinga gatal." },
    { id: "reproduksi", tag: "reproduksi", title: "Birahi & steril", text: "Minta kawin, kebuntingan, atau waktu steril." }
  ],
  anjing: [
    { id: "kulit", tag: "kulit", title: "Kulit & kutu", text: "Gatal, kutu, jamur, atau hot spot." },
    { id: "nutrisi", tag: "nutrisi", title: "Pakan & berat badan", text: "Terlalu gemuk, kurus, atau curiga alergi makanan." },
    { id: "pencernaan", tag: "pencernaan", title: "Perut", text: "Muntah, diare, atau menelan benda." },
    { id: "kaki", tag: "umum", title: "Pincang", text: "Terpincang, kaku setelah jalan, atau nyeri kaki." },
    { id: "perilaku", tag: "perilaku", title: "Perilaku", text: "Menggonggong berlebih, cemas, atau agresif." },
    { id: "vaksin", tag: "vaksin", title: "Vaksin anjing", text: "Distemper, parvo, rabies, dan obat cacing." },
    { id: "gigi", tag: "gigi", title: "Gigi", text: "Karang gigi dan bau mulut." },
    { id: "mata", tag: "mata", title: "Mata & telinga", text: "Belekan, atau telinga bau dan gatal." },
    { id: "reproduksi", tag: "reproduksi", title: "Birahi & steril", text: "Birahi, kebuntingan, atau kastrasi." }
  ],
  burung: [
    { id: "nutrisi", tag: "nutrisi", title: "Pakan burung", text: "Biji, buah, sayuran, atau sedang rontok bulu." },
    { id: "kulit", tag: "umum", title: "Bulu", text: "Mencabuti bulu, rontok, atau kulit kering." },
    { id: "pencernaan", tag: "umum", title: "Makan & kotoran", text: "Tidak mau makan, kotoran encer, atau tembolok penuh." },
    { id: "napas", tag: "umum", title: "Napas & suara", text: "Bersin, ngos-ngosan, atau suara berubah." },
    { id: "paruh", tag: "umum", title: "Paruh & kuku", text: "Paruh terlalu panjang atau kuku tajam." }
  ],
  kelinci: [
    { id: "pencernaan", tag: "pencernaan", title: "Perut & feses", text: "Tidak mau makan, feses kecil, atau perut kembung." },
    { id: "nutrisi", tag: "umum", title: "Hay & pakan", text: "Hay, pelet, sayur, atau minum yang kurang." },
    { id: "gigi", tag: "umum", title: "Gigi kelinci", text: "Gigi depan panjang, ngiler, atau sulit mengunyah." },
    { id: "kulit", tag: "umum", title: "Kulit & tungau", text: "Gatal, ketombe, atau luka di tumit." }
  ],
  hamster: [
    { id: "pencernaan", tag: "pencernaan", title: "Perut & pipi", text: "Diare, ekor basah, atau kantung pipi bengkak." },
    { id: "gigi", tag: "umum", title: "Gigi depan", text: "Gigi terlalu panjang atau sulit menggerogoti." },
    { id: "kulit", tag: "umum", title: "Kulit & luka", text: "Tungau, gatal, atau luka karena berkelahi." },
    { id: "nutrisi", tag: "umum", title: "Pakan", text: "Tidak mau makan atau ragu pakan yang aman." }
  ],
  reptil: [
    { id: "kulit", tag: "kulit", title: "Sisik & ganti kulit", text: "Shedding macet, sisik luka, atau jamur." },
    { id: "nutrisi", tag: "umum", title: "Kalsium & makan", text: "Tidak mau makan, tulang lunak, atau kurang kalsium." },
    { id: "kandang", tag: "umum", title: "Suhu & kandang", text: "Terlalu dingin, kurang berjemur, atau kandang lembap." },
    { id: "pencernaan", tag: "umum", title: "Buang air", text: "Lama tidak buang air atau muntah." }
  ],
  ikan: [
    { id: "kandang", tag: "umum", title: "Air & akuarium", text: "Air keruh, suhu tidak pas, atau ikan megap di permukaan." },
    { id: "kulit", tag: "umum", title: "Sirip & tubuh", text: "Bintik putih, sirip rompal, atau luka di tubuh." },
    { id: "nutrisi", tag: "umum", title: "Pakan ikan", text: "Tidak mau makan atau pakan tidak cocok." }
  ],
  lainnya: [
    { id: "umum", tag: "umum", title: "Gejala umum", text: "Lesu, tidak mau makan, atau penyebabnya belum jelas." },
    { id: "nutrisi", tag: "nutrisi", title: "Pakan", text: "Jenis pakan, porsi, dan minum." },
    { id: "kulit", tag: "kulit", title: "Kulit & luka", text: "Luka, parasit, atau gatal." },
    { id: "vaksin", tag: "vaksin", title: "Vaksin & rutin", text: "Jadwal vaksin kuda, ternak, atau perawatan berkala." }
  ]
};

const state = { category: "semua", species: "", complaintId: "", complaintLabel: "", query: "", docsOpen: false };

const header = document.querySelector(".header");
const nav = document.getElementById("nav");
const navToggle = document.getElementById("nav-toggle");
const consultDialog = document.getElementById("consult-dialog");
const infoDialog = document.getElementById("info-dialog");
const consultForm = document.getElementById("consult-form");
const consultError = document.getElementById("consult-error");
const formView = document.getElementById("consult-form-view");
const successView = document.getElementById("consult-success");
const gateView = document.getElementById("consult-gate");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}, { passive: true });

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
});

document.querySelectorAll(".menu-btn[aria-haspopup]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const menu = button.parentElement;
    const willOpen = !menu.classList.contains("is-open");
    document.querySelectorAll(".menu.is-open").forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector(".menu-btn")?.setAttribute("aria-expanded", "false");
    });
    menu.classList.toggle("is-open", willOpen);
    button.setAttribute("aria-expanded", String(willOpen));
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".menu")) {
    document.querySelectorAll(".menu.is-open").forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector(".menu-btn")?.setAttribute("aria-expanded", "false");
    });
  }
  if (nav.classList.contains("is-open") && !event.target.closest(".nav") && !event.target.closest("#nav-toggle")) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".menu.is-open").forEach((item) => {
    item.classList.remove("is-open");
    item.querySelector(".menu-btn")?.setAttribute("aria-expanded", "false");
  });
  nav.classList.remove("is-open");
});

nav.addEventListener("click", (event) => {
  if (event.target.closest(".menu-btn")) return;
  if (event.target.closest("a, button")) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const storeDialog = document.getElementById("store-dialog");
document.querySelectorAll("[data-download]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".menu.is-open").forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector(".menu-btn")?.setAttribute("aria-expanded", "false");
    });
    storeDialog.showModal();
  });
});

function visibleDoctors() {
  return [...document.querySelectorAll(".doctor-card")].filter((card) => !card.hidden);
}

function applyFilters() {
  let shown = 0;
  document.querySelectorAll(".doctor-card").forEach((card) => {
    const blob = `${card.dataset.name} ${card.dataset.tags} ${card.dataset.specialty}`;
    const tags = card.dataset.tags.split(" ");
    const speciesOk = !state.species || state.species === "lainnya" || tags.includes(state.species);
    const catOk = state.category === "semua" || tags.includes(state.category);
    const queryOk = !state.query || blob.includes(state.query);
    const extraOk = state.docsOpen || !card.classList.contains("is-extra") || state.query || state.category !== "semua" || Boolean(state.species);
    const visible = speciesOk && catOk && queryOk && extraOk;
    card.hidden = !visible;
    if (visible) shown += 1;
  });

  document.getElementById("doctor-empty").hidden = shown !== 0;
  const status = document.getElementById("doctor-status");
  if (!state.query && state.category === "semua" && !state.species) {
    status.textContent = "";
    return;
  }
  const parts = [];
  if (state.species) parts.push(categoryNames[state.species] || state.species);
  if (state.complaintId === "custom" && state.complaintLabel) parts.push(state.complaintLabel);
  else if (state.category !== "semua") parts.push(state.complaintLabel || categoryNames[state.category] || state.category);
  const label = state.query ? `“${state.query}”` : parts.join(" · ");
  if (shown === 0 && state.species && state.species !== "lainnya") {
    document.querySelectorAll(".doctor-card").forEach((card) => {
      const tags = card.dataset.tags.split(" ");
      const visible = tags.includes("umum");
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    document.getElementById("doctor-empty").hidden = shown !== 0;
    status.textContent = shown
      ? `Belum ada dokter khusus ${categoryNames[state.species]}. ${shown} dokter umum bisa dihubungi.`
      : `Tidak ada dokter untuk ${label}`;
    return;
  }
  status.textContent = shown ? `${shown} dokter untuk ${label}` : `Tidak ada dokter untuk ${label}`;
}

document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  state.query = document.getElementById("q").value.trim().toLowerCase();
  applyFilters();
  scrollToId("dokter");
});

function selectSpecies(species) {
  state.species = state.species === species ? "" : species;
  state.category = "semua";
  state.complaintId = "";
  state.complaintLabel = "";
  const keluhanInput = document.getElementById("keluhan-input");
  keluhanInput.value = "";
  document.getElementById("keluhan-note").hidden = true;
  document.querySelectorAll(".pet-card").forEach((item) => {
    const on = item.dataset.species === state.species;
    item.classList.toggle("is-active", on);
    item.setAttribute("aria-pressed", String(on));
  });
  const panel = document.getElementById("keluhan");
  const complaints = speciesComplaints[state.species] || [];
  const byId = Object.fromEntries(complaints.map((item) => [item.id, item]));
  panel.hidden = !state.species;
  document.querySelectorAll(".cat-card").forEach((item) => {
    const copy = byId[item.dataset.cat];
    item.hidden = !copy;
    item.dataset.offered = copy ? "1" : "";
    item.classList.remove("is-active");
    if (!copy) return;
    item.dataset.tag = copy.tag;
    item.querySelector("h3").textContent = copy.title;
    item.querySelector("p").textContent = copy.text;
  });
  const grid = document.getElementById("cat-grid");
  complaints.forEach((item) => {
    const card = grid.querySelector(`[data-cat="${item.id}"]`);
    if (card) grid.appendChild(card);
  });
  if (state.species) {
    const name = categoryNames[state.species] || "hewan";
    document.getElementById("keluhan-title").textContent = name === "hewan lainnya"
      ? "Keluhan hewan lainnya"
      : `Keluhan ${name}`;
  }
  applyFilters();
  if (state.species) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

document.getElementById("pet-row").addEventListener("click", (event) => {
  const card = event.target.closest(".pet-card");
  if (!card) return;
  selectSpecies(card.dataset.species);
});

document.getElementById("cat-grid").addEventListener("click", (event) => {
  const card = event.target.closest(".cat-card");
  if (!card) return;
  const next = card.dataset.cat;
  if (state.complaintId === next) {
    state.complaintId = "";
    state.category = "semua";
    state.complaintLabel = "";
  } else {
    state.complaintId = next;
    state.category = card.dataset.tag || next;
    state.complaintLabel = card.querySelector("h3").textContent;
  }
  document.querySelectorAll(".cat-card").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.cat === state.complaintId);
  });
  applyFilters();
  scrollToId("dokter");
});

function filterTypedComplaint() {
  const query = document.getElementById("keluhan-input").value.trim().toLowerCase();
  let matches = 0;
  document.querySelectorAll(".cat-card").forEach((card) => {
    if (card.dataset.offered !== "1") return;
    const blob = card.innerText.toLowerCase();
    const visible = !query || blob.includes(query);
    card.hidden = !visible;
    if (visible) matches += 1;
  });
  document.getElementById("keluhan-note").hidden = !query || matches > 0;
}

document.getElementById("keluhan-input").addEventListener("input", filterTypedComplaint);

document.getElementById("keluhan-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const text = document.getElementById("keluhan-input").value.trim();
  if (!text) {
    document.getElementById("keluhan-input").focus();
    return;
  }
  state.complaintId = "custom";
  state.category = "semua";
  state.complaintLabel = text;
  document.querySelectorAll(".cat-card").forEach((item) => item.classList.remove("is-active"));
  applyFilters();
  scrollToId("dokter");
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    if (speciesComplaints[filter]) {
      if (state.species !== filter) selectSpecies(filter);
      scrollToId("kategori");
      return;
    }
    state.species = "";
    state.category = filter;
    state.complaintId = "";
    state.complaintLabel = "";
    document.querySelectorAll(".pet-card").forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    document.getElementById("keluhan").hidden = true;
    document.querySelectorAll(".cat-card").forEach((item) => item.classList.remove("is-active"));
    applyFilters();
    scrollToId("dokter");
  });
});

function wireExpand(buttonId, selector, moreLabel, lessLabel) {
  const button = document.getElementById(buttonId);
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    button.textContent = open ? lessLabel : moreLabel;
    document.querySelectorAll(selector).forEach((item) => {
      item.hidden = !open;
    });
    if (buttonId === "more-docs") {
      state.docsOpen = open;
      applyFilters();
    }
  });
}

wireExpand("more-docs", ".doctor-card.is-extra", "Lihat Semua Dokter →", "Sembunyikan Dokter →");
wireExpand("more-quotes", ".quote.is-extra", "Lihat Semua Testimoni →", "Sembunyikan Testimoni →");
wireExpand("more-faq", ".faq-item.is-extra", "Lihat Semua FAQ →", "Sembunyikan FAQ →");

document.getElementById("faq").addEventListener("click", (event) => {
  const button = event.target.closest(".faq-item button");
  if (!button) return;
  const panel = button.nextElementSibling;
  const open = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!open));
  panel.hidden = open;
});

function consultReady() {
  const data = new FormData(consultForm);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const phone = String(data.get("phone") || "").replace(/\s/g, "");
  const service = String(data.get("service") || "");
  const species = String(data.get("species") || "");
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneOk = /^08\d{8,12}$/.test(phone);
  return Boolean(name && emailOk && phoneOk && service && species);
}

function syncConsultButton() {
  document.getElementById("consult-submit").disabled = !consultReady();
}

consultForm.addEventListener("input", syncConsultButton);
consultForm.addEventListener("change", syncConsultButton);

function showConsultStep(step) {
  gateView.hidden = step !== "gate";
  loginForm.hidden = step !== "login";
  signupForm.hidden = step !== "signup";
  formView.hidden = step !== "form";
  successView.hidden = step !== "download";
  if (step === "form") {
    applyChosenVisit();
    syncConsultButton();
  }
}

function applyChosenVisit() {
  const speciesNames = {
    kucing: "Kucing",
    anjing: "Anjing",
    burung: "Burung",
    kelinci: "Kelinci",
    hamster: "Hamster & hewan kecil",
    reptil: "Reptil",
    ikan: "Ikan",
    lainnya: "Lainnya"
  };
  const speciesName = speciesNames[state.species];
  if (speciesName && [...consultForm.elements.species.options].some((option) => option.value === speciesName)) {
    consultForm.elements.species.value = speciesName;
  }
  if (state.complaintLabel) consultForm.elements.complaint.value = state.complaintLabel;
}

function openConsult(doctor, species) {
  document.getElementById("consult-doctor").textContent = doctor || "dokter hewan SobatPaws";
  if (species && [...consultForm.elements.species.options].some((option) => option.value === species)) {
    consultForm.elements.species.value = species;
  }
  applyChosenVisit();
  consultError.textContent = "";
  document.getElementById("login-error").textContent = "";
  document.getElementById("signup-error").textContent = "";
  showConsultStep("gate");
  consultDialog.showModal();
}

document.getElementById("show-login").addEventListener("click", () => showConsultStep("login"));
document.getElementById("show-signup").addEventListener("click", () => showConsultStep("signup"));
document.getElementById("login-to-signup").addEventListener("click", () => showConsultStep("signup"));
document.getElementById("signup-to-login").addEventListener("click", () => showConsultStep("login"));

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(loginForm);
  if (!data.get("agree")) {
    document.getElementById("login-error").textContent = "Setujui syarat dan ketentuan untuk masuk.";
    return;
  }
  consultForm.elements.email.value = data.get("email");
  document.getElementById("login-error").textContent = "";
  showConsultStep("form");
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(signupForm);
  if (!data.get("terms") || !data.get("privacy")) {
    document.getElementById("signup-error").textContent = "Setujui syarat dan kebijakan privasi untuk daftar.";
    return;
  }
  let phone = String(data.get("phone") || "").replace(/\D/g, "");
  if (phone.startsWith("62")) phone = phone.slice(2);
  if (!phone.startsWith("0")) phone = `0${phone}`;
  consultForm.elements.name.value = `${data.get("first")} ${data.get("last")}`.trim();
  consultForm.elements.email.value = data.get("email");
  consultForm.elements.phone.value = phone;
  document.getElementById("signup-error").textContent = "";
  showConsultStep("form");
});

document.addEventListener("click", (event) => {
  const consult = event.target.closest("[data-consult]");
  if (consult) {
    openConsult(consult.dataset.doctor || "", consult.dataset.species || "");
    return;
  }
  const info = event.target.closest("[data-info]");
  if (info) {
    const source = document.getElementById(info.dataset.info);
    if (!source) return;
    document.getElementById("info-title").textContent = source.dataset.title;
    document.getElementById("info-body").innerHTML = source.innerHTML;
    infoDialog.showModal();
  }
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog")?.close());
});

[consultDialog, infoDialog, storeDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

consultDialog.addEventListener("close", () => {
  consultForm.reset();
  loginForm.reset();
  signupForm.reset();
  consultError.textContent = "";
  document.getElementById("login-error").textContent = "";
  document.getElementById("signup-error").textContent = "";
  showConsultStep("gate");
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

consultForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!consultReady()) {
    consultError.textContent = "Lengkapi nama, email, nomor 08..., jenis hewan, dan jenis konsultasi.";
    return;
  }
  const data = new FormData(consultForm);
  const doctor = document.getElementById("consult-doctor").textContent;
  const complaint = String(data.get("complaint") || "").trim();
  document.getElementById("success-text").innerHTML =
    `Untuk konsultasi dengan <strong>${escapeHtml(doctor)}</strong>, unduh aplikasi SobatPaws dan lanjutkan sesi Anda di sana.`;
  const rows = [
    ["Nama", data.get("name")],
    ["Email", data.get("email")],
    ["No. Telepon", data.get("phone")],
    ["Jenis Hewan", data.get("species")],
    ["Jenis Konsultasi", data.get("service")],
  ];
  if (complaint) rows.push(["Keluhan", complaint]);
  document.getElementById("consult-recap").innerHTML = rows
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>`)
    .join("");
  formView.hidden = true;
  successView.hidden = false;
});

const newsForm = document.getElementById("news-form");
if (newsForm) {
  newsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    document.getElementById("news-msg").textContent = `${email} tercatat untuk info SobatPaws. Pratinjau, belum terkirim ke server.`;
    event.currentTarget.reset();
  });
}

const promoTrack = document.getElementById("promo-track");
const promoSlides = [...promoTrack.children];
const promoDots = [...document.querySelectorAll("#promo-dots button")];
const promoView = document.getElementById("promo-view");
let promoIndex = 0;
let promoTimer = 0;

function showPromo(next) {
  promoIndex = (next + promoSlides.length) % promoSlides.length;
  promoTrack.style.transform = `translateX(-${promoIndex * 100}%)`;
  promoSlides.forEach((slide, index) => {
    const current = index === promoIndex;
    slide.setAttribute("aria-hidden", String(!current));
    slide.tabIndex = current ? 0 : -1;
  });
  promoDots.forEach((dot, index) => {
    if (index === promoIndex) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
}

function queuePromo() {
  window.clearInterval(promoTimer);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  promoTimer = window.setInterval(() => showPromo(promoIndex + 1), 5500);
}

document.querySelector(".promo-arrow.is-prev").addEventListener("click", () => {
  showPromo(promoIndex - 1);
  queuePromo();
});
document.querySelector(".promo-arrow.is-next").addEventListener("click", () => {
  showPromo(promoIndex + 1);
  queuePromo();
});
promoDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showPromo(index);
    queuePromo();
  });
});

let promoStartX = 0;
promoView.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".promo-arrow")) return;
  promoStartX = event.clientX;
});
promoView.addEventListener("pointerup", (event) => {
  if (event.target.closest(".promo-arrow")) return;
  const delta = event.clientX - promoStartX;
  if (Math.abs(delta) < 48) return;
  showPromo(promoIndex + (delta < 0 ? 1 : -1));
  queuePromo();
});
promoView.addEventListener("pointerenter", () => window.clearInterval(promoTimer));
promoView.addEventListener("pointerleave", queuePromo);
showPromo(0);
queuePromo();

const pathSteps = document.querySelector(".path");
if (pathSteps && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealSteps = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    pathSteps.classList.add("is-ready");
    revealSteps.disconnect();
  }, { threshold: 0.35 });
  revealSteps.observe(pathSteps);
}

document.querySelectorAll("section[id], .hero").forEach((section) => {
  section.style.scrollMarginTop = "88px";
});
