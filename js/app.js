const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
];
let konamiIndex = 0;
document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      window.location.href = "index.html";
    }
  } else konamiIndex = 0;
});

// === Variables / état ===
let points = 0;
let boxIndex = 0;
let boxPrice = 100;
let pointsPerClick = 5;
let pointsMultiplier = 1;
let autoGainPerSec = 0;
let cooldown = false;
const clickCooldownMs = 1500;
const STORAGE_KEY = "box_clicker_3d_clean_save";

const boxTypes = [
  { id: "carton", name: "Boîte Carton", color1: "#b5651d", color2: "#d8a45e", multiplier: 1 },
  { id: "fer", name: "Boîte Fer", color1: "#4a6a8a", color2: "#6b8cc2", multiplier: 1.25 },
  { id: "or", name: "Boîte Or", color1: "#bfa237", color2: "#f9e28c", multiplier: 2.5 },
  // Ajoute les autres boîtes ici...
];

// Upgrades permanents
const permanentUpgrades = [
  {
    id: "extra_auto_5",
    name: "Gain auto +5 pts/sec",
    cost: 500,
    description: "Ajoute +5 points automatiques par seconde.",
    bought: false,
    applyEffect() {
      autoGainPerSec += 5;
    },
  },
  {
    id: "extra_auto_20",
    name: "Gain auto +20 pts/sec",
    cost: 2000,
    description: "Ajoute +20 points automatiques par seconde.",
    bought: false,
    applyEffect() {
      autoGainPerSec += 20;
    },
  },
  {
    id: "click_bonus_10",
    name: "+10% points par clic",
    cost: 300,
    description: "Augmente les points gagnés par clic de 10%.",
    bought: false,
    applyEffect() {
      pointsMultiplier *= 1.1;
    },
  },
  {
    id: "click_bonus_25",
    name: "+25% points par clic",
    cost: 1000,
    description: "Augmente les points gagnés par clic de 25%.",
    bought: false,
    applyEffect() {
      pointsMultiplier *= 1.25;
    },
  },
];

// Effets temporaires (optionnels)
let activeEffects = [];

// --- DOM ---
const box = document.getElementById("box");
const btnBuyBox = document.getElementById("btn-buy-box");
const pointsDisplay = document.getElementById("points-display");
const autoGainDisplay = document.getElementById("auto-gain");
const inventoryList = document.getElementById("inventory-list");
const btnReset = document.getElementById("btn-reset");

// Container upgrades permanents dans inventaire
const upgradesContainer = document.createElement("div");
upgradesContainer.style.marginTop = "1rem";
upgradesContainer.innerHTML = `<h4 style="text-align:center; color:#00d2ff;">Upgrades permanents</h4>`;
inventoryList.parentNode.appendChild(upgradesContainer);

const upgradesListDiv = document.createElement("div");
upgradesContainer.appendChild(upgradesListDiv);

// Notification
const notification = document.createElement("div");
notification.id = "notification";
document.body.appendChild(notification);

function showNotification(msg) {
  notification.textContent = msg;
  notification.style.opacity = "1";
  clearTimeout(notification.timeout);
  notification.timeout = setTimeout(() => {
    notification.style.opacity = "0";
  }, 3000);
}

// Timer cooldown au-dessus de la boîte
let cooldownTimerEl = document.createElement("div");
cooldownTimerEl.style.color = "#00d2ff";
cooldownTimerEl.style.fontWeight = "700";
cooldownTimerEl.style.marginBottom = "50px";
cooldownTimerEl.style.textAlign = "center";
cooldownTimerEl.style.userSelect = "none";
cooldownTimerEl.textContent = "";
document.getElementById("box-area").insertBefore(cooldownTimerEl, box);

// Variables ouverture
let isOpening = false;
let openDuration = 700;

// Mise à jour affichages
function updatePoints() {
  pointsDisplay.textContent = `Points : ${Math.floor(points)}`;
}
function updateAutoGain() {
  autoGainDisplay.textContent = `Gain auto : ${autoGainPerSec.toFixed(1)} / sec`;
}
function updateBoxStyle() {
  box.className = "";
  const bt = boxTypes[boxIndex];
  box.classList.add(bt.id);

  const faces = box.querySelectorAll(".face");
  faces.forEach((face) => {
    face.style.background = `linear-gradient(145deg, ${bt.color1}, ${bt.color2})`;
    face.style.borderColor = bt.color2;
    face.style.boxShadow = `inset -10px -10px 20px ${bt.color2}, inset 10px 10px 20px ${bt.color1}, 5px 10px 30px rgba(0,0,0,0.8)`;
    face.style.color = "inherit";
  });

  const front = box.querySelector(".face.front");
  front.dataset.text = bt.name;
}

function getCurrentMultiplier() {
  let mult = pointsMultiplier * boxTypes[boxIndex].multiplier;
  const now = Date.now();
  activeEffects = activeEffects.filter((e) => e.expiresAt > now);
  activeEffects.forEach((e) => {
    if (e.multiplier) mult *= e.multiplier;
  });
  return mult;
}

// Ouvrir boîte avec cooldown et animation
async function openBox() {
  if (isOpening || cooldown) return;
  isOpening = true;
  cooldown = true;
  box.classList.add("opening");
  btnBuyBox.disabled = true;

  let remaining = clickCooldownMs;
  cooldownTimerEl.textContent = `Attends ${(remaining / 1000).toFixed(1)}s...`;
  const interval = setInterval(() => {
    remaining -= 100;
    if (remaining <= 0) {
      clearInterval(interval);
      cooldownTimerEl.textContent = "";
      cooldown = false;
    } else {
      cooldownTimerEl.textContent = `Attends ${(remaining / 1000).toFixed(1)}s...`;
    }
  }, 100);

  await new Promise((res) => setTimeout(res, openDuration));

  box.classList.remove("opening");

  const mult = getCurrentMultiplier();
  const gain = pointsPerClick * mult;
  points += gain;
  updatePoints();

  // Chance d'effet temporaire (20%)
  if (Math.random() < 0.2) {
    addTemporaryEffect();
  }

  // Chance de changer la boîte (10%)
  if (Math.random() < 0.1) {
    upgradeBox();
  }

  btnBuyBox.disabled = false;
  isOpening = false;
  saveGame();
}

// Ajout effet temporaire (optionnel)
function addTemporaryEffect() {
  // (implémente si tu veux)
}

// Passage à la boîte suivante
function upgradeBox() {
  boxIndex++;
  if (boxIndex >= boxTypes.length) boxIndex = boxTypes.length - 1;
  pointsPerClick = 5;
  updateBoxStyle();
  showNotification(`Ta boîte est maintenant : ${boxTypes[boxIndex].name}`);
}

// Acheter boîte = augmente gain auto
function buyBox() {
  if (points < boxPrice) {
    showNotification("Pas assez de points !");
    return;
  }
  points -= boxPrice;
  boxPrice = Math.round(boxPrice * 2.5);

  autoGainPerSec += 1;

  updatePoints();
  updateAutoGain();
  btnBuyBox.textContent = `Acheter nouvelle boîte (${boxPrice} points)`;
  showNotification("Nouvelle boîte achetée, gain auto augmenté !");
  saveGame();
}

// Afficher upgrades permanents à acheter
function renderPermanentUpgrades() {
  upgradesListDiv.innerHTML = "";
  permanentUpgrades.forEach((upg) => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.style.cursor = upg.bought ? "default" : "pointer";
    div.style.opacity = upg.bought ? "0.5" : "1";
    div.textContent = `${upg.name} - ${upg.cost} pts\n${upg.description}`;

    if (!upg.bought) {
      div.addEventListener("click", () => {
        if (points < upg.cost) {
          showNotification("Pas assez de points pour cet upgrade !");
          return;
        }
        upg.bought = true;
        points -= upg.cost;
        upg.applyEffect();
        updatePoints();
        updateAutoGain();
        renderPermanentUpgrades();
        showNotification(`Upgrade acheté : ${upg.name}`);
        saveGame();
      });
    }
    upgradesListDiv.appendChild(div);
  });
}

function renderInventory() {
  inventoryList.innerHTML = "";
  if (activeEffects.length > 0) {
    activeEffects.forEach((e) => {
      const div = document.createElement("div");
      div.classList.add("item");
      div.textContent = `Effet actif : ${e.name}`;
      inventoryList.appendChild(div);
    });
  } else {
    inventoryList.textContent = "Aucun effet actif.";
  }
}

// Sauvegarde
function saveGame() {
  const saveData = {
    points,
    boxIndex,
    boxPrice,
    pointsPerClick,
    pointsMultiplier,
    autoGainPerSec,
    activeEffects,
    openDuration,
    permanentUpgradesBought: permanentUpgrades.filter((u) => u.bought).map((u) => u.id),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
}

// Chargement
function loadGame() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;
  try {
    const saveData = JSON.parse(data);
    points = saveData.points ?? 0;
    boxIndex = saveData.boxIndex ?? 0;
    boxPrice = saveData.boxPrice ?? 100;
    pointsPerClick = saveData.pointsPerClick ?? 5;
    pointsMultiplier = saveData.pointsMultiplier ?? 1;
    autoGainPerSec = saveData.autoGainPerSec ?? 0;
    activeEffects = saveData.activeEffects ?? [];
    openDuration = saveData.openDuration ?? 700;

    // Restore upgrades
    const boughtIds = saveData.permanentUpgradesBought ?? [];
    permanentUpgrades.forEach((u) => {
      if (boughtIds.includes(u.id)) {
        u.bought = true;
        u.applyEffect();
      }
    });

    updateBoxStyle();
    renderInventory();
    renderPermanentUpgrades();
  } catch (e) {
    console.warn("Erreur chargement sauvegarde", e);
  }
}

// Gain auto loop
function autoGainLoop() {
  points += autoGainPerSec;
  updatePoints();
  saveGame();
}

// === Event listeners ===
box.addEventListener("click", openBox);
btnBuyBox.addEventListener("click", buyBox);
btnReset.addEventListener("click", () => {
  if (confirm("Es-tu sûr de vouloir tout réinitialiser ?")) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
});

// === Initialisation ===
loadGame();
updatePoints();
updateAutoGain();
updateBoxStyle();
btnBuyBox.textContent = `Acheter nouvelle boîte (${boxPrice} points)`;
renderPermanentUpgrades();

setInterval(() => {
  autoGainLoop();
  renderInventory();
}, 1000);
