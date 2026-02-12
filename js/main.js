import { appsConfig } from "./data.js";
import { openApp, closeApp } from "./ui.js";
import { updateClock } from "./utils.js";
import { runBootSequence } from "./animation.js";

// --- INITIALISATION ---
document.addEventListener("DOMContentLoaded", () => {
  runBootSequence();

  initTheme();
  // On initialise l'état visuel de la musique (OFF par défaut)
  if (localStorage.getItem("music_visual") === null) {
    localStorage.setItem("music_visual", "off");
  }
  initGrid();
  initClock();
  initGlobalListeners();
  if (window.lucide) window.lucide.createIcons();
});

function initClock() {
  updateClock("clock");
  setInterval(() => updateClock("clock"), 1000);
}

// --- GESTION DU THÈME ---
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
}

// Logique : Si Sombre actif -> On propose "Claire" (Soleil)
function getThemeState() {
  const isDark = document.body.classList.contains("dark-mode");
  return {
    title: isDark ? "Claire" : "Sombre",
    icon: isDark ? "sun" : "moon",
  };
}

function toggleThemeAndSave() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // On met à jour PARTOUT
  updateAllUI();
}

// --- GESTION VISUELLE MUSIQUE (Sans Audio) ---
function toggleMusicVisual() {
  let current = localStorage.getItem("music_visual");
  let newState = current === "on" ? "off" : "on";
  localStorage.setItem("music_visual", newState);
  updateAllUI();
}

// --- FONCTION MAÎTRESSE : MET À JOUR TOUTES LES ICÔNES ---
function updateAllUI() {
  const themeState = getThemeState();
  const musicState = localStorage.getItem("music_visual");

  // 1. Mise à jour du BOUTON GRILLE (id="theme")
  const gridBtn = document.querySelector('.wii-icon[data-id="theme"]');
  if (gridBtn) {
    const label = gridBtn.querySelector(".app-label");
    const iconContainer = gridBtn.querySelector(".icon-inner");

    if (label) label.innerText = themeState.title;
    if (iconContainer) {
      iconContainer.innerHTML = `<i data-lucide="${themeState.icon}" width="40" height="40"></i>`;
    }
  }

  // 2. Mise à jour FENÊTRE PARAMÈTRES - THÈME (id="btn-toggle-theme")
  const settingsThemeBtn = document.getElementById("btn-toggle-theme");
  if (settingsThemeBtn) {
    const label = settingsThemeBtn.querySelector(".setting-label");
    const icon = settingsThemeBtn.querySelector("i");

    if (label) label.innerText = "Mode " + themeState.title;

    if (icon) {
      const newIcon = document.createElement("i");
      newIcon.setAttribute("data-lucide", themeState.icon);
      newIcon.setAttribute("width", "40");
      newIcon.setAttribute("height", "40");
      icon.replaceWith(newIcon);
    }

    // Style Actif
    if (document.body.classList.contains("dark-mode")) {
      settingsThemeBtn.classList.add("active");
    } else {
      settingsThemeBtn.classList.remove("active");
    }
  }

  // 3. Mise à jour FENÊTRE PARAMÈTRES - MUSIQUE (id="btn-toggle-music")
  const settingsMusicBtn = document.getElementById("btn-toggle-music");
  if (settingsMusicBtn) {
    const label = settingsMusicBtn.querySelector(".setting-label");
    const icon = settingsMusicBtn.querySelector("i");

    const newIcon = document.createElement("i");
    newIcon.setAttribute("width", "40");
    newIcon.setAttribute("height", "40");

    if (musicState === "on") {
      label.innerText = "Musique ON";
      newIcon.setAttribute("data-lucide", "volume-2");
      settingsMusicBtn.classList.add("active");
    } else {
      label.innerText = "Musique OFF";
      newIcon.setAttribute("data-lucide", "volume-x");
      settingsMusicBtn.classList.remove("active");
    }

    if (icon) icon.replaceWith(newIcon);
  }

  if (window.lucide) window.lucide.createIcons();
}

// --- GÉNÉRATION DE LA GRILLE ---
function initGrid() {
  const gridContainer = document.getElementById("app-grid");

  gridContainer.innerHTML = appsConfig
    .map(app => {
      let displayTitle = app.title;
      let displayIcon = app.icon;

      if (app.id === "theme") {
        const themeState = getThemeState();
        displayTitle = themeState.title;
        displayIcon = themeState.icon;
      }

      return `
            <div class="wii-icon" data-id="${app.id}" style="--app-color: ${app.color}">
                <div class="icon-inner">
                    <i data-lucide="${displayIcon}" width="40" height="40"></i>
                </div>
                <span class="app-label">${displayTitle}</span>
                <div class="gloss"></div>
            </div>
        `;
    })
    .join("");

  // Clics Grille
  document.querySelectorAll(".wii-icon").forEach(icon => {
    icon.addEventListener("click", () => {
      const id = icon.getAttribute("data-id");
      const app = appsConfig.find(a => a.id === id);

      // Si l'action est de changer le thème, on le fait direct
      if (app.action === "toggleTheme") {
        toggleThemeAndSave();
      } else {
        openApp(app);
      }
    });
  });
}

// --- LISTENERS GLOBAUX ---
function initGlobalListeners() {
  const backBtn = document.getElementById("back-btn");
  if (backBtn) backBtn.addEventListener("click", closeApp);

  // (Code du bouton Settings supprimé ici car le bouton n'existe plus)

  const appBody = document.getElementById("app-body");
  if (appBody) {
    appBody.addEventListener("click", e => {
      // Accordéon Stages
      const stageCard = e.target.closest(".stage-card");
      if (stageCard) stageCard.classList.toggle("open");

      // Clics Paramètres (Si jamais on ouvre la fenêtre autrement)
      if (e.target.closest("#btn-toggle-theme")) toggleThemeAndSave();
      if (e.target.closest("#btn-toggle-music")) toggleMusicVisual();
    });

    // Formulaire Contact
    appBody.addEventListener("submit", async e => {
      if (e.target.id === "contact-form") {
        e.preventDefault();
        const btn = e.target.querySelector("button");
        const originalContent = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = `<span>Envoi...</span> <i data-lucide="loader-2" class="spin-icon"></i>`;
        if (window.lucide) window.lucide.createIcons();

        const formData = Object.fromEntries(new FormData(e.target).entries());

        try {
          const response = await fetch(
            "https://portfolio-backend-ncfv.onrender.com/send",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            },
          );

          if (response.ok) {
            btn.innerHTML = "Envoyé ! ✅";
            btn.style.background = "#16a34a";
            e.target.reset();
          } else {
            throw new Error("Erreur");
          }
        } catch (err) {
          console.error(err);
          btn.innerHTML = "Erreur ❌";
          btn.style.background = "#dc2626";
        }

        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = originalContent;
          btn.style.background = "";
          if (window.lucide) window.lucide.createIcons();
        }, 3000);
      }
    });
  }
}
