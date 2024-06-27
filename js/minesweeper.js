const ROWS = 10;
const COLS = 10;
const MINES = 20;

let board = [];
let revealedCells = [];
let gameEnded = false;

document.addEventListener('DOMContentLoaded', () => {
    initializeBoard();
    renderBoard();
});

function initializeBoard() {
    board = [];
    revealedCells = [];
    gameEnded = false;

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

    let placedMines = 0;
    while (placedMines < MINES) {
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);
        if (!board[row][col].hasMine) {
            board[row][col].hasMine = true;
            placedMines++;
        }
    }

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

function revealCell(row, col) {
    if (gameEnded || row < 0 || row >= ROWS || col < 0 || col >= COLS || revealedCells[row][col]) {
        return;
    }

    revealedCells[row][col] = true;
    const cell = board[row][col];

    if (cell.hasMine) {
        gameEnded = true;
        showModal('Game Over', 'You clicked on a mine! Game over.');
    } else {
        if (cell.count === 0) {
            for (let di = -1; di <= 1; di++) {
                for (let dj = -1; dj <= 1; dj++) {
                    revealCell(row + di, col + dj);
                }
            }
        }
    }

    let allCellsRevealed = true;
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (!board[i][j].hasMine && !revealedCells[i][j]) {
                allCellsRevealed = false;
                break;
            }
        }
        if (!allCellsRevealed) {
            break;
        }
    }

    if (allCellsRevealed) {
        gameEnded = true;
        showModal('You Win!', 'Congratulations! You revealed all non-mine cells.');
    }

    renderBoard();
}

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
                if (cell.hasMine) {
                    // Display bomb image instead of text 'X'
                    const bombImage = document.createElement('img');
                    bombImage.src = 'bomb.png';
                    bombImage.alt = 'Bomb';
                    bombImage.style.width = '100%';  // Set the image width to 100% of the cell
                    bombImage.style.height = '100%'; // Set the image height to 100% of the cell
                    cellDiv.appendChild(bombImage);
                } else {
                    cellDiv.textContent = cell.count === 0 ? '' : cell.count;
                }
            } else {
                cellDiv.textContent = '';
                cellDiv.addEventListener('click', () => revealCell(i, j));
            }

            gameBoard.appendChild(cellDiv);
        }
    }
}



function showModal(title, message) {
    const modal = document.getElementById('gameModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalCloseButton = document.querySelector('.close');

    modalTitle.textContent = title;
    modalMessage.textContent = message;

    modal.style.display = 'block';

    modalCloseButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

const resetGameButton = document.getElementById('resetGame');
if (resetGameButton) {
    resetGameButton.addEventListener('click', () => {
        const modal = document.getElementById('gameModal');
        modal.style.display = 'none';
        initializeBoard();
        renderBoard();
    });
}

window.addEventListener('click', event => {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
