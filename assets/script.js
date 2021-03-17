
// Grab DOM elements                    ==================
var startCard = document.getElementById("start");
var gameoverCard = document.getElementById("gameover");
var scoreCard = document.getElementById("highscores");

var questionCards = document.getElementById("question-container");

var startBtn = document.getElementById("start-button");
var submitBtn = document.getElementById("hs-submit")
var backBtn = document.getElementById("hs-back");
var clearBtn = document.getElementById("hs-clear");

var viewHs = document.getElementById("view-hs");

// Global variables

var currentQuestion = 0;

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
      console.log("nothing important");
      break;
  }
}

// Functions for various button clicks  ==================
function startClick() {
  startCard.classList.add("hidden");
  startQuiz();
}
function submitClick() {

}
function backClick() {

}
function clearClick() {

}
function viewHsClick() {

}


// Main quiz logic                      ==================
function startQuiz() {
  let question = questionCards.children[currentQuestion];
  question.classList.remove("hidden")
}





