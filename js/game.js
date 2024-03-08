const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const spanTimer = document.querySelector(".timer");

const pokemons = [
  "Alakazam",
  "Caterpie",
  "Clefable",
  "Jirachi",
  "Metagross",
  "Tangrowth",
  "Articuno",
  "Combusken",
  "Nidorino",
  "Pikachu",
  "Porygon",
  "Probopass",
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCart = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length == pokemons.length * 2) {
    clearInterval(this.loop);
    alert(
      `Parabéns ${spanPlayer.innerHTML}. Seu tempo foi de: ${spanTimer.innerHTML} segundos!`
    );
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCart.getAttribute("data-character");

  if (firstCharacter == secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCart.firstChild.classList.add("disabled-card");
    firstCard = "";
    secondCart = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCart.classList.remove("reveal-card");
      firstCard = "";
      secondCart = "";
    }, 400);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard == "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCart == "") {
    target.parentNode.classList.add("reveal-card");
    secondCart = target.parentNode;

    checkCards();
  }
};

const createCard = (pokemon) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");
  front.style.backgroundImage = `url('../images/${pokemon}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", pokemon);

  return card;
};

const loadGame = () => {
  const duplicatePokes = [...pokemons, ...pokemons];
  const shufflePokes = duplicatePokes.sort(() => {
    return Math.random() - 0.5;
  });

  shufflePokes.forEach((pokemon) => {
    const card = createCard(pokemon);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +spanTimer.innerHTML;
    spanTimer.innerHTML = currentTime + 1;
  }, 1000);
};
window.onload = () => {
  const playerNickname = localStorage.getItem("nickname");
  if (playerNickname) {
    spanPlayer.innerHTML = playerNickname;
  } else {
    spanPlayer.innerHTML = "???";
  }
  startTimer();
  loadGame();
};
