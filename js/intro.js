document.addEventListener("DOMContentLoaded", () => {
  const bootScreen = document.getElementById("boot-screen");
  const loginScreen = document.getElementById("login-screen");
  const mainContent = document.getElementById("main-content");

  // Après la barre de chargement (4s), on masque boot et login, on affiche direct le contenu
  setTimeout(() => {
    bootScreen.style.display = "none";
    loginScreen.style.display = "none";
    mainContent.style.display = "block";
  }, 4000);
});
