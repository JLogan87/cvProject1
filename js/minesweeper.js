// Define constants for game settings
const ROWS = 10;
const COLS = 10;
const MINES = 20;

// Game state variables
let board = [];
let revealedCells = [];

// Initialize game board
function initializeBoard() {
    board = [];
    revealedCells = [];

    for (let i = 0; i < ROWS; i++) {
        board.push([]);
        revealedCells.push([]);

        for (let j = 0; j < COLS; j++) {
            board[i].push({
                hasMine: false,
                count: 0,
                revealed: false
            });
            revealedCells[i].push(false);
        }
    }

    // Place mines randomly
    let placedMines = 0;
    while (placedMines < MINES) {
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);
        if (!board[row][col].hasMine) {
            board[row][col].hasMine = true;
            placedMines++;
        }
    }

    // Calculate neighbor counts
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (board[i][j].hasMine) continue;

            let count = 0;
            for (let di = -1; di <= 1; di++) {
                for (let dj = -1; dj <= 1; dj++) {
                    const ni = i + di;
                    const nj = j + dj;
                    if (ni >= 0 && ni < ROWS && nj >= 0 && nj < COLS && board[ni][nj].hasMine) {
                        count++;
                    }
                }
            }
            board[i][j].count = count;
        }
    }
}

// Function to reveal cell and check game status
function revealCell(row, col) {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS || revealedCells[row][col]) {
        return;
    }

    revealedCells[row][col] = true;
    const cell = board[row][col];

    if (cell.hasMine) {
        // Game over logic
        console.log('Game over!');
        // You can add more logic to handle game over state, e.g., showing all mines
    } else {
        // Check for win condition if all non-mine cells are revealed
        let allCellsRevealed = true;
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (!board[i][j].hasMine && !revealedCells[i][j]) {
                    allCellsRevealed = false;
                    break;
                }
            }
            if (!allCellsRevealed) break;
        }

        if (allCellsRevealed) {
            console.log('You win!');
            // You can add more logic to handle win state
        }
    }

    // Additional logic to handle revealing neighboring cells if count is 0
    // Example: recursively reveal neighboring cells if count is 0
    if (cell.count === 0) {
        for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
                revealCell(row + di, col + dj);
            }
        }
    }

    // Update UI after revealing cell
    renderBoard();
}

// Function to render the game board to the DOM
function renderBoard() {
    const gameBoard = document.getElementById('gameBoard');
    if (!gameBoard) return;

    gameBoard.innerHTML = '';

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            const cell = board[i][j];
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            if (revealedCells[i][j]) {
                cellDiv.textContent = cell.hasMine ? 'X' : (cell.count === 0 ? '' : cell.count);
            } else {
                cellDiv.textContent = '';
                cellDiv.addEventListener('click', () => revealCell(i, j));
            }
            gameBoard.appendChild(cellDiv);
        }
    }
}

// Initialize the game board on page load
initializeBoard();
renderBoard();
