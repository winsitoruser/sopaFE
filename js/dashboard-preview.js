const $ = (sel, root = document) => root.querySelector(sel);
const app = $("#app");
const canvas = $("#canvas");
const pop = $("#pop");
const results = $("#results");
const search = $("#search");

const I = {
  home: '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>',
  cal: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>',
  check: '<path d="M8 11.5 10.5 14 16 8"/><rect x="4" y="4" width="16" height="16" rx="3"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19c.6-2.6 2.6-4 5.5-4s4.9 1.4 5.5 4"/><circle cx="17" cy="9" r="2.2"/><path d="M16.2 15c1.6.3 2.8 1.3 3.3 3"/>',
  scissors: '<circle cx="6" cy="7" r="2.2"/><circle cx="6" cy="17" r="2.2"/><path d="m8 8 12 8M8 16 20 8"/>',
  pos: '<path d="M6 7h12l-1 11H7L6 7z"/><path d="M9 7V5h6v2"/>',
  box: '<path d="M3 8l9-4 9 4-9 4-9-4z"/><path d="M3 8v8l9 4 9-4V8M12 12v8"/>',
  stock: '<path d="M4 7h16v12H4z"/><path d="M8 7V5h8v2M8 12h8"/>',
  clip: '<path d="M8 4h8v4H8zM6 8h12v12H6z"/><path d="M9 12h6M9 16h4"/>',
  bag: '<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
  truck: '<path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z"/><circle cx="7" cy="17.5" r="1.5"/><circle cx="17" cy="17.5" r="1.5"/>',
  tag: '<path d="M12 4h7v7l-8 8-7-7 8-8z"/><circle cx="16" cy="8" r="1"/>',
  back: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 1 1 0 12h-3"/>',
  user: '<circle cx="12" cy="8" r="3"/><path d="M5 19c1-3 3.2-4.5 7-4.5S18 16 19 19"/>',
  paw: '<path d="M8 8.5a1.6 1.6 0 1 1-1.7-1.4A1.6 1.6 0 0 1 8 8.5Zm4.2-1.6a1.5 1.5 0 1 1-1.4 2.4 1.5 1.5 0 0 1 1.4-2.4ZM16.5 8.5a1.6 1.6 0 1 1-1.6 1.6 1.6 1.6 0 0 1 1.6-1.6ZM12 11c1.8 0 3.2 1.6 2.8 3.3-.3 1.2-1.5 2.2-2.8 2.2s-2.5-1-2.8-2.2C8.8 12.6 10.2 11 12 11z"/>',
  bed: '<path d="M4 18V8M4 14h16v4M8 14v-2a3 3 0 0 1 3-3h6a2 2 0 0 1 2 2v3"/>',
  key: '<circle cx="8" cy="14" r="3"/><path d="M11 14h9l-2 2 2 2"/>',
  grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
  occ: '<path d="M4 19V9M10 19V5M16 19v-7M20 19H4"/>',
  hotel: '<path d="M4 20V6h16v14"/><path d="M8 10h2M14 10h2M8 14h2M14 14h2"/>',
  photo: '<rect x="4" y="6" width="16" height="12" rx="2"/><circle cx="9" cy="11" r="1.5"/><path d="m8 16 3-3 2 2 3-3 2 4"/>',
  invoice: '<path d="M7 3h10v18l-2-1.5L13 21l-2-1.5L9 21l-2-1.5V3z"/><path d="M9 8h6M9 12h6"/>',
  chart: '<path d="M4 19V5M4 19h16"/><path d="m7 14 4-4 3 2 5-6"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14h2"/>',
  bell: '<path d="M6 16V10a6 6 0 1 1 12 0v6l1.2 2H4.8L6 16z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v5l3 2"/>',
  list: '<path d="M8 7h12M8 12h12M8 17h12"/><circle cx="4.5" cy="7" r=".8" fill="currentColor"/><circle cx="4.5" cy="12" r=".8" fill="currentColor"/><circle cx="4.5" cy="17" r=".8" fill="currentColor"/>'
};

const svg = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name] || I.box}</svg>`;

const NAV = [
  { group: "Petshop", items: [
    ["dashboard", "Dashboard", "home"],
    ["booking", "Booking & Janji Temu", "cal"],
    ["antrean", "Antrean Layanan", "users"],
    ["layanan", "Layanan", "scissors"],
    ["produk", "Produk", "box"],
    ["stok", "Stok", "stock"],
    ["opname", "Stok Opname", "clip"],
    ["pesanan", "Pesanan", "bag"],
    ["kirim", "Pengiriman", "truck"],
    ["promo", "Promosi", "tag"],
    ["retur", "Retur & Komplain", "back"],
    ["pelanggan", "Pelanggan", "user"],
    ["pos", "POS & Kasir", "pos"]
  ]},
  { group: "Pet Hotel", items: [
    ["hotel", "Pet Hotel Dashboard", "paw"],
    ["kamar", "Inventory Kamar", "bed"],
    ["okupansi", "Occupancy", "occ"],
    ["hotel-order", "Pesanan Hotel", "hotel"],
    ["foto", "Foto Hotel", "photo"],
    ["invoice", "Tagihan / Invoice", "invoice"],
    ["laporan-hotel", "Laporan Hotel", "chart"],
    ["hotel-set", "Pengaturan Hotel", "gear"]
  ]},
  { group: "Manajemen", items: [
    ["user", "Manajemen User", "users"],
    ["karyawan", "Karyawan & Jadwal", "cal"],
    ["absensi", "Absensi", "check"]
  ]},
  { group: "Sistem", items: [
    ["dompet", "Dompet Sobatpaws", "wallet"],
    ["notif", "Notifikasi", "bell", "9"],
    ["pengaturan", "Pengaturan", "gear"]
  ]}
];

const flatNav = NAV.flatMap((g) => g.items.map(([id, label]) => ({ id, label, group: g.group })));

const bookings = [
  ["08.00", "APT/2332fa277fc9/20261021/0001", "Raka Nugroho", "Bimo", "Beagle", "Selesai", "Grooming dasar"],
  ["08.40", "APT/2332fa277fc9/20261021/0002", "Lala Kusuma", "Mochi", "Poodle", "Selesai", "Mandi herbal"],
  ["09.15", "APT/2332fa277fc9/20261021/0003", "Gita Laras", "Lumo", "Persia", "Selesai", "Kontrol kulit"],
  ["09.30", "APT/2332fa277fc9/20261021/0004", "Sari Wulandari", "Milo", "Golden Retriever", "Berlangsung", "Grooming lengkap"],
  ["10.15", "APT/2332fa277fc9/20261021/0005", "Bima Pratama", "Kiko", "Domestik", "Berlangsung", "Konsultasi"],
  ["11.00", "APT/2332fa277fc9/20261021/0006", "Andre Kunawan", "Creeper", "Kucing", "Berlangsung", "Mandi & Keringkan Dasar"],
  ["12.00", "APT/2332fa277fc9/20261021/0007", "Sui Sui", "Ucup", "Kucing", "Menunggu", "Pelatihan Kepatuhan Dasar"],
  ["13.00", "APT/2332fa277fc9/20261021/0008", "Intan Dewi", "Ciko", "Pomeranian", "Menunggu", "Vaksin"],
  ["14.00", "APT/2332fa277fc9/20261021/0009", "Dimas Arya", "Pipo", "Labrador", "Menginap", "Hotel check-out"],
  ["14.07", "APT/2332fa277fc9/20261021/0010", "ALIEF .", "Bubu", "Kucing", "Berlangsung", "Pelatihan Kepatuhan Dasar"],
  ["15.30", "APT/2332fa277fc9/20261021/0011", "Farah Anindya", "Nori", "British Shorthair", "Menginap", "Hotel 2 malam"],
  ["16.00", "APT/2332fa277fc9/20261021/0012", "Maudy Elysian", "Niko", "Shih Tzu", "Menunggu", "Grooming basic"]
];

const slices = [
  { name: "Petshop", amount: "Rp 18.500.000", share: 18500, color: "#0aa0c4" },
  { name: "Grooming", amount: "Rp 13.600.000", share: 13600, color: "#1b79d6" },
  { name: "Pet Hotel", amount: "Rp 10.200.000", share: 10200, color: "#11ac91" },
  { name: "Klinik", amount: "Rp 6.300.000", share: 6300, color: "#5b6cff" }
];

const shifts = [
  { name: "Suprapto -", role: "Grooming", events: [
    ["09:00", "10:00", "c1", "Grooming lengkap", "Milo"],
    ["11:00", "12:00", "c2", "Mandi & Keringkan", "Creeper"],
    ["15:00", "16:00", "c3", "Grooming basic", "Niko"]
  ]},
  { name: "Indah Yuhu", role: "Grooming", events: [
    ["08:40", "09:30", "c2", "Mandi herbal", "Mochi"],
    ["13:00", "14:00", "c1", "Vaksin", "Ciko"]
  ]},
  { name: "dr. Yoga", role: "Klinik", events: [
    ["09:15", "10:00", "c3", "Kontrol kulit", "Lumo"],
    ["10:15", "11:00", "c1", "Konsultasi", "Kiko"],
    ["14:07", "14:40", "c2", "Obedience", "Bubu"]
  ]}
];

const customers = [
  ["ALIEF .", "Bronze", "7×", "Rp 609.500"],
  ["disha syadiva", "Bronze", "1×", "Rp 40.000"],
  ["Andre Kunawan", "Bronze", "0×", "Rp 89.000"],
  ["Sui Sui", "Bronze", "1×", "Rp 35.000"],
  ["Maudy Elysian", "Silver", "2×", "Rp 180.000"],
  ["Thomas Seiei", "Bronze", "1×", "Rp 75.000"],
  ["John Doe", "Bronze", "0×", "Rp 0"]
];

let page = "dashboard";
let sched = "timeline";
let bookPage = 0;
const bookSize = 6;

const todayLabel = () => {
  const text = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const toast = (msg) => {
  const el = $("#toast");
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { el.hidden = true; }, 2400);
};

const badge = (status) => {
  const tone = /selesai/i.test(status) ? "done" : /menunggu|antrian/i.test(status) ? "wait" : /inap|check/i.test(status) ? "stay" : "";
  return `<span class="status ${tone}">${status}</span>`;
};

const hello = (title, lead, extra = "") => `
  <div class="head">
    <div>
      <p class="hello">Selamat datang kembali,</p>
      <h1>${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ""}
    </div>
    ${extra || `<button class="date-pill" type="button" data-pop="date">${svg("cal")} Hari Ini · ${todayLabel()}</button>`}
  </div>`;

const kpis = (items) => `<div class="kpi-grid">${items.map((k) => `
  <article class="kpi ${k.tone}">
    <div class="kpi-top"><span>${k.title}</span><span class="kpi-ico">${svg(k.icon)}</span></div>
    <div>
      ${k.kicker ? `<p class="kpi-kicker">${k.kicker}</p>` : ""}
      <p class="kpi-num">${k.value}</p>
      ${k.sub ? `<p class="kpi-sub">${k.sub}</p>` : ""}
    </div>
    <div><div class="kpi-line"></div><div class="kpi-foot">${k.foot}</div></div>
  </article>`).join("")}</div>`;

const table = (cols, rows, map, pager) => `
  <div class="table-wrap"><table>
    <thead><tr>${cols.map((c) => `<th>${c}</th>`).join("")}</tr></thead>
    <tbody>${rows.map((row) => `<tr>${map(row).map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>
  ${pager || ""}`;

const panel = (title, body, link) => `
  <section class="panel">
    <div class="panel-head"><h2>${title}</h2>${link || ""}</div>
    ${body}
  </section>`;

function chartSvg() {
  const vals = [6, 8, 5, 9, 11, 7, 10, 13, 9, 12, 15, 11, 14, 16, 12, 18, 14, 17, 19, 15, 20, 16, 18, 22, 17, 21, 19, 23, 20, 18];
  const end = new Date(2026, 9, 21);
  const days = vals.map((_, i) => {
    const d = new Date(end);
    d.setDate(end.getDate() - (vals.length - 1 - i));
    return `${d.getDate()} ${["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][d.getMonth()]}`;
  });
  const w = 680, h = 230, l = 28, r = 8, t = 12, b = 26;
  const iw = w - l - r, ih = h - t - b;
  const max = 24;
  const x = (i) => l + (i / (vals.length - 1)) * iw;
  const y = (v) => t + ih - (v / max) * ih;
  const line = vals.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(vals.length - 1).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`;
  const grids = [0, 6, 12, 18, 24].map((v) => `<line x1="${l}" x2="${w - r}" y1="${y(v)}" y2="${y(v)}" stroke="#e8eef3" stroke-dasharray="3 4"/>
    <text x="${l - 6}" y="${y(v) + 3}" text-anchor="end">${v}</text>`).join("");
  const labels = days.map((d, i) => (i % 5 === 0 || i === days.length - 1) ? `<text x="${x(i)}" y="${h - 6}" text-anchor="middle">${d}</text>` : "").join("");
  const dots = vals.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="2.4" fill="#fff" stroke="#3aa4d8" stroke-width="1.6"/>`).join("");
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Tren transaksi 30 hari terakhir">${grids}<path d="${area}" fill="rgba(58,164,216,.14)"/><path d="${line}" fill="none" stroke="#3aa4d8" stroke-width="2.2"/>${dots}${labels}</svg>`;
}

function donutSvg() {
  const total = slices.reduce((sum, part) => sum + part.share, 0);
  const circ = 2 * Math.PI * 46;
  let cursor = 0;
  const rings = slices.map((part) => {
    const len = (part.share / total) * circ;
    const ring = `<circle cx="60" cy="60" r="46" fill="none" stroke="${part.color}" stroke-width="14" stroke-dasharray="${len.toFixed(2)} ${(circ - len).toFixed(2)}" stroke-dashoffset="${(-cursor).toFixed(2)}" transform="rotate(-90 60 60)"/>`;
    cursor += len;
    return ring;
  }).join("");
  return `<svg viewBox="0 0 120 120" aria-label="Kontribusi pendapatan empat layanan">${rings}</svg>`;
}

function scheduleBlock() {
  const hours = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const start = 8 * 60, span = 10 * 60;
  const showNow = mins >= start && mins <= start + span;
  const left = ((mins - start) / span) * 100;
  const block = (a, b) => {
    const [ah, am] = a.split(":").map(Number);
    const [bh, bm] = b.split(":").map(Number);
    const s = ah * 60 + am, e = bh * 60 + bm;
    return `left:${((s - start) / span) * 100}%;width:${Math.max(((e - s) / span) * 100, 8)}%`;
  };
  if (sched === "daftar") {
    const rows = shifts.flatMap((staff) => staff.events.map((ev) => ({ staff, ev })));
    return `<div class="agenda">
      ${rows.map(({ staff, ev }) => `<article><span class="time-pill">${ev[0].slice(0, 5)}</span><div><strong>${ev[3]}</strong><span>${ev[4]} · ${staff.name}</span></div><span class="sub">${staff.role}</span></article>`).join("")}
    </div>`;
  }
  return `<div class="tl-label">RESOURCE / STAF</div>
    <div class="hours" style="margin-left:158px">${hours.map((h) => `<span>${h}:00</span>`).join("")}</div>
    ${shifts.map((staff) => `<div class="tl">
      <div class="tl-res"><strong>${staff.name}</strong><span>${staff.role}</span></div>
      <div class="lane">
        ${showNow ? `<div class="now" style="left:${left}%"><i>${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}</i></div>` : ""}
        ${staff.events.map((ev) => `<div class="ev ${ev[2]}" style="${block(ev[0], ev[1])}"><strong>${ev[3]}</strong>${ev[4]}</div>`).join("")}
      </div>
    </div>`).join("")}`;
}

function renderDashboard() {
  const start = bookPage * bookSize;
  const visible = bookings.slice(start, start + bookSize);
  const pages = Math.ceil(bookings.length / bookSize);
  const pct = (part) => Math.round(part.share / slices.reduce((sum, item) => sum + item.share, 0) * 100);
  return `
    ${hello("Pawpuff")}
    ${kpis([
      { tone: "g-cyan", title: "Transaksi Hari Ini", icon: "bag", kicker: "Semua layanan", value: "18", foot: "12 selesai · 6 berjalan" },
      { tone: "g-blue", title: "Booking Hari Ini", icon: "check", value: "12", sub: "8 Terkonfirmasi<br>4 Menunggu Konfirmasi", foot: "4 grooming · 3 klinik · 2 hotel · 3 produk" },
      { tone: "g-sky", title: "Antrean Aktif", icon: "users", value: "7", sub: "5 dalam antrean<br>4 terjadwal (belum check-in)", foot: "3 grooming · 2 klinik · 2 hotel" },
      { tone: "g-teal", title: "Pendapatan", icon: "wallet", value: "Rp 4.280.000", sub: "Petshop Rp 1.640.000<br>Grooming Rp 1.520.000<br>Hotel Rp 720.000 · Klinik Rp 400.000", foot: "30 hari: Rp 48.600.000" }
    ])}
    ${panel(`Tren Transaksi <span style="font-weight:600">(30 Hari Terakhir)</span>`, `
      <div class="legend"><i class="dot"></i> Semua transaksi · 438 dalam 30 hari</div>
      ${chartSvg()}
    `, `<span class="date-pill">30 Hari Terakhir</span>`)}
    ${panel("Kontribusi Pendapatan", `
      <div class="donut-row">
        <div class="donut">
          ${donutSvg()}
          <div class="donut-mid"><small>Total Pendapatan</small><strong>Rp 48,6 jt</strong></div>
        </div>
        <div class="donut-meta">
          <ul class="pie-list">
            ${slices.map((part) => `<li><i style="background:${part.color}"></i><div><strong>${part.name}</strong><span>${part.amount}</span></div><b>${pct(part)}%</b></li>`).join("")}
          </ul>
        </div>
      </div>
    `)}
    ${panel("Aktivitas Booking Terbaru", table(
      ["Waktu", "Kode Booking", "Pelanggan", "Hewan", "Status"],
      visible,
      (b) => [`<span class="time-pill">${b[0]}</span>`, `<span class="code">${b[1]}</span>`, `<span class="person">${b[2]}</span>`, `<span class="pet">${b[3]}<small>${b[4]}</small></span>`, badge(b[5])],
      `<div class="table-foot"><span>Menampilkan ${start + 1}–${start + visible.length} dari ${bookings.length} booking</span>
        <span class="pager"><button type="button" data-book="prev" ${bookPage === 0 ? "disabled" : ""} aria-label="Sebelumnya">‹</button> ${bookPage + 1} / ${pages} <button type="button" data-book="next" ${bookPage >= pages - 1 ? "disabled" : ""} aria-label="Berikutnya">›</button></span>
      </div>`
    ))}
    ${panel("Perlu Perhatian", `<div class="alert-list">
      <article><div><strong>Tagihan melewati jatuh tempo</strong><span>2 invoice · Rp 985.000</span></div>${badge("Menunggu")}</article>
      <article><div><strong>Stok menipis</strong><span>Pasir gumpal 5 L tersisa 2 · Vitamin kulit tersisa 4</span></div>${badge("Menunggu")}</article>
      <article><div><strong>Booking menunggu konfirmasi</strong><span>Ucup, Ciko, dan Niko belum dikonfirmasi</span></div>${badge("Menunggu")}</article>
      <article><div><strong>Check-out hotel hari ini</strong><span>Pipo · Standard 3 · 14.00</span></div>${badge("Menginap")}</article>
    </div>`)}
    ${panel(`Jadwal Hari Ini <span class="count-pill">${shifts.reduce((n, s) => n + s.events.length, 0)}</span>`, `
      <p class="sub">Jadwal pelayanan klinik, grooming, &amp; pet hotel</p>
      ${scheduleBlock()}
    `, `<div class="tools">
        <div class="seg" role="tablist">
          <button type="button" data-sched="timeline" class="${sched === "timeline" ? "is-on" : ""}">${svg("clock")} Timeline</button>
          <button type="button" data-sched="daftar" class="${sched === "daftar" ? "is-on" : ""}">${svg("list")} Daftar</button>
        </div>
      </div>`)}
    ${panel("Quick Actions", `
      <p class="sub">Akses cepat fitur operasional utama</p>
      <div class="qa">
        <div class="is-locked"><span class="mark g-blue">${svg("cal")}</span><span><strong>Buat Booking</strong><small>Jadwalkan booking &amp; janji temu baru</small></span></div>
        <div class="is-locked"><span class="mark g-teal">${svg("pos")}</span><span><strong>POS &amp; Kasir</strong><small>Buka transaksi kasir &amp; pembayaran</small></span></div>
        <div class="is-locked"><span class="mark g-sky">${svg("chart")}</span><span><strong>Laporan Harian</strong><small>Pantau ringkasan kas &amp; keuangan</small></span></div>
      </div>
      <p class="note">3 menu pintasan aktif · SobatPaws Clinic</p>
    `)}
  `;
}

const modules = {
  booking: {
    title: "Booking & Janji Temu",
    lead: "Jadwal booking Pawpuff untuk hari ini.",
    stats: [
      ["Booking hari ini", "3", "g-blue", "cal"],
      ["Berlangsung", "3", "g-cyan", "clock"],
      ["Terkonfirmasi", "0", "g-teal", "check"],
      ["Menunggu", "0", "g-violet", "bell"]
    ],
    body: () => table(["Waktu", "Kode", "Pelanggan", "Hewan", "Layanan", "Status"], bookings, (b) => [
      `<span class="time-pill">${b[0]}</span>`, `<span class="code">${b[1]}</span>`, `<span class="person">${b[2]}</span>`, `<span class="pet">${b[3]}<small>${b[4]}</small></span>`, b[6], badge(b[5])
    ])
  },
  antrean: {
    title: "Antrean Layanan",
    lead: "Antrean grooming yang sedang berjalan di Pawpuff.",
    stats: [
      ["Dalam antrean", "3", "g-sky", "users"],
      ["Belum check-in", "0", "g-blue", "cal"],
      ["Selesai hari ini", "0", "g-teal", "check"]
    ],
    body: () => `<div class="queue">${bookings.map((b, i) => `<article><div><strong>${b[3]}</strong><div class="sub">${b[6]} · ${b[2]}</div></div><div>${badge(b[5])}<div class="sub">#${i + 1} · ${b[0]}</div></div></article>`).join("")}</div>`
  },
  layanan: {
    title: "Layanan",
    lead: "Daftar layanan grooming dan pelatihan yang dijual Pawpuff.",
    stats: [["Layanan aktif", "6", "g-cyan", "scissors"], ["Kategori", "2", "g-blue", "tag"]],
    body: () => table(["Layanan", "Kategori", "Durasi", "Harga"], [
      ["Mandi & Keringkan Dasar", "Grooming", "60 mnt", "Rp 75.000"],
      ["Grooming basic", "Grooming", "75 mnt", "Rp 120.000"],
      ["Pelatihan Kepatuhan Dasar", "Training", "30 mnt", "Rp 150.000"],
      ["Potong kuku", "Grooming", "15 mnt", "Rp 25.000"]
    ], (r) => r.map((c, i) => i === 0 ? `<span class="person">${c}</span>` : c))
  },
  produk: {
    title: "Produk",
    lead: "Katalog produk petshop. Harga contoh untuk pratinjau.",
    stats: [["SKU aktif", "8", "g-cyan", "box"], ["Stok menipis", "1", "g-violet", "stock"]],
    body: () => `<div class="products">${[
      ["Whisko", "Rp 35.000"], ["Shampoo oatmeal", "Rp 85.000"], ["Snack dental", "Rp 42.000"], ["Pasir gumpal 5 L", "Rp 68.000"],
      ["Vitamin kulit", "Rp 120.000"], ["Kalung nama", "Rp 55.000"]
    ].map(([n, p]) => `<button type="button" data-demo="produk"><strong>${n}</strong><span>${p}</span></button>`).join("")}</div>`
  },
  stok: {
    title: "Stok",
    lead: "Posisi stok gudang Pawpuff.",
    stats: [["Item", "8", "g-blue", "stock"], ["Hampir habis", "1", "g-violet", "bell"]],
    body: () => table(["Produk", "SKU", "Tersedia", "Status"], [
      ["Whisko", "WSK-01", "24", "Aman"],
      ["Shampoo oatmeal", "SHP-02", "6", "Aman"],
      ["Pasir gumpal 5 L", "PSR-05", "2", "Menipis"],
      ["Vitamin kulit", "VTM-03", "11", "Aman"]
    ], (r) => r.map((c, i) => i === 3 ? badge(c === "Menipis" ? "Menunggu" : "Selesai") : c))
  },
  opname: {
    title: "Stok Opname",
    lead: "Hitung fisik belum dimulai hari ini.",
    stats: [["Draft", "0", "g-sky", "clip"], ["Selesai bulan ini", "1", "g-teal", "check"]],
    body: () => `<p class="empty">Belum ada sesi opname yang terbuka. Mulai hitung dari tombol di bawah.</p><button class="pay" type="button" data-demo="opname" style="max-width:240px">Mulai opname</button>`
  },
  pesanan: {
    title: "Pesanan",
    lead: "Transaksi petshop terbaru.",
    stats: [["Hari ini", "3", "g-cyan", "bag"], ["Nilai", "Rp 3.000", "g-teal", "wallet"]],
    body: () => table(["Waktu", "Pelanggan", "Item", "Total", "Status"], [
      ["11.20", "Andre Kunawan", "Whisko", "Rp 1.000", "Selesai"],
      ["13.05", "Sui Sui", "Snack dental", "Rp 1.000", "Selesai"],
      ["15.40", "ALIEF .", "Kalung nama", "Rp 1.000", "Selesai"]
    ], (r) => [r[0], `<span class="person">${r[1]}</span>`, r[2], r[3], badge(r[4])])
  },
  kirim: {
    title: "Pengiriman",
    lead: "Pengiriman pesanan ke pelanggan.",
    stats: [["Dalam jalan", "0", "g-blue", "truck"], ["Selesai", "1", "g-teal", "check"]],
    body: () => `<p class="empty">Tidak ada pengiriman yang sedang berjalan.</p>`
  },
  promo: {
    title: "Promosi",
    lead: "Voucher dan diskon yang aktif di kasir.",
    stats: [["Aktif", "1", "g-violet", "tag"], ["Terpakai", "0", "g-cyan", "bag"]],
    body: () => table(["Promo", "Tipe", "Periode", "Status"], [["Pawpuff10", "10% layanan", "Okt 2026", "Berlangsung"]], (r) => [r[0], r[1], r[2], badge(r[3])])
  },
  retur: {
    title: "Retur & Komplain",
    lead: "Pengembalian barang dan komplain pelanggan.",
    stats: [["Terbuka", "0", "g-sky", "back"], ["Selesai", "0", "g-teal", "check"]],
    body: () => `<p class="empty">Tidak ada retur atau komplain yang perlu ditindak.</p>`
  },
  pelanggan: { custom: true },
  pos: { custom: true },
  hotel: {
    title: "Pet Hotel Dashboard",
    lead: "Okupansi kamar dan tamu yang menginap.",
    stats: [
      ["Kamar terisi", "2", "g-cyan", "bed"],
      ["Kamar kosong", "4", "g-blue", "grid"],
      ["Check-in hari ini", "1", "g-teal", "check"],
      ["Check-out", "0", "g-violet", "cal"]
    ],
    body: () => table(["Kamar", "Tamu", "Hewan", "Status"], [
      ["Deluxe 1", "Farah", "Nori", "Menginap"],
      ["Standard 3", "Dimas", "Pipo", "Check-in"],
      ["Standard 1", "—", "—", "Kosong"]
    ], (r) => r.map((c, i) => i === 3 ? badge(c === "Kosong" ? "Selesai" : c) : c))
  },
  kamar: {
    title: "Inventory Kamar",
    lead: "Tipe dan jumlah kamar yang bisa dipesan.",
    stats: [["Tipe", "2", "g-blue", "bed"], ["Unit", "6", "g-cyan", "grid"]],
    body: () => table(["Tipe", "Unit", "Harga / malam", "Aktif"], [["Deluxe", "2", "Rp 180.000", "Ya"], ["Standard", "4", "Rp 120.000", "Ya"]], (r) => r)
  },
  okupansi: {
    title: "Occupancy",
    lead: "Tingkat keterisian kamar minggu ini.",
    stats: [["Hari ini", "33%", "g-sky", "occ"], ["Minggu ini", "28%", "g-blue", "chart"]],
    body: () => `<p class="empty">Grafik okupansi mengikuti data demo, bukan reservasi langsung.</p>`
  },
  "hotel-order": {
    title: "Pesanan Hotel",
    lead: "Reservasi menginap yang tercatat.",
    stats: [["Aktif", "2", "g-cyan", "hotel"], ["Besok", "0", "g-blue", "cal"]],
    body: () => table(["Kode", "Tamu", "Kamar", "Malam"], [["HTL-104", "Farah · Nori", "Deluxe 1", "2"], ["HTL-108", "Dimas · Pipo", "Standard 3", "1"]], (r) => r)
  },
  foto: {
    title: "Foto Hotel",
    lead: "Galeri kamar untuk halaman booking.",
    stats: [["Foto", "4", "g-violet", "photo"]],
    body: () => `<p class="empty">Unggah foto tidak tersedia di pratinjau ini.</p>`
  },
  invoice: {
    title: "Tagihan / Invoice",
    lead: "Tagihan hotel yang belum lunas.",
    stats: [["Terbuka", "1", "g-blue", "invoice"], ["Nominal", "Rp 180.000", "g-teal", "wallet"]],
    body: () => table(["No", "Tamu", "Jatuh tempo", "Total", "Status"], [["INV-HTL-014", "Farah", "22 Okt 2026", "Rp 180.000", "Menunggu"]], (r) => [r[0], r[1], r[2], r[3], badge(r[4])])
  },
  "laporan-hotel": {
    title: "Laporan Hotel",
    lead: "Ringkasan pendapatan penitipan.",
    stats: [["Bulan ini", "Rp 180.000", "g-teal", "chart"], ["Malam terjual", "3", "g-cyan", "bed"]],
    body: () => `<p class="empty">Laporan lengkap dibuka saat demo dengan data bisnis Anda.</p>`
  },
  "hotel-set": {
    title: "Pengaturan Hotel",
    lead: "Jam check-in, kebijakan, dan kapasitas.",
    body: () => `<div class="fields">
      <label>Check-in<input value="14:00" readonly></label>
      <label>Check-out<input value="12:00" readonly></label>
      <label>Deposit<input value="Rp 100.000" readonly></label>
      <label>Kebatalan<input value="H-1" readonly></label>
    </div>`
  },
  user: {
    title: "Manajemen User",
    lead: "Akses staf ke dashboard Pawpuff.",
    stats: [["Pengguna", "3", "g-blue", "users"], ["Owner", "1", "g-cyan", "user"]],
    body: () => table(["Nama", "Peran", "Status"], [["Alief Rahman Daipaha", "Owner", "Aktif"], ["Suprapto", "Groomer", "Aktif"], ["Indah Yuhu", "Kasir", "Aktif"]], (r) => [`<span class="person">${r[0]}</span>`, r[1], badge("Selesai")])
  },
  karyawan: {
    title: "Karyawan & Jadwal",
    lead: "Shift grooming hari ini.",
    stats: [["Masuk", "2", "g-teal", "check"], ["Jadwal", "3", "g-blue", "cal"]],
    body: () => table(["Staf", "Peran", "Shift"], [["Suprapto", "Grooming", "09.00–17.00"], ["Indah Yuhu", "Kasir", "10.00–18.00"]], (r) => r)
  },
  absensi: {
    title: "Absensi",
    lead: "Kehadiran staf hari ini.",
    stats: [["Hadir", "2", "g-teal", "check"], ["Izin", "0", "g-violet", "cal"]],
    body: () => table(["Staf", "Masuk", "Status"], [["Suprapto", "08.52", "Hadir"], ["Indah Yuhu", "09.58", "Hadir"]], (r) => [r[0], r[1], badge("Selesai")])
  },
  dompet: {
    title: "Dompet Sobatpaws",
    lead: "Ringkasan kas petshop hari ini.",
    stats: [
      ["Penjualan", "Rp 3.000", "g-teal", "wallet"],
      ["Transaksi", "3", "g-cyan", "bag"],
      ["Biaya", "Rp 0", "g-blue", "chart"]
    ],
    body: () => table(["Jam", "Sumber", "Nominal"], [["11.20", "Petshop", "Rp 1.000"], ["13.05", "Petshop", "Rp 1.000"], ["15.40", "Petshop", "Rp 1.000"]], (r) => r)
  },
  notif: {
    title: "Notifikasi",
    lead: "Pemberitahuan operasional Pawpuff.",
    body: () => `<div class="queue">${[
      ["Booking berlangsung", "Creeper · Mandi & Keringkan Dasar · 11.00"],
      ["Booking berlangsung", "Ucup · Pelatihan kepatuhan · 12.00"],
      ["Booking berlangsung", "Bubu · Pelatihan kepatuhan · 14.07"],
      ["Stok menipis", "Pasir gumpal 5 L tersisa 2"],
      ["Pengingat kas", "3 transaksi petshop hari ini"]
    ].map(([t, s]) => `<article><div><strong>${t}</strong><div class="sub">${s}</div></div></article>`).join("")}</div>`
  },
  pengaturan: {
    title: "Pengaturan",
    lead: "Profil outlet Pawpuff. Perubahan tidak disimpan di pratinjau.",
    body: () => `<div class="fields">
      <label>Nama outlet<input value="Pawpuff" readonly></label>
      <label>Jenis<input value="Petshop" readonly></label>
      <label>Zona waktu<input value="GMT+7" readonly></label>
      <label>Pemilik<input value="Alief Rahman Daipaha" readonly></label>
    </div>`
  }
};

const products = [
  ["Whisko", 1000], ["Snack dental", 1000], ["Kalung nama", 1000],
  ["Shampoo oatmeal", 85000], ["Mandi & Keringkan", 75000], ["Vitamin kulit", 120000]
];

function renderPos() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const lines = cart.length
    ? cart.map((i) => `<div class="cart-line"><span>${i.name} × ${i.qty}</span><strong>Rp ${ (i.price * i.qty).toLocaleString("id-ID") }</strong></div>`).join("")
    : `<p class="empty">Keranjang masih kosong.</p>`;
  return `
    ${hello("POS & Kasir", "Transaksi kasir Pawpuff. Pembayaran di pratinjau tidak memindahkan dana.")}
    <div class="pos">
      <section class="panel">
        <h2>Produk & layanan</h2>
        <div class="products" style="margin-top:14px">${products.map((p, i) => `<button type="button" data-add="${i}"><strong>${p[0]}</strong><span>Rp ${p[1].toLocaleString("id-ID")}</span></button>`).join("")}</div>
      </section>
      <section class="panel">
        <h2>Keranjang</h2>
        ${lines}
        <div class="cart-line"><span>Total</span><strong>Rp ${total.toLocaleString("id-ID")}</strong></div>
        <button class="pay" type="button" data-pay>Bayar</button>
      </section>
    </div>`;
}

function renderCrm() {
  const person = customers[crm];
  return `
    ${hello("Pelanggan & CRM", "Kelola direktori pelanggan, loyalty tier, dan riwayat pesanan.")}
    <div class="tabs"><button class="is-on" type="button">Daftar Pelanggan</button><button type="button" data-go="booking">Kunjungan Hewan</button></div>
    ${kpis([
      { tone: "g-cyan", title: "Total Pelanggan", icon: "user", value: "7", foot: "vs periode lalu ↑", go: "pelanggan" },
      { tone: "g-blue", title: "Pelanggan Aktif", icon: "users", value: "7", foot: "vs periode lalu ↑", go: "pelanggan" },
      { tone: "g-violet", title: "Baru bulan ini", icon: "paw", value: "2", foot: "Contoh demo", go: "pelanggan" }
    ])}
    <div class="layout-2">
      <section class="panel">
        <h2>Daftar Pelanggan</h2>
        <p class="sub">Diurutkan: Transaksi bulan ini</p>
        <div class="list">${customers.map((c, i) => `
          <button class="crm-row ${i === crm ? "is-on" : ""}" type="button" data-crm="${i}">
            <span class="idx">${i + 1}</span>
            <span class="mini">${c[0].slice(0, 1)}</span>
            <span><strong class="person">${c[0]}</strong></span>
            <span class="bronze">${c[1]}</span>
            <span class="money">${c[2]}<small>${c[3]}</small></span>
          </button>`).join("")}</div>
      </section>
      <section class="panel">
        <div class="row-between"><h2>${person[0]}</h2><span class="bronze">${person[1]}</span></div>
        <p class="sub">Kontak disembunyikan di pratinjau demo.</p>
        <div class="queue" style="margin-top:12px">
          <article><div><strong>Transaksi bulan ini</strong><div class="sub">${person[2]} · ${person[3]}</div></div></article>
          <article><div><strong>Hewan</strong><div class="sub">${person[0].includes("Andre") ? "Creeper · Kucing" : person[0].includes("Sui") ? "Ucup · Kucing" : "Bubu · Kucing"}</div></div></article>
        </div>
      </section>
    </div>`;
}

function renderPage() {
  if (page === "dashboard") return renderDashboard();
  if (page === "pos") return renderPos();
  if (page === "pelanggan") return renderCrm();
  const mod = modules[page];
  if (!mod) return hello("Menu", "Halaman ini bagian dari pratinjau.");
  return `
    ${hello(mod.title, mod.lead || "")}
    ${mod.stats ? kpis(mod.stats.map(([title, value, tone, icon]) => ({ title, value, tone, icon, foot: "Pratinjau", go: page }))) : ""}
    <section class="panel">${mod.body()}</section>`;
}

function paint() {
  canvas.innerHTML = `<div class="page">${renderPage()}</div>`;
  $("#nav").innerHTML = NAV.map((g) => `
    <div class="nav-label">${g.group}</div>
    ${g.items.map(([id, label, icon, badge]) => `
      <button class="nav-link ${id === "dashboard" ? "is-on" : "is-locked"}" type="button" ${id === "dashboard" ? "" : "disabled"} ${id === "dashboard" ? `data-go="${id}"` : ""}>
        ${svg(icon)}<span>${label}</span>${badge ? `<i class="nav-badge">${badge}</i>` : ""}
      </button>`).join("")}
  `).join("") + `
    <div class="help">
      <strong>Butuh bantuan?</strong>
      <p>Tim support SobatPaws siap membantu Anda.</p>
      <button type="button" data-pop="support">Hubungi Support</button>
    </div>`;
  const current = flatNav.find((n) => n.id === page);
  document.title = current ? `${current.label} · Sobatpaws` : "Sobatpaws";
}

function go(id) {
  if (id !== "dashboard") return;
  page = "dashboard";
  app.dataset.nav = "false";
  closePop();
  results.hidden = true;
  search.value = "";
  paint();
  canvas.scrollTop = 0;
}

function closePop() { pop.hidden = true; pop.innerHTML = ""; }

function openPop(kind) {
  const blocks = {
    zone: ["Zona waktu", `<button class="item" type="button" data-demo="tz"><strong>GMT+7 · Jakarta</strong><span>Zona bawaan outlet Pawpuff.</span></button>`],
    chat: ["Pesan", [
      ["Sui Sui", "Ucup sudah check-in untuk sesi 12.00"],
      ["Andre Kunawan", "Creeper sedang grooming"]
    ].map(([n, t]) => `<button class="item" type="button" data-demo="chat"><strong>${n}</strong><span>${t}</span></button>`).join("")],
    notif: ["Notifikasi", [
      ["Tagihan", "2 invoice melewati jatuh tempo · Rp 985.000"],
      ["Stok", "Pasir gumpal tersisa 2 · vitamin kulit tersisa 4"],
      ["Booking", "4 janji temu masih menunggu konfirmasi"],
      ["Hotel", "Pipo check-out hari ini pukul 14.00"],
      ["Kas", "Pendapatan hari ini Rp 4.280.000"]
    ].map(([n, t]) => `<div class="item"><strong>${n}</strong><span>${t}</span></div>`).join("")],
    profile: ["Akun", `<div class="item"><strong>Pawpuff</strong><span>Alief Rahman Daipaha · Owner</span></div>`],
    support: ["Support", `<button class="item" type="button" data-demo="support"><strong>Hubungi Support</strong><span>Tim SobatPaws membantu lewat sesi demo.</span></button>`],
    date: ["Periode", `<button class="item" type="button" data-demo="date"><strong>Hari ini</strong><span>${todayLabel()}</span></button>`]
  };
  const block = blocks[kind];
  if (!block) return;
  pop.innerHTML = `<header><strong>${block[0]}</strong><button class="icon-btn" type="button" data-close-pop aria-label="Tutup">×</button></header>${block[1]}`;
  pop.hidden = false;
}

function searchFor(q) {
  const query = q.trim().toLowerCase();
  if (!query) { results.hidden = true; return; }
  const menus = flatNav.filter((n) => n.label.toLowerCase().includes(query));
  const people = customers.filter((c) => c[0].toLowerCase().includes(query));
  const bits = [
    ...menus.map((n) => n.id === "dashboard"
      ? `<button type="button" data-go="${n.id}"><span>${n.label}</span><small>${n.group}</small></button>`
      : `<div class="locked-hit"><span>${n.label}</span><small>Terkunci</small></div>`),
    ...people.map((c) => `<div class="locked-hit"><span>${c[0]}</span><small>Pelanggan</small></div>`)
  ];
  results.innerHTML = bits.length ? bits.join("") : `<div class="empty-q">Tidak ada menu atau pelanggan “${q.replace(/[<>]/g, "")}”.</div>`;
  results.hidden = false;
}

canvas.addEventListener("click", (e) => {
  const goBtn = e.target.closest("[data-go]");
  if (goBtn) { go(goBtn.dataset.go); return; }
  const schedBtn = e.target.closest("[data-sched]");
  if (schedBtn) { sched = schedBtn.dataset.sched; paint(); return; }
  const bookBtn = e.target.closest("[data-book]");
  if (bookBtn && !bookBtn.disabled) {
    bookPage += bookBtn.dataset.book === "next" ? 1 : -1;
    paint();
    return;
  }
  const add = e.target.closest("[data-add]");
  if (add) {
    const [name, price] = products[Number(add.dataset.add)];
    const found = cart.find((i) => i.name === name);
    if (found) found.qty += 1;
    else cart.push({ name, price, qty: 1 });
    paint();
    return;
  }
  const crmBtn = e.target.closest("[data-crm]");
  if (crmBtn) { crm = Number(crmBtn.dataset.crm); paint(); return; }
  if (e.target.closest("[data-pay]")) {
    toast(cart.length ? "Pembayaran demo tidak disimpan dan tidak ada dana yang berpindah." : "Keranjang masih kosong.");
    cart = [];
    paint();
    return;
  }
  if (e.target.closest("[data-demo]")) toast("Ini pratinjau demo. Data tidak disimpan.");
  if (e.target.closest("[data-pop]")) openPop(e.target.closest("[data-pop]").dataset.pop);
});

$("#nav").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-go]");
  if (btn) go(btn.dataset.go);
  const popBtn = e.target.closest("[data-pop]");
  if (popBtn) openPop(popBtn.dataset.pop);
});

document.addEventListener("click", (e) => {
  const picked = e.target.closest("#results [data-go]");
  if (picked) { go(picked.dataset.go); return; }
  if (e.target.closest("#pop")) {
    if (e.target.closest("[data-close-pop]")) closePop();
    const dest = e.target.closest("[data-go]");
    if (dest) go(dest.dataset.go);
    if (e.target.closest("[data-demo]")) {
      toast("Ini pratinjau demo. Data tidak disimpan.");
      closePop();
    }
    return;
  }
  const trigger = e.target.closest("[data-pop]");
  if (trigger) {
    if (!e.target.closest("#canvas") && !e.target.closest("#nav")) openPop(trigger.dataset.pop);
    return;
  }
  closePop();
  if (!e.target.closest(".search")) results.hidden = true;
});

$("#fold").addEventListener("click", () => {
  if (window.innerWidth <= 900) app.dataset.nav = app.dataset.nav === "true" ? "false" : "true";
  else app.dataset.collapsed = app.dataset.collapsed === "true" ? "false" : "true";
});
$("[data-close-nav]").addEventListener("click", () => { app.dataset.nav = "false"; });

search.addEventListener("input", () => searchFor(search.value));
$("#search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const first = results.querySelector("[data-go]");
  if (first) go(first.dataset.go);
});
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    search.focus();
  }
  if (e.key === "Escape") { closePop(); results.hidden = true; app.dataset.nav = "false"; }
});

paint();
