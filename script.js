// ----------------------------
// 🎮 DOM Element References
// ----------------------------
const startBtn = document.getElementById("start-btn");
const gameModal = document.getElementById("gameModal");
const gameBoardContainer = document.getElementById("gameBoard");
const resultBar = document.getElementById("resultBar");
const player1Span = document.getElementById("player1-info");
const player2Span = document.getElementById("player2-info");

// ----------------------------
// 🧠 Game State Variables
// ----------------------------
let currentPlayer, board, mode, player1, player2;
let selectedMode = null; // Stores chosen game mode (PvP or PvE)

// ----------------------------
// 🎯 Mode Selection Handling
// ----------------------------
document.getElementById("pvp-mode").addEventListener("click", () => {
  selectedMode = "pvp";
  highlightMode("pvp-mode");
});

document.getElementById("pve-mode").addEventListener("click", () => {
  selectedMode = "pve";
  highlightMode("pve-mode");
});

// Adds visual highlight to selected mode card
function highlightMode(id) {
  document.getElementById("pvp-mode").classList.remove("selected");
  document.getElementById("pve-mode").classList.remove("selected");
  if (id) document.getElementById(id).classList.add("selected");
}

// ----------------------------
// 🚀 Start Game Button Click
// ----------------------------
startBtn.addEventListener("click", () => {
  if (!selectedMode) return alert("Please select a mode to start!");
  mode = selectedMode;
  initGame(); // Initialize board and players
  gameModal.classList.remove("hidden"); // Show game modal
});

// ----------------------------
// ♻️ Game Initialization
// ----------------------------
function initGame() {
  // Reset the board
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  resultBar.textContent = "";

  // Set player details based on mode
  if (mode === "pvp") {
    player1 = { name: "Player 1", symbol: "X" };
    player2 = { name: "Player 2", symbol: "O" };
  } else {
    player1 = { name: "You", symbol: "X" };
    player2 = { name: "Bot", symbol: "O" };
  }

  // Display player info
  player1Span.textContent = `${player1.name} (${player1.symbol})`;
  player2Span.textContent = `${player2.name} (${player2.symbol})`;
  currentPlayer = player1;

  // Clear and enable all cells
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.addEventListener("click", handleCellClick, { once: true }); // Once: disables multiple clicks
  });
}

// ----------------------------
// 🕹️ Player/Bot Move Handler
// ----------------------------
function handleCellClick(e) {
  const index = +e.target.dataset.cell;
  const row = Math.floor(index / 3);
  const col = index % 3;

  // Ignore if cell already filled
  if (board[row][col] !== "") return;

  // Make move and update UI
  board[row][col] = currentPlayer.symbol;
  e.target.textContent = currentPlayer.symbol;

  // Check for win or draw
  if (checkWin(currentPlayer.symbol)) {
    resultBar.textContent = `${currentPlayer.name} Wins 🏆️`;
    disableBoard();
    return;
  }

  if (isBoardFull()) {
    resultBar.textContent = "It's a draw!";
    return;
  }

  // Switch turns
  currentPlayer = currentPlayer === player1 ? player2 : player1;

  // Bot's turn
  if (mode === "pve" && currentPlayer.name === "Bot") {
    setTimeout(botMove, 500); // Delay for realism
  }
}

// ----------------------------
// 🤖 Bot Move Logic (Random)
// ----------------------------
function botMove() {
  let emptyCells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") emptyCells.push({ row: i, col: j });
    }
  }

  const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const cellIndex = move.row * 3 + move.col;
  const cell = document.querySelector(`[data-cell='${cellIndex}']`);
  cell.click(); // Triggers same handler as player
}

// ----------------------------
// 🏆 Win Condition Checker
// ----------------------------
function checkWin(symbol) {
  for (let i = 0; i < 3; i++) {
    // Check rows & columns
    if (board[i][0] === symbol && board[i][1] === symbol && board[i][2] === symbol) return true;
    if (board[0][i] === symbol && board[1][i] === symbol && board[2][i] === symbol) return true;
  }

  // Check diagonals
  if (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) return true;
  if (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol) return true;

  return false;
}

// ----------------------------
// 📋 Board Full Check (Draw)
// ----------------------------
function isBoardFull() {
  return board.flat().every(cell => cell !== "");
}

// ----------------------------
// 🚫 Disable Clicks After Game Ends
// ----------------------------
function disableBoard() {
  document.querySelectorAll(".cell").forEach(cell =>
    cell.removeEventListener("click", handleCellClick)
  );
}

// ----------------------------
// 🔄 Restart Button Logic
// ----------------------------
document.getElementById("restartBtn").addEventListener("click", () => {
  initGame(); // Reinitialize board and players
});

// ----------------------------
// 🏠 Home Button Logic
// ----------------------------
document.getElementById("homeBtn").addEventListener("click", () => {
  gameModal.classList.add("hidden"); // Hide modal
  selectedMode = null; // Reset mode
  highlightMode(""); // Remove mode selection highlight
});
