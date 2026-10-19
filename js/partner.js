const services = [
  { name: "Pet Sitting", copy: "Cocok kalau anabul perlu dijaga di rumah saat kamu pergi." },
  { name: "Dog Walking", copy: "Cocok kalau anjing butuh diajak jalan supaya energinya tersalurkan." },
  { name: "Daycare", copy: "Cocok kalau anabul perlu teman dan pengawasan seharian." },
  { name: "Training", copy: "Cocok kalau kamu ingin kebiasaan dasar anabul lebih terarah." },
  { name: "Pet Taxi", copy: "Cocok kalau anabul perlu diantar ke klinik, grooming, atau keluarga." },
  { name: "Photography", copy: "Cocok kalau kamu ingin mengabadikan momen anabul." }
];

const keywords = [
  { test: /jalan|walk|energi|lari|gonggong/, name: "Dog Walking" },
  { test: /foto|photo|abadikan|gambar/, name: "Photography" },
  { test: /latih|training|duduk|tali|perilaku/, name: "Training" },
  { test: /antar|jemput|taxi|klinik|groom/, name: "Pet Taxi" },
  { test: /jaga|sitting|di rumah|libur/, name: "Pet Sitting" },
  { test: /daycare|penitipan|seharian|kantor/, name: "Daycare" }
];

const areas = {
  "Jakarta Selatan": { lat: -6.2615, lng: 106.8106 },
  "Jakarta Pusat": { lat: -6.1862, lng: 106.8341 },
  Tangerang: { lat: -6.2024, lng: 106.6527 },
  Depok: { lat: -6.4025, lng: 106.7942 },
  Bekasi: { lat: -6.2383, lng: 106.9756 }
};

const state = {
  service: "Semua",
  area: "",
  pet: "",
  sort: "near",
  expanded: false,
  mapOpen: false,
  page: 1,
  pageSize: 16,
  origin: { ...areas["Jakarta Selatan"], label: "Jakarta Selatan" },
  bounds: null
};

const grid = document.querySelector("#partner-grid");
const empty = document.querySelector("#partner-empty");
const shownCount = document.querySelector("#shown-count");
const totalCount = document.querySelector("#total-count");
const showAllBtn = document.querySelector("#show-all");
const pager = document.querySelector("#partner-pager");
const pageViewWrap = document.querySelector("#page-view-wrap");
const pageView = document.querySelector("#page-view");

function previewLimit() {
  return state.mapOpen ? 12 : 16;
}

function cards() {
  return [...grid.querySelectorAll(".pp-card")];
}

function match(card) {
  const serviceOk = state.service === "Semua" || card.dataset.service === state.service;
  const areaOk = !state.area || card.dataset.area === state.area;
  const petOk = !state.pet || card.dataset.pets.split(" ").includes(state.pet);
  if (!state.bounds || !card.dataset.lat) return serviceOk && areaOk && petOk;
  const lat = Number(card.dataset.lat);
  const lng = Number(card.dataset.lng);
  const box = state.bounds;
  const inside = lat <= box.north && lat >= box.south && lng <= box.east && lng >= box.west;
  return serviceOk && areaOk && petOk && inside;
}

function haversine(a, b) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function distanceKm(card) {
  if (!state.origin || !card.dataset.lat) return Number(card.dataset.km);
  return haversine(state.origin, { lat: Number(card.dataset.lat), lng: Number(card.dataset.lng) });
}

function writeKm(card) {
  const km = distanceKm(card);
  card.dataset.distance = String(km);
  const node = card.querySelector(".pp-km");
  const svg = node.querySelector("svg");
  const text = km < 10
    ? km.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    : Math.round(km).toLocaleString("id-ID");
  node.replaceChildren(svg, document.createTextNode(` ${text} km`));
}

function sortCards() {
  const list = cards();
  if (!list[0].dataset.order) {
    list.forEach((card, index) => {
      card.dataset.order = String(index);
    });
  }
  const value = {
    near: (card) => Number(card.dataset.distance || card.dataset.km),
    recommend: (card) => Number(card.dataset.order),
    rating: (card) => -Number(card.dataset.rating),
    price: (card) => Number(card.dataset.price),
    reviews: (card) => -Number(card.dataset.reviews)
  }[state.sort];
  list.sort((a, b) => value(a) - value(b) || a.dataset.name.localeCompare(b.dataset.name, "id"));
  list.forEach((card) => grid.appendChild(card));
}

function renderPager(pages) {
  pageViewWrap.hidden = !state.expanded;
  pager.hidden = !state.expanded || pages < 2;
  pager.replaceChildren();
  if (pager.hidden) return;
  const go = (page) => {
    state.page = page;
    apply();
    document.querySelector("#partner-grid").scrollIntoView({ block: "start" });
  };
  const add = (label, page, options = {}) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `pp-page${options.current ? " is-on" : ""}`;
    button.textContent = label;
    button.disabled = Boolean(options.disabled);
    if (options.current) button.setAttribute("aria-current", "page");
    if (!options.disabled && !options.current) button.addEventListener("click", () => go(page));
    pager.appendChild(button);
  };
  add("Sebelumnya", state.page - 1, { disabled: state.page <= 1 });
  for (let page = 1; page <= pages; page += 1) add(String(page), page, { current: page === state.page });
  add("Berikutnya", state.page + 1, { disabled: state.page >= pages });
}

function apply() {
  cards().forEach(writeKm);
  sortCards();
  const matched = cards().filter(match);
  const preview = previewLimit();
  const pageSize = state.expanded ? state.pageSize : preview;
  const pages = Math.max(1, Math.ceil(matched.length / pageSize));
  if (!state.expanded) state.page = 1;
  if (state.page > pages) state.page = pages;
  const start = (state.page - 1) * pageSize;
  const visible = matched.slice(start, start + pageSize);
  cards().forEach((card) => {
    card.hidden = !visible.includes(card);
  });
  const end = start + visible.length;
  shownCount.textContent = visible.length ? `${start + 1}–${end}` : "0";
  totalCount.textContent = String(matched.length);
  empty.hidden = matched.length > 0;
  showAllBtn.hidden = state.expanded || matched.length <= preview;
  showAllBtn.textContent = "Lihat Semua Paws Partner";
  renderPager(pages);
  cards().forEach((card) => card.classList.toggle("is-on", card.dataset.name === activeName));
  paintMap();
  sizeMap();
}

function sizeMap() {
  const box = document.querySelector(".pp-browse-map");
  if (!box) return;
  if (!state.mapOpen) {
    box.style.height = "";
    return;
  }
  const grid = document.querySelector("#partner-grid");
  const button = document.querySelector("#show-all");
  const foot = document.querySelector(".pp-list-foot");
  const target = button && !button.hidden ? button : foot;
  if (!grid || !target) return;
  const top = grid.getBoundingClientRect().top;
  const bottom = target.getBoundingClientRect().bottom;
  box.style.height = `${Math.max(180, Math.round(bottom - top))}px`;
  if (map) map.invalidateSize();
}

function setService(name) {
  state.service = name;
  state.expanded = false;
  state.page = 1;
  document.querySelectorAll("[data-filter]").forEach((chip) => {
    chip.setAttribute("aria-pressed", String(chip.dataset.filter === name));
  });
  const select = document.querySelector("#search-service");
  if ([...select.options].some((option) => option.value === name)) select.value = name;
  apply();
}

document.querySelectorAll("[data-filter]").forEach((chip) => {
  chip.addEventListener("click", () => {
    setService(chip.dataset.filter);
    document.querySelector("#mitra").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelector("#sort-by").addEventListener("change", (event) => {
  state.sort = event.target.value;
  state.page = 1;
  apply();
});

showAllBtn.addEventListener("click", () => {
  state.expanded = true;
  state.page = 1;
  state.pageSize = previewLimit();
  pageView.value = String(state.pageSize);
  apply();
});

pageView.addEventListener("change", () => {
  state.pageSize = Number(pageView.value);
  state.page = 1;
  state.expanded = true;
  apply();
});

document.querySelector("#search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  state.area = data.get("lokasi");
  state.pet = data.get("hewan");
  state.bounds = null;
  state.expanded = false;
  state.page = 1;
  if (state.area && areas[state.area]) {
    state.origin = { ...areas[state.area], label: state.area };
    document.querySelector("#origin-label").textContent = `Jarak dari ${state.area}`;
  }
  state.sort = "near";
  document.querySelector("#sort-by").value = "near";
  setService(data.get("layanan") || "Semua");
  focusOrigin(state.area ? 13 : 12);
  document.querySelector("#mitra").scrollIntoView({ behavior: "smooth", block: "start" });
});

const bookDialog = document.querySelector("#book-dialog");
const profileDialog = document.querySelector("#profile-dialog");
let activeCard = null;

function rupiah(value) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function fillBook(card) {
  activeCard = card;
  document.querySelector("#book-photo").src = card.dataset.photo;
  document.querySelector("#book-photo").alt = card.dataset.name;
  document.querySelector("#book-name").textContent = card.dataset.name;
  document.querySelector("#book-meta").textContent = `${card.dataset.service} · ${card.dataset.area} · Rp${rupiah(card.dataset.price)} / sesi`;
  const searchDate = document.querySelector("#search-date").value;
  const dateField = document.querySelector("#book-date");
  if (searchDate) dateField.value = searchDate;
  document.querySelector("#book-success").hidden = true;
  document.querySelector("#book-form").querySelector("button[type=submit]").hidden = false;
}

function openBook(card) {
  fillBook(card);
  if (profileDialog.open) profileDialog.close();
  bookDialog.showModal();
}

grid.addEventListener("mouseover", (event) => {
  const card = event.target.closest(".pp-card");
  if (!card || card.dataset.name === activeName) return;
  activeName = card.dataset.name;
  cards().forEach((item) => item.classList.toggle("is-on", item.dataset.name === activeName));
  markers.forEach((marker, name) => {
    const item = cards().find((entry) => entry.dataset.name === name);
    if (item) marker.setIcon(priceIcon(item, name === activeName));
  });
});

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".pp-card");
  if (!card) return;
  if (event.target.closest("[data-book]")) openBook(card);
  if (event.target.closest("[data-profile]")) {
    activeCard = card;
    document.querySelector("#profile-photo").src = card.dataset.photo;
    document.querySelector("#profile-photo").alt = card.dataset.name;
    document.querySelector("#profile-name").textContent = card.dataset.name;
    const reviews = Number(card.dataset.reviews);
    const score = reviews > 0 ? `★ ${Number(card.dataset.rating).toFixed(1)}` : "Baru";
    document.querySelector("#profile-meta").textContent = `${card.dataset.service} · ${card.dataset.area} · ${score}`;
    document.querySelector("#profile-bio").textContent = card.dataset.bio;
    document.querySelector("#profile-includes").textContent = card.dataset.includes || "";
    profileDialog.showModal();
  }
});

document.querySelector("#profile-book").addEventListener("click", () => {
  if (activeCard) openBook(activeCard);
});

document.querySelector("#book-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#book-success").hidden = false;
  event.currentTarget.querySelector("button[type=submit]").hidden = true;
});

const areaGap = {
  "Jakarta Selatan": { "Jakarta Selatan": 0, "Jakarta Pusat": 6, Depok: 8, Bekasi: 18, Tangerang: 22 },
  "Jakarta Pusat": { "Jakarta Pusat": 0, "Jakarta Selatan": 6, Tangerang: 14, Bekasi: 16, Depok: 14 },
  Tangerang: { Tangerang: 0, "Jakarta Pusat": 14, "Jakarta Selatan": 20, Depok: 24, Bekasi: 30 },
  Depok: { Depok: 0, "Jakarta Selatan": 8, "Jakarta Pusat": 14, Bekasi: 22, Tangerang: 26 },
  Bekasi: { Bekasi: 0, "Jakarta Pusat": 16, "Jakarta Selatan": 18, Depok: 22, Tangerang: 32 }
};

const planDate = document.querySelector("#plan-date");
const planStory = document.querySelector("#plan-story");
planDate.min = new Date().toISOString().slice(0, 10);

document.querySelectorAll("[data-note]").forEach((chip) => {
  chip.addEventListener("click", () => {
    const sentence = chip.dataset.note;
    const current = planStory.value.trim();
    if (current.includes(sentence)) {
      planStory.value = current.replace(sentence, "").replace(/\s{2,}/g, " ").trim();
      chip.classList.remove("is-on");
      return;
    }
    planStory.value = current ? `${current} ${sentence}` : sentence;
    chip.classList.add("is-on");
  });
});

function offDay(name) {
  return [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 7;
}

function dateAt(value, add) {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + add);
  return date;
}

function nextOpen(name, value) {
  for (let day = 0; day < 8; day += 1) {
    const date = dateAt(value, day);
    if (date.getDay() !== offDay(name)) return date;
  }
  return dateAt(value, 0);
}

function formatDate(date) {
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function travelKm(card, area) {
  const local = Number(card.dataset.km);
  if (card.dataset.area === area) return local;
  return (areaGap[area]?.[card.dataset.area] ?? 30) + local * 0.2;
}

function recommendPartners(plan) {
  const service = plan.service || (keywords.find((item) => item.test.test(plan.note.toLowerCase())) || services[0]).name;
  return cards()
    .filter((card) => card.dataset.service === service && card.dataset.pets.split(" ").includes(plan.pet))
    .map((card) => {
      const open = nextOpen(card.dataset.name, plan.date);
      const sameDay = open.toISOString().slice(0, 10) === plan.date;
      return {
        card,
        service,
        km: travelKm(card, plan.area),
        sameDay,
        when: open
      };
    })
    .sort((a, b) => Number(b.sameDay) - Number(a.sameDay) || a.km - b.km || Number(a.card.dataset.price) - Number(b.card.dataset.price))
    .slice(0, 3);
}

function renderPlan(plan) {
  const picks = recommendPartners(plan);
  const lead = document.querySelector("#plan-lead");
  const box = document.querySelector("#plan-picks");
  box.replaceChildren();
  if (!picks.length) {
    lead.textContent = "Belum ada partner untuk kombinasi layanan dan jenis hewan ini. Coba layanan lain atau ubah jenis hewan.";
    return;
  }
  const ready = picks.filter((item) => item.sameDay);
  const prices = (ready.length ? ready : picks).map((item) => Number(item.card.dataset.price));
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  const range = low === high ? `Rp ${rupiah(low)}` : `Rp ${rupiah(low)} – Rp ${rupiah(high)}`;
  const serviceName = picks[0].service;
  lead.textContent = ready.length
    ? `${ready.length} partner ${serviceName} terdekat dari ${plan.area}, tersedia ${formatDate(dateAt(plan.date, 0))}. Kisaran harga ${range}.`
    : `Jadwal ${formatDate(dateAt(plan.date, 0))} penuh. Ini partner terdekat dengan tanggal kosong berikutnya. Kisaran harga ${range}.`;
  picks.forEach((item) => {
    const article = document.createElement("article");
    article.className = "pp-pick";
    const distance = item.km < 10 ? item.km.toLocaleString("id-ID", { maximumFractionDigits: 1 }) : Math.round(item.km).toLocaleString("id-ID");
    article.innerHTML = `
      <img src="${item.card.dataset.photo}" alt="" width="52" height="52" />
      <div>
        <h3>${item.card.dataset.name}</h3>
        <p>${item.card.dataset.area} · ${distance} km · ${item.sameDay ? "Tersedia tanggal ini" : `Tersedia ${formatDate(item.when)}`}</p>
        <strong>Rp ${rupiah(item.card.dataset.price)}</strong>
      </div>
      <button class="pp-btn pp-btn-fill" type="button">Pilih &amp; bayar</button>`;
    article.querySelector("button").addEventListener("click", () => {
      const booking = {
        name: item.card.dataset.name,
        photo: item.card.dataset.photo,
        area: item.card.dataset.area,
        service: item.service,
        price: Number(item.card.dataset.price),
        km: distance,
        date: item.when.toISOString().slice(0, 10),
        dateLabel: formatDate(item.when),
        pet: plan.pet,
        userArea: plan.area,
        note: plan.note
      };
      sessionStorage.setItem("sobatpaws-plan", JSON.stringify(booking));
      window.location.href = "paws-bayar.html";
    });
    box.appendChild(article);
  });
}

document.querySelector("#plan-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  renderPlan({
    area: data.get("lokasi"),
    date: data.get("tanggal"),
    pet: data.get("hewan"),
    service: data.get("kategori"),
    note: data.get("cerita") || ""
  });
});

document.querySelector("#open-join").addEventListener("click", () => {
  document.querySelector("#join-dialog").showModal();
});

document.querySelector("#join-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#join-success").hidden = false;
  event.currentTarget.querySelector("button[type=submit]").hidden = true;
});

let activeName = "";
let map;
let youMarker = null;
let silentMove = false;
let mapReady = false;
const markers = new Map();
const mapHere = document.querySelector("#map-here");

function priceIcon(card, on) {
  const n = Number(card.dataset.price);
  const short = n >= 1000 ? `${Math.round(n / 1000)}rb` : String(n);
  return L.divIcon({
    className: "pp-pin-icon",
    html: `<span class="pp-pin${on ? " is-on" : ""}">Rp${short}</span>`,
    iconSize: [68, 28],
    iconAnchor: [34, 28]
  });
}

function focusOrigin(zoom) {
  if (!map || !state.origin) return;
  silentMove = true;
  map.setView([state.origin.lat, state.origin.lng], zoom);
  mapHere.hidden = true;
  window.setTimeout(() => { silentMove = false; }, 500);
}

function paintMap() {
  if (!map) return;
  markers.forEach((marker) => marker.remove());
  markers.clear();
  cards().filter(match).forEach((card) => {
    const marker = L.marker([Number(card.dataset.lat), Number(card.dataset.lng)], {
      icon: priceIcon(card, card.dataset.name === activeName),
      title: card.dataset.name
    }).addTo(map);
    marker.bindPopup(`<strong>${card.dataset.name}</strong><br>${card.dataset.service} · ${card.dataset.area}`);
    marker.on("click", () => {
      activeName = card.dataset.name;
      if (card.hidden) {
        if (!state.expanded) {
          state.expanded = true;
          state.pageSize = previewLimit();
          pageView.value = String(state.pageSize);
        }
        const index = cards().filter(match).indexOf(card);
        if (index >= 0) state.page = Math.floor(index / state.pageSize) + 1;
      }
      apply();
      cards().find((item) => item.dataset.name === activeName)?.scrollIntoView({ block: "nearest" });
    });
    markers.set(card.dataset.name, marker);
  });
  if (youMarker) youMarker.remove();
  if (state.origin) {
    youMarker = L.marker([state.origin.lat, state.origin.lng], {
      icon: L.divIcon({
        className: "pp-you-icon",
        html: '<span class="pp-you"></span>',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      }),
      zIndexOffset: 800,
      title: "Lokasimu"
    }).addTo(map);
  }
  if (!mapReady && state.origin) {
    mapReady = true;
    focusOrigin(12);
  }
}

function initMap() {
  const el = document.querySelector("#partner-map");
  if (!el || !window.L) return;
  silentMove = true;
  map = L.map(el, { scrollWheelZoom: true }).setView([state.origin.lat, state.origin.lng], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  map.on("dragend", () => { if (!silentMove) mapHere.hidden = false; });
  map.on("zoomend", () => { if (!silentMove) mapHere.hidden = false; });
  mapReady = true;
  window.setTimeout(() => {
    map.invalidateSize();
    silentMove = false;
  }, 400);
  window.addEventListener("resize", () => {
    sizeMap();
    map.invalidateSize();
  });
}

const browse = document.querySelector(".pp-browse");
const mapToggle = document.querySelector("#map-toggle");

mapToggle.addEventListener("click", () => {
  state.mapOpen = !state.mapOpen;
  state.expanded = false;
  state.page = 1;
  browse.classList.toggle("is-folded", !state.mapOpen);
  browse.classList.toggle("is-open", state.mapOpen);
  mapToggle.textContent = state.mapOpen ? "Lipat peta" : "Tampilkan peta";
  mapToggle.setAttribute("aria-expanded", String(state.mapOpen));
  apply();
  if (state.mapOpen && map) window.setTimeout(() => map.invalidateSize(), 60);
});

mapHere.addEventListener("click", () => {
  if (!map) return;
  const center = map.getCenter();
  const box = map.getBounds();
  state.bounds = { north: box.getNorth(), south: box.getSouth(), east: box.getEast(), west: box.getWest() };
  state.area = "";
  document.querySelector("#search-area").value = "";
  state.origin = { lat: center.lat, lng: center.lng, label: "area peta ini" };
  document.querySelector("#origin-label").textContent = "Jarak dari area peta ini";
  state.sort = "near";
  document.querySelector("#sort-by").value = "near";
  state.expanded = false;
  state.page = 1;
  mapHere.hidden = true;
  apply();
});

document.querySelector("#use-location").addEventListener("click", () => {
  const label = document.querySelector("#origin-label");
  if (!navigator.geolocation) {
    label.textContent = "Peramban ini tidak membagikan lokasi. Pilih kota di pencarian.";
    return;
  }
  label.textContent = "Mencari lokasimu…";
  navigator.geolocation.getCurrentPosition((pos) => {
    state.area = "";
    state.bounds = null;
    document.querySelector("#search-area").value = "";
    state.origin = { lat: pos.coords.latitude, lng: pos.coords.longitude, label: "lokasimu" };
    label.textContent = "Jarak dari lokasimu";
    state.sort = "near";
    document.querySelector("#sort-by").value = "near";
    state.expanded = false;
    state.page = 1;
    apply();
    focusOrigin(13);
  }, () => {
    label.textContent = "Lokasi perangkat tidak tersedia. Pilih kota atau geser peta.";
  }, { enableHighAccuracy: false, timeout: 8000 });
});

initMap();
apply();

const tour = document.querySelector("[data-tour]");
if (tour) {
  const tourCards = [...tour.querySelectorAll(".pp-tour-card")];
  const stage = tour.querySelector(".pp-tour-stage");
  const rupiah = new Intl.NumberFormat("id-ID");
  let active = 2;
  let tourTimer;

  tourCards.forEach((card) => {
    const prices = cards()
      .filter((item) => item.dataset.service === card.dataset.service)
      .map((item) => Number(item.dataset.price))
      .filter((price) => price > 0);
    const slot = card.querySelector("[data-avg]");
    if (!slot || !prices.length) return;
    const average = Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length);
    slot.textContent = `Mulai dari Rp ${rupiah.format(average)}`;
  });

  const placeTour = () => {
    const count = tourCards.length;
    const narrow = stage.clientWidth < 760;
    const gap = narrow ? 136 : 196;
    const reach = narrow ? 1 : 2;
    tourCards.forEach((card, index) => {
      let diff = index - active;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;
      const distance = Math.abs(diff);
      const hidden = distance > reach;
      const scale = distance === 0 ? 1.12 : distance === 1 ? 0.9 : 0.78;
      const lift = distance === 0 ? -12 : 8;
      card.style.transform = `translateX(${diff * gap}px) translateY(${lift}px) scale(${scale})`;
      card.style.zIndex = String(20 - distance);
      card.style.opacity = hidden ? "0" : "1";
      card.style.pointerEvents = hidden ? "none" : "auto";
      card.classList.toggle("is-active", diff === 0);
      card.setAttribute("aria-hidden", String(diff !== 0));
    });
  };

  const moveTour = (step) => {
    active = (active + step + tourCards.length) % tourCards.length;
    placeTour();
  };

  const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startTour = () => {
    if (!motionOk) return;
    clearInterval(tourTimer);
    tourTimer = setInterval(() => moveTour(1), 3800);
  };
  const stopTour = () => clearInterval(tourTimer);

  tour.querySelector("[data-tour-prev]").addEventListener("click", () => {
    moveTour(-1);
    startTour();
  });
  tour.querySelector("[data-tour-next]").addEventListener("click", () => {
    moveTour(1);
    startTour();
  });
  document.querySelector("#tour-all").addEventListener("click", () => {
    setService("Semua");
    document.querySelector("#mitra").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  tourCards.forEach((card, index) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("[data-filter]") || index === active) return;
      active = index;
      placeTour();
      startTour();
    });
  });
  tour.addEventListener("mouseenter", stopTour);
  tour.addEventListener("mouseleave", startTour);
  tour.addEventListener("focusin", stopTour);
  tour.addEventListener("focusout", (event) => {
    if (!tour.contains(event.relatedTarget)) startTour();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopTour();
    else startTour();
  });
  placeTour();
  startTour();
  window.addEventListener("resize", placeTour);
}

const pathSteps = document.querySelector("#cara-kerja .path");
if (pathSteps && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealSteps = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    pathSteps.classList.add("is-ready");
    revealSteps.disconnect();
  }, { threshold: 0.35 });
  revealSteps.observe(pathSteps);
}
