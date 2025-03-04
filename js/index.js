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
    Profil: " cd Profil\nNom: Lachkar\nPrenom: Bilal\nAge: 19 ans\nDéveloppeur Web passionné !",
    Competence: " cd Compétence\nDESIGNE :\nFigma\n\nFRONT-END :\nHTML\nCSS\nJavaScript\n\nBACK-END :\nPHP\nPython",
    Stages: " cd Stages\nStage 4: MINUTE PHONE -  Stagiaire\n\nStage 3: Boomker Concept Production - Stagiaire\n\nStage 2: Deezer - Stagiaire\n\nStage 1: Deezer - Stagiaire",
    Projets: " cd Projets\nProjet 1: Chatbex\nProjet 2:",
    Veille: " cd Veille technologique\nVeille sur l'informatique quantique, Maths/Cryptographie",
    Contact: " cd Contact\nEmail: lachkar.bilal.gf@gmail.com\nGitHub: github.com/Flaimeur",
  };

  let commandLine = `lachkar@Host-001 ~ % `; // Affiche la commande
  let text = commandLine + (content[section] || "Commande non reconnue.");

  output.innerHTML = ""; // Efface l'ancien texte
  typeText(output, text, 0, section, () => {
    setTimeout(() => {
      if (section === "Contact") {
        // Remplace le texte brut par un lien cliquable après l'animation
        output.innerHTML = output.innerHTML
          .replace("Email: lachkar.bilal.gf@gmail.com",
            "Email: <a href='mailto:lachkar.bilal.gf@gmail.com' target='_blank'>lachkar.bilal.gf@gmail.com</a>")
          .replace("GitHub: github.com/Flaimeur",
            "GitHub: <a href='https://github.com/Flaimeur' target='_blank'>github.com/Flaimeur</a>");
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
      }, 10); // Laisser la transition s'appliquer
    } else {
      terminal.classList.add("fullscreen");
      terminal.style.transform = "scale(1.05)"; // Petit effet d'agrandissement
      setTimeout(() => {
        terminal.style.transform = "scale(1)"; // Retour à une taille normale après agrandissement
      }, 300);
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fonction pour afficher la pop-up
function showPopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "block"; // Affiche la pop-up
  
  // Masquer la pop-up après 5 secondes
  setTimeout(() => {
    popup.style.display = "none";
  }, 5000);
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
