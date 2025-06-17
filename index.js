let cor = 0;
let corPerClick = 1;
let corPerSecond = 0;

//Prix de base pour chaque item
const basePrices = [50, 51, 55, 60, 64, 70, 73, 75, 80];
//Prix courant pour chaque item (sera doublé à chaque achat)
const currentPrices = [...basePrices];

//Maj le prix affiché sur chaque bouton
function updateShopPrices() {
  document.querySelectorAll(".shop .item button").forEach((btn, i) => {
    //Remplace le prix affiché dans le texte du bouton
    btn.innerHTML = btn.innerHTML.replace(/-\d+ cor/, `-${currentPrices[i]} cor`);
  });
}

const corDisplay = document.getElementById("cor");
const clickButton = document.getElementById("click-button");
const clickPowerDisplay = document.getElementById("click-power");
const popContainer = document.getElementById("pop-container");

//Affichage du click power
function updateDisplay() {
  corDisplay.textContent = Math.floor(cor);
  clickPowerDisplay.textContent = `+${corPerClick} cor/clic`;
}

//Clic principal avec effet pop
clickButton.addEventListener("click", () => {
  cor += corPerClick;
  updateDisplay();

  //Création du pop
  const pop = document.createElement("span");
  pop.className = "cor-pop";
  pop.textContent = `+${corPerClick}`;
  pop.style.left = "50%";
  pop.style.top = "50%";
  popContainer.appendChild(pop);

  setTimeout(() => {
    pop.style.opacity = 0;
    pop.style.transform = "translateY(-30px)";
  }, 10);
  setTimeout(() => {
    pop.remove();
  }, 800);
});

//Gestion des achats avec doublage du prix
document.querySelectorAll(".shop .item button").forEach((btn, i) => {
  btn.onclick = () => {
    if (cor >= currentPrices[i]) {
      cor -= currentPrices[i];
      switch (i) {
        case 0: //Silica
          corPerSecond += 1;
          break;
        case 1: //Pina
          corPerClick += 2;
          break;
        case 2: //Agil
          corPerSecond += 5;
          break;
        case 3: //Lisbeth
          corPerClick += 6;
          break;
        case 4: //Klein
          corPerSecond += 10;
          break;
        case 5: //Heatcliff
          corPerSecond += 15;
          break;
        case 6: //Yui
          corPerClick += 15;
          break;
        case 7: //Asuna
          corPerSecond += 20;
          break;
        case 8: //Kirito
          corPerSecond += 25;
          break;
      }
      //Double le prix pour le prochain achat
      currentPrices[i] *= 2;
      updateDisplay();
      updateShopPrices();
    }
  };
});

//Timer pour gain automatique
setInterval(() => {
  cor += corPerSecond;
  updateDisplay();
}, 1000);

updateDisplay();
updateShopPrices();

const ragoutRabbit = document.getElementById("ragout-rabbit");

function showRagoutRabbit() {
  if (!ragoutRabbit) return;

  //Position aléatoire dans la left-panel
  const left = Math.random() * 60 + 10;
  const top = Math.random() * 40 + 40;
  ragoutRabbit.style.left = `${left}%`;
  ragoutRabbit.style.top = `${top}%`;

  ragoutRabbit.style.display = "block";

  function onRabbitClick() {
    const bonus = Math.floor(Math.random() * 26) + 5; //5 à 30 inclus
    cor += bonus;
    updateDisplay();
    ragoutRabbit.style.display = "none";
    clearTimeout(hideTimeout);
    ragoutRabbit.removeEventListener("click", onRabbitClick);
  }

  const hideTimeout = setTimeout(() => {
    ragoutRabbit.style.display = "none";
    ragoutRabbit.removeEventListener("click", onRabbitClick);
  }, 15000);

  ragoutRabbit.addEventListener("click", onRabbitClick);
}

function randomRabbitSpawnLoop() {
  const nextTime = Math.random() * 60000 + 30000; //entre 30s et 90s
  setTimeout(() => {
    showRagoutRabbit();
    randomRabbitSpawnLoop();
  }, nextTime);
}

randomRabbitSpawnLoop();