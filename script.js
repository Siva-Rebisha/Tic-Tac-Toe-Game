const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");

let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// CLICK EVENTS
cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

function handleClick() {
  if (!gameActive || this.textContent !== "") return;

  this.textContent = currentPlayer;
  this.style.color = currentPlayer === "X" ? "#1e3a8a" : "#7c3aed";

  if (checkWinner()) return;

  if (isDraw()) {
    gameActive = false;
    showWinner("🤝 Match Draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// WIN CHECK
function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;

    const v1 = cells[a].textContent;
    const v2 = cells[b].textContent;
    const v3 = cells[c].textContent;

    if (v1 && v1 === v2 && v2 === v3) {
      gameActive = false;

      condition.forEach((i) => {
        cells[i].style.backgroundColor = "#fde68a";
        cells[i].style.boxShadow = "0 0 20px #facc15";
      });

      showWinner(`🏆 Player ${v1} Wins!`);
      return true;
    }
  }
  return false;
}

// DRAW CHECK
function isDraw() {
  return [...cells].every((cell) => cell.textContent !== "");
}

// POPUP
function showWinner(message) {
  popupText.textContent = message;
  popup.classList.remove("hidden");
  startConfetti();
}

// RESTART
function restartGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "#ffffff";
    cell.style.boxShadow = "";
    cell.style.color = "";
  });

  currentPlayer = "X";
  gameActive = true;

  statusText.textContent = "Player X's Turn";

  popup.classList.add("hidden");
}
function startConfetti() {
  const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#4cc9f0", "#8338ec"];

  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("div");

    confetti.className = "confetti";

    confetti.style.left = Math.random() * window.innerWidth + "px";

    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    confetti.style.animationDuration = Math.random() * 2 + 2 + "s";

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}