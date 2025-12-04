export function runBootSequence() {
  const bootScreen = document.getElementById("boot-screen");
  const mainContainer = document.getElementById("main-container");

  // Sécurité : si les éléments n'existent pas dans le HTML, on arrête
  if (!bootScreen || !mainContainer) return;

  // On attend 2.5 secondes (temps du "chargement de la console")
  setTimeout(() => {
    // 1. On cache l'écran blanc (déclenche la transition CSS opacity)
    bootScreen.classList.add("hidden");

    // 2. On fait apparaître le site avec un léger zoom
    mainContainer.classList.add("loaded");

    // 3. Nettoyage : On supprime l'écran de boot du DOM après l'animation (1s après)
    setTimeout(() => {
      bootScreen.remove();
    }, 1000);
  }, 2500); // <-- durée (2500ms = 2.5s)
}
