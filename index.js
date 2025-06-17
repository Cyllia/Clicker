let cor = 0;
let corPerClick = 1;
let corPerSecond = 0;

const corDisplay = document.getElementById("cor");
const clickButton = document.getElementById("click-button");
const clickPowerDisplay = document.getElementById("click-power");

// Affichage du click power
function updateDisplay() {
  corDisplay.textContent = Math.floor(cor);
  clickPowerDisplay.textContent = `+${corPerClick} cor/clic`;
}

// Clic principal
clickButton.addEventListener("click", () => {
  cor += corPerClick;
  updateDisplay();
});

// Fonctions d'achat pour chaque item
function buyAuto() {
  if (cor >= 50) {
    cor -= 50;
    corPerSecond += 1;
    updateDisplay();
  }
}

function buyClick(amount = 1, cost = 30) {
  if (cor >= cost) {
    cor -= cost;
    corPerClick += amount;
    updateDisplay();
  }
}

// Associer chaque bouton à la bonne fonction et valeurs
document.querySelectorAll(".shop .item button").forEach((btn, i) => {
  btn.onclick = () => {
    switch (i) {
      case 0: // Silica
        if (cor >= 50) {
          cor -= 50;
          corPerSecond += 1;
          updateDisplay();
        }
        break;
      case 1: // Pina
        buyClick(2, 51);
        break;
      case 2: // Agil
        if (cor >= 55) {
          cor -= 55;
          corPerSecond += 5;
          updateDisplay();
        }
        break;
      case 3: // Lisbeth
        buyClick(6, 60);
        break;
      case 4: // Klein
        if (cor >= 64) {
          cor -= 64;
          corPerSecond += 10;
          updateDisplay();
        }
        break;
      case 5: // Heatcliff
        if (cor >= 70) {
          cor -= 70;
          corPerSecond += 20;
          updateDisplay();
        }
        break;
      case 6: // Yui
        buyClick(22, 73);
        break;
      case 7: // Asuna
        if (cor >= 75) {
          cor -= 75;
          corPerSecond += 25;
          updateDisplay();
        }
        break;
      case 8: // Kirito
        if (cor >= 80) {
          cor -= 80;
          corPerSecond += 30;
          updateDisplay();
        }
        break;
    }
  };
});

// Timer pour gain automatique
setInterval(() => {
  cor += corPerSecond;
  updateDisplay();
}, 1000);

// Initialisation de l'affichage
updateDisplay();