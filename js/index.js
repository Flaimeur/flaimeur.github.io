///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Bloque les clics pendant l'animation
let isAnimating = false; 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//heur titre
function updateTitleTime() {
  let now = new Date();
  let formattedTime = now.toTimeString().split(" ")[0].slice(0, 5); // Format HH:MM
  let titleElement = document.getElementById("terminal-title");

  if (titleElement) {
    titleElement.textContent = `Lachkar -- ${formattedTime}`;
  }
}

document.addEventListener("DOMContentLoaded", updateTitleTime);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Affiche l'heure de connexion (content)
function updateLastLogin() {
  let now = new Date();
  let options = { weekday: "short", month: "short", day: "2-digit" };
  let formattedDate = now.toLocaleDateString("en-US", options);
  let formattedTime = now.toTimeString().split(" ")[0];
  document.getElementById("last-login").textContent =
    `Last login: ${formattedDate} ${formattedTime} on console`;
}

document.addEventListener("DOMContentLoaded", updateLastLogin);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// click
function showContent(section) {
  if (isAnimating) return; // Empêche un clic si l'animation n'est pas finie

  isAnimating = true; // Active le blocage
  let output = document.getElementById("terminal-output");

  // Textes affichés pour chaque commande
  let content = {
    Terminal: " ",
    Profil: " cd Profil\nNom: Lachkar\nPrenom: Bilal\nAge: 19 ans\nClasse: BTS SIO option SLAM\nDéveloppeur Web passionné !",
    Competence: " cd Compétence\nDESIGNE :\nFigma\n\nFRONT-END :\nHTML\nCSS\nJavaScript\n\nBACK-END :\nPHP\nPython",
    Stages: " cd Stages\nStage 4: MINUTE PHONE -  Stagiaire\n\nStage 3: Boomker Concept Production - Stagiaire\n\nStage 2: Deezer - Stagiaire\n\nStage 1: Deezer - Stagiaire",
    Projets: " cd Projets\nProjet 1: Chatbex\nchatbex est une plateforme de communication conçue pour créer des communautés en ligne.\nElle permet aux utilisateurs de discuter en temps réel via des messages texte, des appels vocaux et vidéo.\n\nProjet 2: Serveur minecraft\nJ’ai conçu et administré un serveur Minecraft, en gérant l’hébergement, la configuration des plugins/mods et l’optimisation des performances. Ce projet m’a permis de développer des compétences en gestion de serveurs, en scripting et en administration de communauté.",
    Veille: " open veille technologique", // Affiche juste la commande
    Contact: " cd Contact\nEmail: flaimeur@gmail.com\nGitHub: github.com/Flaimeur",
  };

  let commandLine = `lachkar@Host-001 ~ % `; // Affiche la commande
  let text = commandLine + (content[section] || "Commande non reconnue.");

  output.innerHTML = ""; // Efface l'ancien texte
  typeText(output, text, 0, section, () => {
    setTimeout(() => {
      if (section === "Veille") {
        // Après avoir affiché "open veille technologique", affiche la fenêtre
        openVeilleApp();
      }
      isAnimating = false; // Débloque les clics
    }, 300);
  });
}

// Effet "machine à écrire" avec blocage temporaire
function typeText(element, text, index, section, callback) {
  if (index < text.length) {
    element.innerHTML += text.charAt(index) === "\n" ? "<br>" : text.charAt(index);
    setTimeout(() => typeText(element, text, index + 1, section, callback), 30);
  } else if (callback) {
    callback(); // Exécute la transformation des liens après l'animation
  }
}

// Fonction pour ouvrir la fenêtre Veille Technologique
function openVeilleApp() {
  const veilleTechnologique = document.getElementById("veilleTechnologique");
  veilleTechnologique.style.display = "block"; // Affiche la fenêtre
  veilleTechnologique.style.position = "absolute";
  veilleTechnologique.style.zIndex = "1000"; // Au-dessus du terminal
  veilleTechnologique.style.left = Math.random() * (window.innerWidth - 800) + "px"; // Position aléatoire
  veilleTechnologique.style.top = Math.random() * (window.innerHeight - 450) + "px";
}

// Code pour gérer le bouton et l'affichage de l'application
document.addEventListener("DOMContentLoaded", function () {
  const app3 = document.querySelector(".app3"); // Bouton pour afficher Veille
  const redButtonVeille = document.querySelector("#veilleTechnologique .button.red"); // Bouton rouge dans la fenêtre Veille

  // Affiche "Veille Technologique"
  app3.addEventListener("click", function () {
    showContent("Veille"); // Affiche la commande 'open veille technologique' et ouvre l'app
  });

  // Ferme "Veille Technologique" lorsqu'on clique sur le bouton rouge
  redButtonVeille.addEventListener("click", function () {
    const veilleTechnologique = document.getElementById("veilleTechnologique");
    veilleTechnologique.style.display = "none"; // Cache la fenêtre
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fulscreen
document.addEventListener("DOMContentLoaded", () => {
  const greenButton = document.querySelector(".button.green");
  const terminal = document.querySelector(".terminal");

  greenButton.addEventListener("click", () => {
    if (terminal.classList.contains("fullscreen")) {
      terminal.style.transform = "scale(1)"; // Préparer la réduction
      setTimeout(() => {
        terminal.classList.remove("fullscreen");
        terminal.style.opacity = "1"; // Enlève la transparence
      }, 10); // Laisser la transition s'appliquer
    } else {
      terminal.classList.add("fullscreen");
      terminal.style.transform = "scale(1.05)"; // Petit effet d'agrandissement
      terminal.style.opacity = "1"; // Enlève la transparence lors du passage en plein écran
      setTimeout(() => {
        terminal.style.transform = "scale(1)"; // Retour à une taille normale après agrandissement
      }, 300);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//reduct
document.addEventListener("DOMContentLoaded", () => {
  const yellowButton = document.querySelector(".button.yellow");
  const terminal = document.querySelector(".terminal");

  yellowButton.addEventListener("click", () => {
    // Si le terminal n'est pas réduit, le réduire via une transformation
    if (!terminal.classList.contains("minimized")) {
      terminal.classList.add("minimized");
      // On applique une transition pour modifier l'échelle et l'opacité pendant 0.3s
      terminal.style.transition = "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";
      terminal.style.transform = "scale(0.7)";
      terminal.style.opacity = "0.6";
    } else {
      // Sinon on restaure l'état initial
      terminal.classList.remove("minimized");
      terminal.style.transition = "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";
      terminal.style.transform = "scale(1)";
      terminal.style.opacity = "1";
    }
  });
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fonction pour afficher la pop-up
function showPopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "block"; // Affiche la pop-up
  
  // Masquer la pop-up après 10 secondes
  setTimeout(() => {
    popup.style.display = "none";
  }, 10000);
}

// Appel de la fonction une fois la page chargée
window.onload = () => {
  showPopup(); // Affiche la pop-up au chargement de la page
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Detecion de la souris pour la bottom bar
document.addEventListener("mousemove", function(event) {
  const bottomBar = document.querySelector(".bottom-bar");

  // Ajuste la détection selon si on est en plein écran ou non
  let threshold = document.fullscreenElement ? 150 : 80;

  if (window.innerHeight - event.clientY < threshold) {
    bottomBar.style.bottom = "20px"; // Afficher la barre
  } else {
    bottomBar.style.bottom = "-70px"; // Cacher la barre
  }
});

//animation
document.addEventListener("mousemove", function(event) {
  const bottomBar = document.querySelector(".bottom-bar");
  let threshold = document.fullscreenElement ? 150 : 80;
  
  if (window.innerHeight - event.clientY < threshold) {
    // Lorsque la souris est proche du bas, on affiche pleinement la barre
    bottomBar.style.opacity = "1";
    bottomBar.style.transform = "translateX(-50%) scale(1)";
  } else {
    // Sinon, on réduit la barre et on la rend plus transparente
    bottomBar.style.opacity = "0.5"; // Valeur d'opacité possible, à ajuster
    bottomBar.style.transform = "translateX(-50%) scale(0.9)"; // Réduction de la taille
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//app2
document.addEventListener("DOMContentLoaded", function () {
  const terminal = document.querySelector(".terminal");
  const veilleTechnologique = document.getElementById("veilleTechnologique");
  const app3 = document.querySelector(".app3"); // Bouton pour afficher Veille
  const redButtonVeille = veilleTechnologique.querySelector(".button.red"); // Bouton rouge dans la fenêtre Veille
  let isDragging = false;
  let offsetX, offsetY;

  // Affiche "Veille Technologique"
  app3.addEventListener("click", function () {
    veilleTechnologique.style.display = "block"; // Affiche la fenêtre
    veilleTechnologique.style.position = "absolute";
    veilleTechnologique.style.zIndex = "1000"; // Au-dessus du terminal
    veilleTechnologique.style.left = Math.random() * (window.innerWidth - 800) + "px"; // Position aléatoire
    veilleTechnologique.style.top = Math.random() * (window.innerHeight - 450) + "px";
  });

  // Ferme "Veille Technologique" lorsqu'on clique sur le bouton rouge
  redButtonVeille.addEventListener("click", function () {
    veilleTechnologique.style.display = "none"; // Cache la fenêtre
  });

  // Déplacement de la fenêtre "Veille Technologique"
  veilleTechnologique.querySelector(".header2").addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - veilleTechnologique.getBoundingClientRect().left;
    offsetY = e.clientY - veilleTechnologique.getBoundingClientRect().top;
    veilleTechnologique.style.zIndex = "1100"; // Toujours au-dessus lors du déplacement
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      veilleTechnologique.style.left = e.clientX - offsetX + "px";
      veilleTechnologique.style.top = e.clientY - offsetY + "px";
    }
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const veilleTechnologique = document.getElementById("veilleTechnologique");
  let isDragging = false;
  let offsetX, offsetY;

  // Détection du début du drag
  veilleTechnologique.querySelector(".header2").addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - veilleTechnologique.getBoundingClientRect().left;
    offsetY = e.clientY - veilleTechnologique.getBoundingClientRect().top;
    veilleTechnologique.style.zIndex = "1100"; // Toujours au-dessus lors du déplacement
  });

  // Déplacement de la fenêtre
  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;

      // Obtenir les dimensions de la fenêtre du navigateur
      const maxX = window.innerWidth - veilleTechnologique.offsetWidth;
      const maxY = window.innerHeight - veilleTechnologique.offsetHeight;

      // Bloquer la fenêtre aux bords du navigateur
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      // Appliquer la nouvelle position
      veilleTechnologique.style.left = newX + "px";
      veilleTechnologique.style.top = newY + "px";
    }
  });

  // Fin du drag
  document.addEventListener("mouseup", function () {
    isDragging = false;
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const veilleTechnoDiv = document.querySelector(".veilletechnologique");

  veilleTechnoDiv.addEventListener("wheel", (event) => {
    const scrollContent = veilleTechnoDiv.querySelector(".scroll-content");
    
    if (scrollContent.scrollHeight > scrollContent.clientHeight) {
      scrollContent.scrollTop += event.deltaY;
      event.preventDefault(); // Empêche la page entière de défiler
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Bloque clique droit / inspection
document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});
document.addEventListener("keydown", function(event) {
  if (
      event.key === "F12" ||
      (event.ctrlKey && event.shiftKey && event.key === "I") ||
      (event.ctrlKey && event.shiftKey && event.key === "J") ||
      (event.ctrlKey && event.key === "U")
  ) {
      event.preventDefault();
  }
});
setInterval(function() {
  if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
      document.body.innerHTML = "Inspection bloquée !";
  }
}, 1000);
(function() {
  function detectDevTools() {
      console.log("%c ", "font-size: 1px;");
      console.log("%c Attention : Debugging détecté !", "color: red; font-size: 20px;");

      setInterval(() => {
          (function() {
              debugger;
          })();
      }, 100);
  }
  detectDevTools();
})();

//Bloque l'enregistrement/la copie/le collage/le couper
document.addEventListener("keydown", function(event) {
  if (
      event.key === "F12" || 
      (event.ctrlKey && event.shiftKey && event.key === "I") ||
      (event.ctrlKey && event.shiftKey && event.key === "J") ||
      (event.ctrlKey && event.key === "U") ||
      (event.ctrlKey && event.key === "S") ||  // Empêche l'enregistrement
      (event.ctrlKey && event.key === "C") ||  // Empêche la copie
      (event.ctrlKey && event.key === "V") ||  // Empêche le collage
      (event.ctrlKey && event.key === "X")     // Empêche le couper
  ) {
      event.preventDefault();
  }
});

(function() {
  var devtools = /./;
  devtools.toString = function() {
      window.close(); // Ferme la fenêtre
      document.body.innerHTML = "Inspection bloquée !";
  };
  console.log("%c", devtools);
})();

setInterval(() => {
  console.clear();
  console.log("Inspection bloquée !");
}, 100);

setInterval(() => {
  (function() {
      debugger;
  })();
}, 50);

Object.defineProperty(console, '_commandLineAPI', {
  get: function() {
      throw new Error("Accès interdit !");
  }
});

setInterval(() => {
  console.clear();
  console.log("%c Salut tu fais quoi ici ?", "color: red; font-size: 50px;");
}, 100);
