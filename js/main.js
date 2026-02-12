import { appsConfig } from "./data.js";
import { openApp, closeApp } from "./ui.js";
import { updateClock } from "./utils.js";
import { runBootSequence } from "./animation.js";

// --- INITIALISATION ---
document.addEventListener("DOMContentLoaded", () => {
  if (typeof runBootSequence === "function") {
    runBootSequence();
  }
  initTheme();

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
  updateAllUI();
}

// --- GESTION VISUELLE MUSIQUE ---
function toggleMusicVisual() {
  let current = localStorage.getItem("music_visual");
  let newState = current === "on" ? "off" : "on";
  localStorage.setItem("music_visual", newState);
  updateAllUI();
}

// --- MISE À JOUR DE L'INTERFACE ---
function updateAllUI() {
  const themeState = getThemeState();
  const musicState = localStorage.getItem("music_visual");

  const gridBtn = document.querySelector('.wii-icon[data-id="theme"]');
  if (gridBtn) {
    const label = gridBtn.querySelector(".app-label");
    const iconContainer = gridBtn.querySelector(".icon-inner");
    if (label) label.innerText = themeState.title;
    if (iconContainer)
      iconContainer.innerHTML = `<i data-lucide="${themeState.icon}" width="40" height="40"></i>`;
  }

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
    if (document.body.classList.contains("dark-mode"))
      settingsThemeBtn.classList.add("active");
    else settingsThemeBtn.classList.remove("active");
  }

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

// --- GÉNÉRATION GRILLE ---
function initGrid() {
  const gridContainer = document.getElementById("app-grid");
  if (!gridContainer) return;

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

  document.querySelectorAll(".wii-icon").forEach(icon => {
    icon.addEventListener("click", () => {
      const id = icon.getAttribute("data-id");
      const app = appsConfig.find(a => a.id === id);

      if (app.action === "toggleTheme") {
        toggleThemeAndSave();
      } else {
        openApp(app);

        // C'est ici qu'on lance la tentative d'automatisation
        if (app.id === "veille") {
          setTimeout(loadVeilleRobust, 100);
        }

        if (app.id === "settings") {
          setTimeout(updateAllUI, 50);
        }
      }
    });
  });
}

// --- VEILLE ROBUSTE (Proxy AllOrigins + Parsing XML) ---
async function loadVeilleRobust() {
  const container = document.getElementById("veille-news-container");
  if (!container) return;

  // Loader
  container.innerHTML = `
      <div class="quantum-box" style="text-align:center; margin-top:20px;">
          <i data-lucide="loader-2" class="spin-icon" style="width:40px;height:40px; color:#8b5cf6;"></i>
          <p style="margin-top:10px;">Recherche de flux...</p>
      </div>`;
  if (window.lucide) window.lucide.createIcons();

  try {
    // Timeout court (2s max) pour ne pas faire attendre l'utilisateur
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    // URL RSS Google News
    const rssUrl =
      "https://news.google.com/rss/search?q=informatique+quantique&hl=fr&gl=FR&ceid=FR:fr";
    // On passe par AllOrigins pour éviter les erreurs CORS
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

    const response = await fetch(proxyUrl, { signal: controller.signal });
    const data = await response.json();

    if (!data.contents) throw new Error("Pas de contenu");

    // Parsing MANUEL du XML (plus fiable que rss2json)
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, "text/xml");
    const items = Array.from(xmlDoc.querySelectorAll("item")).slice(0, 5);

    if (items.length === 0) throw new Error("Flux vide");

    // Transformation en HTML
    const html = items
      .map(item => {
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;
        const pubDate = new Date(
          item.querySelector("pubDate").textContent,
        ).toLocaleDateString();
        const source = item.querySelector("source")
          ? item.querySelector("source").textContent
          : "Google News";

        return `
        <div class="news-card" style="background:rgba(255,255,255,0.05); padding:15px; border-radius:10px; margin-bottom:10px; border:1px solid rgba(255,255,255,0.1); text-align:left; transition: transform 0.2s;">
            <h4 style="margin:0 0 5px 0;">
                <a href="${link}" target="_blank" style="color:inherit; text-decoration:none; font-weight:bold;">${title}</a>
            </h4>
            <div style="font-size:0.8rem; opacity:0.7; margin-bottom:5px;">
                📅 ${pubDate} • <i>${source}</i>
            </div>
            <a href="${link}" target="_blank" style="color:#8b5cf6; font-size:0.85rem; text-decoration:none; font-weight:bold;">
                Lire l'article <i data-lucide="external-link" style="width:12px; vertical-align:middle;"></i>
            </a>
        </div>`;
      })
      .join("");

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  } catch (error) {
    console.warn("Mode Auto échoué, chargement du statique.", error);
    loadVeilleStatic(container); // On bascule sur le statique si pépin
  }
}

// Fonction de secours (Statique)
function loadVeilleStatic(container) {
  if (!container) return;
  const articles = [
    {
      title: "IBM Quantum Heron : Record de performance",
      link: "https://research.ibm.com/",
      date: "Récent",
      source: "IBM",
    },
    {
      title: "Alice & Bob : Vers le qubit parfait",
      link: "https://alice-bob.com/",
      date: "Récent",
      source: "French Tech",
    },
    {
      title: "Avancées majeures en crypto post-quantique",
      link: "https://www.nist.gov/",
      date: "Récent",
      source: "NIST",
    },
    {
      title: "Google réduit les erreurs quantiques",
      link: "https://blog.google/technology/ai/",
      date: "Récent",
      source: "Google",
    },
    {
      title: "Comprendre l'intrication quantique",
      link: "#",
      date: "Dossier",
      source: "Science",
    },
  ];

  container.innerHTML = articles
    .map(
      item => `
        <div class="news-card" style="background:rgba(255,255,255,0.05); padding:15px; border-radius:10px; margin-bottom:10px; border:1px solid rgba(255,255,255,0.1); text-align:left;">
            <h4 style="margin:0 0 5px 0;">
                <a href="${item.link}" target="_blank" style="color:inherit; text-decoration:none; font-weight:bold;">${item.title}</a>
            </h4>
            <div style="font-size:0.8rem; opacity:0.7; margin-bottom:5px;">📅 ${item.date} • <i>${item.source}</i></div>
            <a href="${item.link}" target="_blank" style="color:#8b5cf6; font-size:0.85rem; text-decoration:none;">Lire →</a>
        </div>
    `,
    )
    .join("");
  if (window.lucide) window.lucide.createIcons();
}

// --- LISTENERS GLOBAUX ---
function initGlobalListeners() {
  const backBtn = document.getElementById("back-btn");
  if (backBtn) backBtn.addEventListener("click", closeApp);

  const settingsBtn = document.getElementById("btn-settings");
  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      openApp({ id: "settings", title: "Configuration", color: "#64748b" });
      setTimeout(updateAllUI, 50);
    });
  }

  const appBody = document.getElementById("app-body");
  if (appBody) {
    appBody.addEventListener("click", e => {
      const stageCard = e.target.closest(".stage-card");
      if (stageCard) stageCard.classList.toggle("open");
      if (e.target.closest("#btn-toggle-theme")) toggleThemeAndSave();
      if (e.target.closest("#btn-toggle-music")) toggleMusicVisual();
    });

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
            throw new Error();
          }
        } catch (err) {
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
