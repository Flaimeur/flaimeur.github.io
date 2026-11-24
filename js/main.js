(() => {
  const root = document.documentElement;

  // Thème clair / sombre
  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const current = root.dataset.theme ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Année
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Formulaire de contact
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "";
    if (!form.checkValidity()) {
      status.textContent = "Il manque un champ, ou l'email n'est pas valide.";
      status.classList.add("err");
      return;
    }
    const btn = form.querySelector("button");
    btn.disabled = true;
    status.textContent = "Envoi…";
    try {
      const res = await fetch("https://portfolio-backend-ncfv.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      if (!res.ok) throw new Error(res.status);
      status.textContent = "Message envoyé, merci.";
      form.reset();
    } catch (err) {
      status.textContent = "Ça n'est pas parti. Passe par LinkedIn en attendant.";
      status.classList.add("err");
    } finally {
      btn.disabled = false;
    }
  });
})();
