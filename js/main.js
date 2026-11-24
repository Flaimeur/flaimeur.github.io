(() => {
  const root = document.documentElement;

  // --- Icônes ---
  if (window.lucide) window.lucide.createIcons();

  // --- Thème clair / sombre ---
  const themeBtn = document.getElementById("theme-toggle");
  const currentTheme = () =>
    root.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  themeBtn?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // --- Menu mobile ---
  const menuBtn = document.getElementById("menu-toggle");
  const links = document.getElementById("nav-links");
  const setMenu = (open) => {
    links.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  };
  menuBtn?.addEventListener("click", () => setMenu(!links.classList.contains("open")));
  links?.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });

  // --- Bordure de la barre au scroll ---
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Apparition au scroll + lien actif ---
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const navLinks = [...document.querySelectorAll(".nav-links a")];
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("section[id]").forEach((s) => spy.observe(s));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  }

  // --- Année du footer ---
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // --- Formulaire de contact (même backend qu'avant) ---
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";
    if (!form.checkValidity()) {
      status.textContent = "Merci de remplir tous les champs avec un email valide.";
      status.classList.add("err");
      return;
    }
    const btn = form.querySelector("button");
    btn.disabled = true;
    status.textContent = "Envoi en cours…";
    try {
      const res = await fetch("https://portfolio-backend-ncfv.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      if (!res.ok) throw new Error(res.status);
      status.textContent = "Message envoyé, merci ! Je te réponds vite.";
      status.classList.add("ok");
      form.reset();
    } catch (err) {
      status.textContent = "L'envoi a échoué. Réessaie ou contacte-moi sur LinkedIn.";
      status.classList.add("err");
    } finally {
      btn.disabled = false;
    }
  });
})();
