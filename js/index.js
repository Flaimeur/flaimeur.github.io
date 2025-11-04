// index.js - Version Modulaire et Optimisée

// --------------------------------------------------------
// --- 1. Variables Globales & Initialisation de l'Heure ---
// --------------------------------------------------------

// Bloque les clics pendant l'animation
let isAnimating = false;

// Met à jour l'heure dans le titre du terminal
function updateTitleTime() {
  let now = new Date();
  let formattedTime = now.toTimeString().split(" ")[0].slice(0, 5); // Format HH:MM
  let titleElement = document.getElementById("terminal-title");

  if (titleElement) {
    titleElement.textContent = `Flaimeur -- ${formattedTime}`;
  }
}
document.addEventListener("DOMContentLoaded", updateTitleTime);
setInterval(updateTitleTime, 60000); // Mise à jour toutes les minutes

// Affiche l'heure de connexion (content)
function updateLastLogin() {
  let now = new Date();
  let options = { weekday: "short", month: "short", day: "2-digit" };
  let formattedDate = now.toLocaleDateString("en-US", options);
  let formattedTime = now.toTimeString().split(" ")[0];
  document.getElementById(
    "last-login"
  ).textContent = `Last login: ${formattedDate} ${formattedTime} on console`;
}
document.addEventListener("DOMContentLoaded", updateLastLogin);

// ----------------------------------------------
// --- 2. Logique Terminal : Typewriter & Clics ---
// ----------------------------------------------

// Dictionnaire des contenus pour chaque commande
const CONTENT_MAP = {
  Terminal: " ",
  Profil: " cd Profil\nPseudo: Flaimeur\nAge: 19 ans\nDéveloppeur Web passionné !",
  Tableau: " open tableau de synthèse ",
  Stages:
    " cd Stages\nStage 5: Reenbow -  Stagiaire\n\nStage 4: MINUTE PHONE -  Stagiaire\n\nStage 3: Boomker Concept Production - Stagiaire\n\nStage 2: Deezer - Stagiaire\n\nStage 1: Deezer - Stagiaire",
  Projets:
    " cd Projets\nProjet 1: Chatbex\nchatbex est une plateforme de communication conçue pour créer des communautés en ligne.\nElle permet aux utilisateurs de discuter en temps réel via des messages texte, des appels vocaux et vidéo.\n\nProjet 2: Serveur minecraft\nJ’ai conçu et administré un serveur Minecraft, en gérant l’hébergement, la configuration des plugins/mods et l’optimisation des performances. Ce projet m’a permis de développer des compétences en gestion de serveurs, en scripting et en administration de communauté.",
  Veille: " open veille technologique",
  Contact: " open formulaire",
  Competence:
    " cd Compétence\nDESIGNE :\nFigma\n\nFRONT-END :\nHTML\nCSS\nJavaScript\n\nBACK-END :\nPHP\nPython",
  cv: " open cv",
};

/**
 * Affiche le contenu dans le terminal avec l'effet machine à écrire
 * @param {string} section - La clé de la commande (ex: "Profil", "Veille").
 */
function showContent(section) {
  if (isAnimating) return;

  isAnimating = true;
  let output = document.getElementById("terminal-output");
  let commandLine = `Flaimeur@Host-001 ~ % `;
  let text = commandLine + (CONTENT_MAP[section] || "Commande non reconnue.");

  output.innerHTML = "";
  typeText(output, text, 0, () => {
    setTimeout(() => {
      // Ouvre les fenêtres après l'animation
      if (section === "Veille") openVeilleApp();
      if (section === "Contact") openFormulaire();
      if (section === "Tableau") openTableau();

      isAnimating = false; // Débloque les clics
    }, 300);
  });
}

// Effet "machine à écrire" avec blocage temporaire
function typeText(element, text, index, callback) {
  if (index < text.length) {
    element.innerHTML += text.charAt(index) === "\n" ? "<br>" : text.charAt(index);
    setTimeout(() => typeText(element, text, index + 1, callback), 15); // Vitesse de frappe
  } else if (callback) {
    callback();
  }
}

// -----------------------------------------------------
// --- 3. Logique Modale Générique (Ouverture, Drag, Close) ---
// -----------------------------------------------------

/**
 * Ouvre une fenêtre modale de manière responsive.
 */
function openWindow(elementId, defaultWidth, defaultHeight) {
  const win = document.getElementById(elementId);
  win.style.display = "block";
  win.style.position = window.innerWidth <= 600 ? "fixed" : "absolute";
  win.style.zIndex = "1000";
  // Responsive : Plein écran sur mobile
  if (window.innerWidth <= 600) {
    win.style.left = "5vw";
    win.style.top = "10vh";
    win.style.width = "90vw";
    win.style.height = "70vh";
  } else {
    // Desktop : Position aléatoire dans les limites
    win.style.width = defaultWidth + "px";
    win.style.height = defaultHeight + "px";
    win.style.left = Math.random() * (window.innerWidth - defaultWidth) + "px";
    win.style.top = Math.random() * (window.innerHeight - defaultHeight) + "px";
  }
}

// Fonctions spécifiques appelant la fonction générique
function openVeilleApp() {
  openWindow("veilleTechnologique", 800, 600);
}

function openFormulaire() {
  openWindow("formulaire", 800, 350);
}

function openTableau() {
  openWindow("tableau", 1200, 700);
}

/**
 * Active le drag & drop (souris et tactile) sur une fenêtre modale.
 */
function makeDraggable(elementId, headerSelector) {
  const win = document.getElementById(elementId);
  const header = win.querySelector(headerSelector);
  if (!header) return; // Sécurité

  let isDragging = false;
  let offsetX, offsetY;

  function onDragStart(e) {
    // Si la fenêtre n'est pas visible ou est en mode responsive, on ne drague pas (ou gestion différente si besoin)
    if (window.innerWidth <= 600) return;

    isDragging = true;
    const touch = e.touches ? e.touches[0] : e;
    const rect = win.getBoundingClientRect();
    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;
    win.style.zIndex = "1100"; // Passer au-dessus lors du drag
    e.preventDefault();
  }

  function onDragMove(e) {
    if (!isDragging) return;
    const touch = e.touches ? e.touches[0] : e;
    let newX = touch.clientX - offsetX;
    let newY = touch.clientY - offsetY;

    const maxX = window.innerWidth - win.offsetWidth;
    const maxY = window.innerHeight - win.offsetHeight;

    // Bloquer la fenêtre aux bords du navigateur
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    win.style.left = newX + "px";
    win.style.top = newY + "px";
    e.preventDefault();
  }

  function onDragEnd() {
    isDragging = false;
  }

  header.addEventListener("mousedown", onDragStart);
  header.addEventListener("touchstart", onDragStart, { passive: false });
  document.addEventListener("mousemove", onDragMove);
  document.addEventListener("touchmove", onDragMove, { passive: false });
  document.addEventListener("mouseup", onDragEnd);
  document.addEventListener("touchend", onDragEnd);
}

/**
 * Configure le bouton rouge pour fermer une fenêtre.
 */
function setupCloseButton(elementId) {
  const win = document.getElementById(elementId);
  const redBtn = win ? win.querySelector(".button.red") : null;
  if (redBtn) {
    redBtn.addEventListener("click", () => {
      win.style.display = "none";
    });
  }
}

// -------------------------------------------------------------------
// --- 4. Fonctionnalités Spécifiques (Fullscreen, Discord, Souris) ---
// -------------------------------------------------------------------

// Gestion du bouton Fullscreen (Vert)
document.addEventListener("DOMContentLoaded", () => {
  const greenButton = document.querySelector(".button.green");
  const terminal = document.querySelector(".terminal");

  greenButton.addEventListener("click", () => {
    if (terminal.classList.contains("fullscreen")) {
      terminal.style.transform = "scale(1)";
      setTimeout(() => {
        terminal.classList.remove("fullscreen");
        terminal.classList.remove("large-text");
        terminal.style.opacity = "1";
        terminal.style.width = "";
        terminal.style.height = "";
      }, 300);
    } else {
      terminal.classList.add("fullscreen");
      terminal.classList.add("large-text");
      terminal.style.opacity = "1";
      terminal.style.width = "100vw";
      terminal.style.height = "100vh";
      terminal.style.transform = "scale(1.05)";
      setTimeout(() => {
        terminal.style.transform = "scale(1)";
      }, 300);
    }
  });
});

// Gestion du bouton Réduire (Jaune)
document.addEventListener("DOMContentLoaded", () => {
  const yellowButton = document.querySelector(".button.yellow");
  const terminal = document.querySelector(".terminal");

  yellowButton.addEventListener("click", () => {
    if (!terminal.classList.contains("minimized")) {
      terminal.classList.add("minimized");
      terminal.style.transition = "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";
      terminal.style.transform = "scale(0.7)";
      terminal.style.opacity = "0.6";
    } else {
      terminal.classList.remove("minimized");
      terminal.style.transition = "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";
      terminal.style.transform = "scale(1)";
      terminal.style.opacity = "1";
    }
  });
});

// Gestion du bouton Quitter (Rouge)
document.addEventListener("DOMContentLoaded", () => {
  const redButton = document.querySelector(
    ".button.red:not(#veilleTechnologique .button.red):not(#formulaire .button.red):not(#tableau .button.red)"
  );

  redButton.addEventListener("click", () => {
    document.body.innerHTML = "";
    const fullscreenDiv = document.createElement("div");
    fullscreenDiv.style.cssText =
      "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: black; z-index: 9999;";
    document.body.appendChild(fullscreenDiv);

    const sound = new Audio("asset/error.mp3");
    sound
      .play()
      .then(() => {
        sound.onended = () => {
          location.reload();
        };
      })
      .catch((error) => {
        console.error("La lecture du son a été bloquée par le navigateur :", error);
        location.reload(); // Recharge même si le son est bloqué
      });

    // Tente de passer en mode plein écran
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  });
});

// Affichage de la pop-up au chargement
function showPopup() {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = "block";
    setTimeout(() => {
      popup.style.display = "none";
    }, 10000);
  }
}
window.onload = showPopup;

// Détection de la souris pour la bottom bar
document.addEventListener("mousemove", function (event) {
  const bottomBar = document.querySelector(".bottom-bar");
  if (!bottomBar) return;

  let threshold = document.fullscreenElement ? 150 : 80;

  if (window.innerHeight - event.clientY < threshold) {
    bottomBar.style.bottom = "20px";
    bottomBar.style.opacity = "1";
    bottomBar.style.transform = "translateX(-50%) scale(1)";
  } else {
    bottomBar.style.bottom = "-70px";
    bottomBar.style.opacity = "0.5";
    bottomBar.style.transform = "translateX(-50%) scale(0.9)";
  }
});

// Fermeture des fenêtres au défilement interne pour Veille et Formulaire (empêche le scroll page)
function setupScrollBlocking(elementClass) {
  document.addEventListener("DOMContentLoaded", () => {
    const element = document.querySelector(elementClass);
    if (element) {
      element.addEventListener("wheel", (event) => {
        const scrollContent = element.querySelector(".scroll-content");
        if (scrollContent && scrollContent.scrollHeight > scrollContent.clientHeight) {
          scrollContent.scrollTop += event.deltaY;
          event.preventDefault();
        }
      });
    }
  });
}
setupScrollBlocking(".veilletechnologique");
setupScrollBlocking(".formulaire");
setupScrollBlocking(".tableau");

// Interaction avec le formulaire Discord
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("discordForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nom = form.nom.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!nom || !email || !message) {
      alert("Merci de remplir tous les champs !");
      return;
    }

    fetch("https://portfolio-backend-ncfv.onrender.com/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, email, message }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur serveur.");
        alert("✅ Message envoyé !");
        form.reset();
      })
      .catch((err) => {
        console.error("Erreur :", err);
        alert("❌ Une erreur est survenue.");
      });
  });
});

// ---------------------------------------------------
// --- 5. Initialisation Modulaire & Blocage Desktop ---
// ---------------------------------------------------

// Détecter si c’est un appareil mobile
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

document.addEventListener("DOMContentLoaded", () => {
  // A. Initialisation des fenêtres modales
  setupCloseButton("veilleTechnologique");
  setupCloseButton("formulaire");
  setupCloseButton("tableau");

  makeDraggable("veilleTechnologique", ".header2");
  makeDraggable("formulaire", ".header3");
  makeDraggable("tableau", ".header4");

  // B. Association des boutons de la barre d'applications à showContent
  // Cette logique remplace les anciens blocs app3, app4, app5 dupliqués.
  document.querySelector(".app3")?.addEventListener("click", () => showContent("Veille"));
  document.querySelector(".app4")?.addEventListener("click", () => showContent("Contact"));
  document.querySelector(".app5")?.addEventListener("click", () => showContent("Tableau"));

  // C. Logique de blocage d'inspection (uniquement sur desktop)
  if (!isMobileDevice()) {
    // Bloque clique droit
    document.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });

    // Bloque les touches sensibles (F12, Ctrl+Shift+I/J/U, Enregistrer, Copier, Coller, Couper)
    document.addEventListener("keydown", function (event) {
      if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && event.key === "I") ||
        (event.ctrlKey && event.shiftKey && event.key === "J") ||
        (event.ctrlKey && event.key === "U") ||
        (event.ctrlKey && event.key === "S") ||
        (event.ctrlKey && event.key === "C") ||
        (event.ctrlKey && event.key === "V") ||
        (event.ctrlKey && event.key === "X")
      ) {
        event.preventDefault();
      }
    });

    // Détection de redimensionnement de la fenêtre (potentiel devtools)
    setInterval(function () {
      if (
        window.outerWidth - window.innerWidth > 200 ||
        window.outerHeight - window.innerHeight > 200
      ) {
        document.body.innerHTML = "Inspection bloquée !";
      }
    }, 1000);

    // Blocage par console
    (function () {
      function detectDevTools() {
        console.log("%c ", "font-size: 1px;");
        console.log("%c Attention : Debugging détecté !", "color: red; font-size: 20px;");
      }
      detectDevTools();
    })();

    // Boucle de debugger et de nettoyage de console
    setInterval(() => {
      console.clear();
      console.log("Inspection bloquée !");
    }, 100);

    setInterval(() => {
      (function () {
        debugger;
      })();
    }, 50);

    Object.defineProperty(console, "_commandLineAPI", {
      get: function () {
        throw new Error("Accès interdit !");
      },
    });

    setInterval(() => {
      console.clear();
      console.log("%c Salut tu fais quoi ici ?", "color: red; font-size: 50px;");
    }, 100);
  }
});
