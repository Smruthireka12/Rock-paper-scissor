const choices = ["rock", "paper", "scissors"];
let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;
let lastPlayerChoice = null;

const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const resultDiv = document.getElementById("result");

const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const drawSound = document.getElementById("draw-sound");

document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = getWinner(playerChoice, computerChoice);

    lastPlayerChoice = playerChoice;

    updateScores(result);
    showResult(result, playerChoice, computerChoice);
    playSound(result);
    saveScores();
  });
});

document.getElementById("reset").addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  localStorage.clear();
  updateScoreDisplay();
  resultDiv.textContent = "Scores reset. Make your move!";
});

function getComputerChoice() {
  // Basic AI Prediction: counter last player move
  if (lastPlayerChoice) {
    if (lastPlayerChoice === "rock") return "paper";
    if (lastPlayerChoice === "paper") return "scissors";
    if (lastPlayerChoice === "scissors") return "rock";
  }
  return choices[Math.floor(Math.random() * 3)];
}

function getWinner(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "player";
  }
  return "computer";
}

function updateScores(result) {
  if (result === "player") playerScore++;
  if (result === "computer") computerScore++;
  updateScoreDisplay();
}

function updateScoreDisplay() {
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
}

function saveScores() {
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
}

function showResult(result, player, computer) {
  if (result === "draw") {
    resultDiv.textContent = `🤝 It's a draw! You both chose ${player}`;
  } else if (result === "player") {
    resultDiv.textContent = `🎉 You win! ${player} beats ${computer}`;
  } else {
    resultDiv.textContent = `😞 You lose! ${computer} beats ${player}`;
  }
}

function playSound(result) {
  if (result === "player") winSound.play();
  else if (result === "computer") loseSound.play();
  else drawSound.play();
}

// Initial load scores
updateScoreDisplay();