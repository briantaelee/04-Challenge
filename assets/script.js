//click start button
//60 second timer begins and first question pops up
//when question is answerd, another question pops up
//if answer is wrong, subtract time from timer
//if all questions are answered or timer runs out, game is over
//when game finishes, enter initials to save score.

const startBtn = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.querySelectorAll('.answer-btn');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const scoreContainer = document.getElementById('score-container');
const initialsInput = document.getElementById('initials');
const submitScoreBtn = document.getElementById('submit-score');
const timer = document.querySelector(`.game-timer`);

let savedScores = JSON.parse(localStorage.getItem('savedScores'))||[]
let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;

const questions = [
  {
    question: 'The condition in an if / else statement is enclosed within ____',
    answers: [
      { text: 'quotes', correct: false },
      { text: 'curly brackets', correct: true },
      { text: 'parenthesis', correct: false },
      { text: 'square brackets', correct: false }
    ]
  },
  {
    question: `Commonly used data types DO NOT include:`,
    answers: [
    {text: `strings`, correct: false},
    {text: `booleans`, correct: false},
    {text: `alerts`, correct: true},
    {text: `numbers`, correct: false},
    ]
  },
  {
    question: `A very useful tool used during development and debugging for printing content to the debugger is:`,
    answers: [
    {text: `JavaScript`, correct: false},
    {text: `terminal / bash`, correct: false},
    {text: `for loops`, correct: false},
    {text: `console log`, correct: true},
    ]
  },
  {
    question: `Arrays in JavaScript can be used to store`,
    answers: [
    {text: `numbers and strings`, correct: false},
    {text: `other arrays`, correct: false},
    {text: `booleans`, correct: false},
    {text: `all of the above`, correct: true},
    ]
  },
  {
    question: `String values must be enclosed within ____ when being assigned to variables.`,
    answers: [
    {text: `commas`, correct: false},
    {text: `curly brackets`, correct: false},
    {text: `quotes`, correct: true},
    {text: `paranthesis`, correct: false},
    ]
  }
  
];

startBtn.addEventListener('click', startQuiz);
questionContainer.style.display = 'none';
scoreContainer.style.display = 'none'; 

function startQuiz() {
  startBtn.style.display = 'none';
  questionContainer.style.display = 'block';
  startTimer();
  displayQuestion();
}

function endQuiz() {
  questionContainer.style.display = 'none';
  resultContainer.style.display = 'none';
  scoreContainer.style.display = 'block';
  initialsInput.style.display = 'block'; 
  submitScoreBtn.style.display = 'block'; 
  document.getElementById('final-score').textContent = `Your final score: ${score}`;
}


function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  answerButtons.forEach((button, index) => {
    button.textContent = currentQuestion.answers[index].text;
    button.addEventListener('click', handleAnswerClick);
  });
}

function handleAnswerClick(event) {
  const selectedButton = event.target;
  const selectedIndex = Array.from(answerButtons).indexOf(selectedButton);
  const isCorrect = questions[currentQuestionIndex].answers[selectedIndex].correct;
  checkAnswer(isCorrect);
}


function checkAnswer(correct) {
  if (correct) {
    score++;
    resultText.textContent = 'Correct!';
  } else {
    timeLeft -= 5;
    resultText.textContent = 'Wrong!';
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  if (!timer) {
    console.error("Timer element not found in the DOM.");
    return; 
  }

  const timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timer.textContent = `Time Left: ${timeLeft} seconds`;
      timeLeft--;
    } else {
      clearInterval(timerInterval);
      timer.textContent = "Time's up!";
      endQuiz();
    }
  }, 1000);
}


submitScoreBtn.addEventListener('click', () => {
  const initials = initialsInput.value.trim();
  if (initials !== '') {
    savedScores.push({ initials, score });
    localStorage.setItem('savedScores', JSON.stringify(savedScores));
    displaySavedScores(); 
  }
});

function displaySavedScores() {
  var scores = JSON.parse(localStorage.getItem('savedScores'))
  console.log(scores)
  let list = document.getElementById("myList");
        for (i = 0; i < savedScores.length; ++i) {
            let li = document.createElement('li');
            li.innerText = savedScores[i].initials + ': ' + savedScores[i].score;
            list.appendChild(li);
        }
}

