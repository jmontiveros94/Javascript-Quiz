console.log(window.document);
console.log(document.documentElement);

var quizData = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    options: ["variable x = 5", "var x = 5", "v x =5", "let x =5"],
    correctAnswer: 1
  },
  {
    question: "Which of the following is used to output data to the browser's console?",
    options: ["print()", "log()", "console.log()", " display()"],
    correctAnswer: 2
  },
  {
    question: "What is the purpose of the return statement in a JavaScript function?",
    options: ["It stops the function from executing.", "It defines a new variable.", "It returns a value from the function.", "It adds comments to the code."],
    correctAnswer: 2
  }
];

let currentQuestion = 0;
let score = 0;

var questionElement = document.getElementById("question");
var optionsContainer = document.getElementById("options-container");
var options = document.getElementsByClassName("option");

function showQuestion() {
  if (currentQuestion < quizData.length) {
    var currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;

    for (let i = 0; i < options.length; i++) {
      options[i].textContent = currentQuizData.options[i];
    }
  } else {
    // Quiz is completed, show the final score or other completion message
    questionElement.textContent = "Quiz completed! Your score is: " + score;
    optionsContainer.innerHTML = "";
  }
}

function checkAnswer(optionIndex) {
  var currentQuizData = quizData[currentQuestion];
  if (optionIndex === currentQuizData.correctAnswer) {
    score++;
  }

  currentQuestion++;
  showQuestion();
}
// Timer 
var timeElement = document.getElementById('time');
let timeLeft = 60;

function updateTimer() {
  timeElement.textContent = timeLeft + ' seconds';
}

function startQuiz() {
  var interval = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(interval);
      alert('Time is up!');
    } else {
      updateTimer();
      timeLeft--;
    }
  }, 1000);
}

function wrongAnswer() {
  timeLeft -= 10;
  updateTimer();
  function checkAnswer(selectedOption) {
    if (selectedOption !== correctAnswer) {
      wrongAnswer(); // Calls this function if the answer is wrong
    }
  }

}

const highScoresList = document.getElementById('high-scores-list');

const scores = []; // Array to store high scores

function displayHighScores() {
  highScoresList.innerHTML = '';
  scores.forEach((score, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${score}`;
    highScoresList.appendChild(listItem);
  });
}

function updateHighScores(newScore) {
  scores.push(newScore);
  scores.sort((a, b) => b - a); // Sort scores in descending order
  if (scores.length > 5) {
    scores.pop(); // Keep only the top 10 scores
  }
  displayHighScores();
}

// Call this function whenever a user completes the quiz and their score needs to be added
function quizCompleted(score) {
  updateHighScores(score);
}

startQuiz();

// Starts the quiz
showQuestion();
