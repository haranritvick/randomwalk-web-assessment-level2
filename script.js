const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const themeButton = document.getElementById('themeButton');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0 }; // Track scores

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.getAttribute('data-index');

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    clickSound.play();
    updateCell(cell, cellIndex);
    checkResult();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? '#ff6f61' : '#61b15a';
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        winSound.play();
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        scores[currentPlayer] += 1; // Update score
        updateScores();
        gameActive = false;
        return;
    }

    const roundDraw = !board.includes('');
    if (roundDraw) {
        drawSound.play();
        statusText.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    changePlayer();
}

function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function restartGame() {
    restartSound.play();
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '#000';
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    themeButton.classList.toggle('dark-mode');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
themeButton.addEventListener('click', toggleTheme);
