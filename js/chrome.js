const siteHeader = document.querySelector(".header");
const siteNav = document.getElementById("nav");
const siteNavToggle = document.getElementById("nav-toggle");

window.addEventListener("scroll", () => {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 8);
}, { passive: true });

siteNavToggle?.addEventListener("click", () => {
  const open = siteNav.classList.toggle("is-open");
  siteNavToggle.setAttribute("aria-expanded", String(open));
  siteNavToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
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
  if (siteNav?.classList.contains("is-open") && !event.target.closest(".nav") && !event.target.closest("#nav-toggle")) {
    siteNav.classList.remove("is-open");
    siteNavToggle?.setAttribute("aria-expanded", "false");
    siteNavToggle?.setAttribute("aria-label", "Buka menu");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".menu.is-open").forEach((item) => {
    item.classList.remove("is-open");
    item.querySelector(".menu-btn")?.setAttribute("aria-expanded", "false");
  });
  siteNav?.classList.remove("is-open");
  siteNavToggle?.setAttribute("aria-expanded", "false");
  siteNavToggle?.setAttribute("aria-label", "Buka menu");
});

siteNav?.addEventListener("click", (event) => {
  if (event.target.closest(".menu-btn")) return;
  if (event.target.closest("a, button")) {
    siteNav.classList.remove("is-open");
    siteNavToggle?.setAttribute("aria-expanded", "false");
    siteNavToggle?.setAttribute("aria-label", "Buka menu");
  }
});

const storeDialog = document.getElementById("store-dialog");

document.querySelectorAll("[data-download]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".menu.is-open").forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector(".menu-btn")?.setAttribute("aria-expanded", "false");
    });
    storeDialog?.showModal();
  });
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog")?.close());
});

storeDialog?.addEventListener("click", (event) => {
  if (event.target === storeDialog) storeDialog.close();
});
