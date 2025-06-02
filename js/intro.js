setTimeout(() => {
  const bootScreen = document.getElementById("boot-screen");
  const mainContent = document.getElementById("main-content");

  bootScreen.classList.add("fade-out");

  setTimeout(() => {
    bootScreen.style.display = "none";
    mainContent.style.display = "block";
    
    // Animation douce d'apparition
    void mainContent.offsetWidth; 
    mainContent.classList.add("visible");
  }, 800);
}, 2000);

