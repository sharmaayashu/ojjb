const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

menuToggle?.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  primaryNav?.classList.toggle("is-open", !isExpanded);
});

primaryNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
    primaryNav.classList.remove("is-open");
  });
});

const track = document.querySelector(".performance-track");
const currentSlide = document.querySelector("#current-slide");
const performanceCards = track ? Array.from(track.children) : [];
let activeSlide = 0;

function updateCarousel() {
  if (!track || !performanceCards.length || !currentSlide) return;
  const card = performanceCards[0];
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
  const offset = (card.getBoundingClientRect().width + gap) * activeSlide;
  track.style.transform = `translateX(-${offset}px)`;
  currentSlide.textContent = String(activeSlide + 1).padStart(2, "0");
}

document.querySelectorAll(".carousel-button").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = Number(button.getAttribute("data-direction"));
    activeSlide = (activeSlide + direction + performanceCards.length) % performanceCards.length;
    updateCarousel();
  });
});

window.addEventListener("resize", updateCarousel);
window.addEventListener("load", updateCarousel);
document.querySelector("#year").textContent = String(new Date().getFullYear());
