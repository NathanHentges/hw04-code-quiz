
// Grab DOM elements                    ==================
var startCard = document.getElementById("start");
var gameOverCard = document.getElementById("gameover");
var scoreCard = document.getElementById("highscores");

var questionCards = document.getElementById("question-container");

var startBtn = document.getElementById("start-button");
var submitBtn = document.getElementById("hs-submit")
var backBtn = document.getElementById("hs-back");
var clearBtn = document.getElementById("hs-clear");

var viewHs = document.getElementById("view-hs");
var initials = document.getElementById("name-hs");
var hsList = document.getElementById("highscore-list");

var timeLeft = document.getElementById("time-left");
var mainEl = document.getElementById("main");
var quizScore = document.getElementById("quiz-score");

// Global variables

const timeAllowed = 30;

var gameRunning = false;

var currentQuestion = 0;
var currentScore = timeAllowed;

var timer = null;

// Bind click events                    ==================
document.addEventListener("click", docClick);

function docClick(event) {
  event.preventDefault();
  switch (event.target) {
    case startBtn:
      startClick();
      break;
    case submitBtn:
      submitClick();
      break;
    case backBtn:
      backClick();
      break;
    case clearBtn:
      clearClick();
      break;
    case viewHs:
      viewHsClick();
      break;
      
      default:
        // Check if button for question is pressed
        if (event.target.classList.contains("question-button")) {
          questionAnswered(event.target);
        }
      break;
  }
}

// Functions for various button clicks  ==================
function startClick() {
  hideEl(startCard);
  startQuiz();
}
function submitClick() {
  let scoreString = `Player ${initials.value} scored ${currentScore}`
  localStorage.setItem(localStorage.length, scoreString);

  hideEl(gameOverCard);
  showEl(scoreCard);
  showScores();
}
function backClick() {
  hideEl(scoreCard);
  showEl(startCard);
}
function clearClick() {
  localStorage.clear();
  showScores();
}
function viewHsClick() {
  // check if game is running, ignore if it isf
  if (!gameRunning) {
    hideEl(startCard);
    hideEl(gameOverCard);
    showEl(scoreCard);
    showScores();
  }
}

// Side functions                       ==================

function runTimer() {
  // Initialize
  currentScore = timeAllowed;
  timeLeft.innerText = currentScore;

  timer = setInterval(function() {
    if (currentScore > 0) {
      currentScore--;
      timeLeft.innerText = currentScore;
    } else {
      // Time ran out
      gameOver();
    }
  }, 1000);
}

function showScores() {
  hsList.textContent="";
  for (let i = 0; i < localStorage.length; i++) {
    let scoreUnit = document.createElement("div")
    scoreUnit.setAttribute("class", "user-score");
    if (i % 2 === 0) {
      scoreUnit.setAttribute("class", "alt-user-score")
    }
    scoreUnit.innerText = `${i+1}. ${localStorage[i]}`
    hsList.append(scoreUnit);
  }
}

// Hide/show things
function hideEl(elem) {
  elem.classList.add("hidden");
}
function showEl(elem) {
  elem.classList.remove("hidden");
}

// Handles what happens when question is answered
function questionAnswered(choice) {
  if (! choice.dataset.correct) {
    mainEl.classList.add("wrong-answer");
    setTimeout(function() {
      mainEl.classList.remove("wrong-answer");
    }, 500);
    currentScore -= 10;
    if (currentScore <= 0) {
      currentScore = 0;
      timeLeft.innerText = currentScore;
      gameOver();
      return;
    }
    timeLeft.innerText = currentScore;
  } else {
    // Correct choice
    mainEl.classList.add("right-answer");
    setTimeout(function() {
      mainEl.classList.remove("right-answer");
    }, 500);
  }
  
  hideEl(questionCards.children[currentQuestion]);
  if (currentQuestion >= questionCards.childElementCount - 1) {
    // No more questions
    gameOver();
  } else {
    currentQuestion++;
    // Question answered, show next question card
    showEl(questionCards.children[currentQuestion]);
  }
}



// Main quiz logic                      ==================
function startQuiz() {
  mainEl.classList.remove("wrong-answer", "right-answer");
  gameRunning = true;
  viewHs.classList.add("not-allowed");
  runTimer();
  currentQuestion = 0;
  
  // Show first question card to start the question progression
  let question = questionCards.children[currentQuestion];
  showEl(question);
  
}

function gameOver() {
  clearInterval(timer);
  hideEl(questionCards.children[currentQuestion]);
  showEl(gameOverCard);
  quizScore.innerText = currentScore;
  viewHs.classList.remove("not-allowed");
  gameRunning = false;
}




