console.log("Welcome to Tic-Tac-Toe!");

const mode = prompt("Choose Game Mode: 'PvP' or 'PvE'").toLowerCase();

if (mode === "pvp") {
    PvPGame.start();
} else if (mode === "pve") {
    PvEGame.start();
} else {
    alert("Invalid game mode selected.");
}

// ------------------ PvP Game Module ------------------

const PvPGame = (() => {
    const gameBoard = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];

    function printBoard() {
        for (let i = 0; i < gameBoard.length; i++) {
            console.log(gameBoard[i].join(" | "));
            if (i < gameBoard.length - 1) console.log("--+---+--");
        }
    }

    function Player(name, symbol) {
        return { name, symbol };
    }

    const player1 = Player(prompt("Enter name for Player 1:"), prompt("Enter symbol for Player 1 (X or O):"));
    const player2 = Player(prompt("Enter name for Player 2:"), prompt("Enter symbol for Player 2 (X or O):"));

    function getMove(player) {
        const row = parseInt(prompt(`${player.name} (${player.symbol}), enter row (0-2):`));
        const column = parseInt(prompt(`${player.name} (${player.symbol}), enter column (0-2):`));
        return { row, column };
    }

    function isValidMove(row, column) {
        return row >= 0 && row < 3 && column >= 0 && column < 3 && gameBoard[row][column] === " ";
    }

    function checkWin(symbol) {
        for (let i = 0; i < 3; i++) {
            if (
                gameBoard[i][0] === symbol && gameBoard[i][1] === symbol && gameBoard[i][2] === symbol ||
                gameBoard[0][i] === symbol && gameBoard[1][i] === symbol && gameBoard[2][i] === symbol
            ) return true;
        }
        if (
            gameBoard[0][0] === symbol && gameBoard[1][1] === symbol && gameBoard[2][2] === symbol ||
            gameBoard[0][2] === symbol && gameBoard[1][1] === symbol && gameBoard[2][0] === symbol
        ) return true;

        return false;
    }

    function isBoardFull() {
        return gameBoard.every(row => row.every(cell => cell !== " "));
    }

    function start() {
        console.log("Starting PvP Game...");
        printBoard();

        let currentPlayer = player1;

        while (true) {
            let move = getMove(currentPlayer);

            while (!isValidMove(move.row, move.column)) {
                alert("Invalid move! Try again.");
                move = getMove(currentPlayer);
            }

            gameBoard[move.row][move.column] = currentPlayer.symbol;
            printBoard();

            if (checkWin(currentPlayer.symbol)) {
                alert(`${currentPlayer.name} wins!`);
                break;
            }

            if (isBoardFull()) {
                alert("It's a draw!");
                break;
            }

            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    }

    return { start };
})();

// ------------------ PvE Game Module ------------------

const PvEGame = (() => {
    const gameBoard = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];

    function printBoard() {
        for (let i = 0; i < gameBoard.length; i++) {
            console.log(gameBoard[i].join(" | "));
            if (i < gameBoard.length - 1) console.log("--+---+--");
        }
    }

    const human = {
        name: prompt("Enter your name:"),
        symbol: prompt("Choose your symbol (X or O):")
    };

    const bot = {
        name: "Bot",
        symbol: human.symbol === "X" ? "O" : "X"
    };

    function isValidMove(row, column) {
        return row >= 0 && row < 3 && column >= 0 && column < 3 && gameBoard[row][column] === " ";
    }

    function getBotMove() {
        let row, column;
        do {
            row = Math.floor(Math.random() * 3);
            column = Math.floor(Math.random() * 3);
        } while (!isValidMove(row, column));
        return { row, column };
    }

    function checkWin(symbol) {
        for (let i = 0; i < 3; i++) {
            if (
                gameBoard[i][0] === symbol && gameBoard[i][1] === symbol && gameBoard[i][2] === symbol ||
                gameBoard[0][i] === symbol && gameBoard[1][i] === symbol && gameBoard[2][i] === symbol
            ) return true;
        }
        if (
            gameBoard[0][0] === symbol && gameBoard[1][1] === symbol && gameBoard[2][2] === symbol ||
            gameBoard[0][2] === symbol && gameBoard[1][1] === symbol && gameBoard[2][0] === symbol
        ) return true;

        return false;
    }

    function isBoardFull() {
        return gameBoard.every(row => row.every(cell => cell !== " "));
    }

    function start() {
        console.log("Starting PvE Game...");
        printBoard();

        let currentPlayer = human;

        while (true) {
            let move;

            if (currentPlayer === human) {
                const row = parseInt(prompt(`${human.name}, enter row (0-2):`));
                const column = parseInt(prompt(`${human.name}, enter column (0-2):`));
                move = { row, column };
            } else {
                move = getBotMove();
                console.log(`Bot plays at (${move.row}, ${move.column})`);
            }

            if (!isValidMove(move.row, move.column)) {
                if (currentPlayer === human) alert("Invalid move! Try again.");
                continue;
            }

            gameBoard[move.row][move.column] = currentPlayer.symbol;
            printBoard();

            if (checkWin(currentPlayer.symbol)) {
                alert(`${currentPlayer.name} wins!`);
                break;
            }

            if (isBoardFull()) {
                alert("It's a draw!");
                break;
            }

            currentPlayer = currentPlayer === human ? bot : human;
        }
    }

    return { start };
})();
