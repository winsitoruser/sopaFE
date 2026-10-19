const pets = { anjing: "Anjing", kucing: "Kucing" };
const raw = sessionStorage.getItem("sobatpaws-plan");
const empty = document.querySelector("#pay-empty");
const layout = document.querySelector("#pay-layout");

if (!raw) {
  empty.hidden = false;
} else {
  const booking = JSON.parse(raw);
  layout.hidden = false;
  document.querySelector("#pay-photo").src = booking.photo;
  document.querySelector("#pay-photo").alt = booking.name;
  document.querySelector("#pay-name").textContent = booking.name;
  document.querySelector("#pay-service").textContent = booking.service;
  document.querySelector("#pay-user-area").textContent = booking.userArea;
  document.querySelector("#pay-area").textContent = booking.area;
  document.querySelector("#pay-km").textContent = `${booking.km} km`;
  document.querySelector("#pay-date").textContent = booking.dateLabel;
  document.querySelector("#pay-pet").textContent = pets[booking.pet] || booking.pet;
  document.querySelector("#pay-price").textContent = `Rp ${Number(booking.price).toLocaleString("id-ID")}`;
  if (booking.note) {
    const note = document.querySelector("#pay-note");
    note.hidden = false;
    note.textContent = `Pesan: ${booking.note}`;
  }
}

document.querySelector("#pay-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const booking = JSON.parse(sessionStorage.getItem("sobatpaws-plan") || "{}");
  const method = new FormData(event.currentTarget).get("metode");
  const success = document.querySelector("#pay-success");
  success.hidden = false;
  success.textContent = `Pembayaran ${method} untuk ${booking.name} tercatat di pratinjau ini. Tidak ada dana yang ditarik.`;
  document.querySelector("#pay-submit").hidden = true;
});
