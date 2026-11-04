document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("full-menu");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    if (!menu || !toggle) return;
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    menu.classList.toggle("open", open);
  };

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });
  }

  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
});
