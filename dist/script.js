const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const floatingCta = document.querySelector(".floating-cta");

const syncScrollState = () => {
  const scrolled = window.scrollY > 24;
  header?.classList.toggle("is-scrolled", scrolled);
  floatingCta?.classList.toggle("is-visible", window.scrollY > 520);
};

syncScrollState();
window.addEventListener("scroll", syncScrollState, { passive: true });

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
  mobileMenu?.classList.toggle("is-open", !open);
  document.body.classList.toggle("menu-open", !open);
  header?.classList.add("is-scrolled");
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    mobileMenu?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const explorer = document.querySelector("[data-explorer]");
const explorerImage = explorer?.querySelector("[data-explorer-image]");
const explorerVisual = explorer?.querySelector(".car-visual");
const explorerTitle = explorer?.querySelector("[data-explorer-title]");
const explorerKicker = explorer?.querySelector("[data-explorer-kicker]");

explorer?.querySelectorAll(".car-option").forEach((option) => {
  option.addEventListener("click", () => {
    explorer.querySelectorAll(".car-option").forEach((item) => {
      const selected = item === option;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
    });

    explorerVisual?.classList.add("is-changing");
    window.setTimeout(() => {
      if (explorerImage) {
        explorerImage.src = option.dataset.image || explorerImage.src;
        explorerImage.alt = `Carro em showroom, representação da categoria ${option.dataset.type}`;
      }
      if (explorerTitle) explorerTitle.textContent = option.dataset.type || "";
      if (explorerKicker) explorerKicker.textContent = option.dataset.kicker || "";
      explorerVisual?.classList.remove("is-changing");
    }, 220);
  });
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
