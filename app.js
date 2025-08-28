// === Chess square color logic ===
function isWhiteSquare(square) {
  const file = square.charCodeAt(0) - 'a'.charCodeAt(0); // 0-7
  const rank = parseInt(square[1], 10) - 1; // 0-7
  // even = black, odd = white
  return (file + rank) % 2 !== 0;
}

function getRandomSquare() {
  const files = 'abcdefgh';
  const ranks = '12345678';
  return files[Math.floor(Math.random() * 8)] + ranks[Math.floor(Math.random() * 8)];
}

// === Game State ===
let correctCount = 0;
let wrongCount = 0;
let timeLeft = 0;
let totalQuestions = 0;
let questionsLeft = 0;
let timer = null;
let currentSquare = "";
let gameRunning = false;

// === DOM Elements ===
const squareDisplay = document.getElementById('square-display');
const correctCountEl = document.getElementById('correct-count');
const wrongCountEl = document.getElementById('wrong-count');
const timeLeftEl = document.getElementById('time-left');
const questionsLeftEl = document.getElementById('questions-left');
const resultEl = document.getElementById('result');
const btnWhite = document.getElementById('btn-white');
const btnBlack = document.getElementById('btn-black');
const btnStart = document.getElementById('btn-start');
const progressBar = document.getElementById('progress-bar');

// === Functions ===
function updateProgressBar() {
  const progress = ((totalQuestions - questionsLeft) / totalQuestions) * 100;
  progressBar.style.width = progress + "%";
}

function newRound() {
  if (questionsLeft <= 0) {
    endGame();
    return;
  }
  currentSquare = getRandomSquare();
  squareDisplay.textContent = currentSquare;
  questionsLeftEl.textContent = questionsLeft;
  updateProgressBar();
}

function checkAnswer(answer) {
  if (!gameRunning || questionsLeft <= 0) return;

  const correctColor = isWhiteSquare(currentSquare) ? 'white' : 'black';
  if (answer === correctColor) {
    correctCount++;
    correctCountEl.textContent = correctCount;
  } else {
    wrongCount++;
    wrongCountEl.textContent = wrongCount;
  }
  questionsLeft--;
  newRound();
}

function startGame() {
  if (timeLeft === 0 || totalQuestions === 0) {
    alert("Select timer first!");
    return;
  }
  // Reset state
  correctCount = 0;
  wrongCount = 0;
  questionsLeft = totalQuestions;
  correctCountEl.textContent = 0;
  wrongCountEl.textContent = 0;
  progressBar.style.width = "0%";
  resultEl.textContent = "";
  gameRunning = true;

  // Show first square
  newRound();

  // Timer
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeLeftEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameRunning = false;
  resultEl.textContent = `Time's up! Correct: ${correctCount}, Wrong: ${wrongCount}`;
  questionsLeft = 0;
  updateProgressBar();
}

// === Event Listeners ===
btnWhite.addEventListener('click', () => checkAnswer('white'));
btnBlack.addEventListener('click', () => checkAnswer('black'));
btnStart.addEventListener('click', startGame);

document.querySelectorAll('.timer-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    timeLeft = parseInt(btn.dataset.time, 10);
    totalQuestions = parseInt(btn.dataset.questions, 10);
    questionsLeft = totalQuestions;
    timeLeftEl.textContent = timeLeft;
    questionsLeftEl.textContent = questionsLeft;
    progressBar.style.width = "0%";
    resultEl.textContent = "Press Start to begin!";
  });
});
