console.log("Hello Users! Let's play Tic-Tac-Toe");

// ===== Player Factory =====
const Player = (name, symbol) => {
    return { name, symbol };
};

// ===== Gameboard Module =====
const Gameboard = (() => {
    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];

    const printBoard = () => {
        for (let i = 0; i < board.length; i++) {
            console.log(board[i].join(" | "));
            if (i < board.length - 1) {
                console.log("--+---+--");
            }
        }
    };

    const setMove = (row, column, symbol) => {
        board[row][column] = symbol;
    };

    const isValidMove = (row, column) => {
        return row >= 0 && row < 3 && column >= 0 && column < 3 && board[row][column] === " ";
    };

    const isFull = () => {
        for (let row of board) {
            if (row.includes(" ")) return false;
        }
        return true;
    };

    const reset = () => {
        board = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "]
        ];
    };

    const getBoard = () => board;

    return {
        printBoard,
        setMove,
        isValidMove,
        isFull,
        reset,
        getBoard
    };
})();

// ===== Game Controller Module =====
const Game = (() => {
    let player1, player2, currentPlayer;

    const init = () => {
        const player1Name = prompt(`Enter name for Player 1:`);
        const player1Symbol = prompt(`Enter symbol for ${player1Name} ('X'/'O')`);
        const player2Name = prompt(`Enter name for Player 2:`);
        let player2Symbol = prompt(`Enter symbol for ${player2Name} ('X'/'O')`);

        // Prevent duplicate symbols
        if (player1Symbol === player2Symbol) {
            alert("Both players can't have the same symbol! Assigning default symbols.");
            player1Symbol = "X";
            player2Symbol = "O";
        }

        player1 = Player(player1Name, player1Symbol);
        player2 = Player(player2Name, player2Symbol);
        currentPlayer = player1;

        play();
    };

    const getMove = () => {
        const row = parseInt(prompt(`${currentPlayer.name} (${currentPlayer.symbol}), enter row (0, 1, 2):`));
        const column = parseInt(prompt(`${currentPlayer.name} (${currentPlayer.symbol}), enter column (0, 1, 2):`));
        return { row, column };
    };

    const checkWin = (symbol) => {
        const board = Gameboard.getBoard();

        for (let i = 0; i < 3; i++) {
            if (
                board[i][0] === symbol && board[i][1] === symbol && board[i][2] === symbol ||
                board[0][i] === symbol && board[1][i] === symbol && board[2][i] === symbol
            ) {
                return true;
            }
        }

        if (
            board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol ||
            board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol
        ) {
            return true;
        }

        return false;
    };

    const play = () => {
        while (true) {
            Gameboard.printBoard();

            let move = getMove();
            while (!Gameboard.isValidMove(move.row, move.column)) {
                alert("Invalid move! Try again.");
                move = getMove();
            }

            Gameboard.setMove(move.row, move.column, currentPlayer.symbol);

            if (checkWin(currentPlayer.symbol)) {
                Gameboard.printBoard();
                alert(`${currentPlayer.name} wins!`);
                break;
            }

            if (Gameboard.isFull()) {
                Gameboard.printBoard();
                alert("It's a draw!");
                break;
            }

            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    };

    return {
        init
    };
})();

// ===== Run Game =====
Game.init();
