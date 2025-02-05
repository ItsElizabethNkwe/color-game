const colorBox = document.getElementById("colorBox");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let score = 0;
let targetColor;

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function startGame() {
  
  while (colorOptionsContainer.firstChild) {
    colorOptionsContainer.removeChild(colorOptionsContainer.firstChild);
  }

  const colors = [];
  for (let i = 0; i < 6; i++) {
    colors.push(getRandomColor());
  }

  targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = targetColor;

  colors.forEach((color, index) => {
    const button = document.createElement("button");
    button.classList.add("color-option");
    button.style.backgroundColor = color;
    button.dataset.testid = "colorOption";
    button.setAttribute("role", "option");
    button.setAttribute("aria-label", `Option ${index + 1}: ${color}`);

    button.onclick = () => checkGuess(color, button);
    colorOptionsContainer.appendChild(button);
  });

  gameStatus.textContent = "Pick a color!";
}

function checkGuess(selectedColor, button) {
  if (selectedColor === targetColor) {
    gameStatus.textContent = "Correct!";
    gameStatus.style.color = "green";
    score++;
    scoreDisplay.textContent = score;
    colorBox.classList.add("correct");
    setTimeout(() => colorBox.classList.remove("correct"), 500);
  } else {
    gameStatus.textContent = "Wrong! Try Again.";
    gameStatus.style.color = "red";
    button.classList.add("wrong");
    setTimeout(() => button.classList.remove("wrong"), 500);
  }
}

newGameButton.addEventListener("click", () => {
  gameStatus.textContent = "";
  gameStatus.style.color = "#333"; 
  startGame();
});

startGame();
