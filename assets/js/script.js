var timerEl = document.querySelector(".timer");
var isWin = false;
var startButton = document.getElementById("button1");
var hiddenDiv = document.querySelector(".finish");
var titleEl = document.querySelector("#question-title")
var secondsLeft = 75;
var questionContainer = document.getElementById("question-container");
var questionTitle = document.getElementById("question-title");
var optionsList = document.getElementById("options-list");
var submitButton = document.getElementById("submit");
var resultElement = document.getElementById("result");
var questionIndex = 0;
var highscoreMsg = document.querySelector(".highscoreMsg");
var initials = document.getElementById("initials");
var wins = document.getElementById("winLog");
var losses = document.getElementById("loseLog");

var questions = [
    {
        title: "Which of these stores the values 'true' and 'false'?",
        options: ["Numbers", "Booleans", "Prompts", "Strings"],
        answer: "Booleans",
    },
    {
        title: "The condition in an if / else statement is enclosed within _________.",
        options: ["quotes", "curly brackets", "parentheses", "All of the above"],
        answer: "parentheses",
    },
    
    {
        title: "String values must be enclosed within ______ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes",
    },
    
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["Javascript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log",
    },
    
    {
        title: "Arrays in JavaScript can be used to store ________",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
    },
    
    {
        title: "1+1=____",
        options: ["3", "3.0", "2", "11"],
        answer: "2",
    }
    ]


//Button that starts timer and starts quiz

    startButton.addEventListener("click", setTime);

    //Loads random question from questions.js

function getQuestion() {
    if (questionIndex < questions.length) {
    var currentQuestion = questions[questionIndex];
     questionTitle.textContent = currentQuestion.title;
     optionsList.innerHTML = "";

     currentQuestion.options.forEach(function(_option_) {
        var listItem = document.createElement("li");
        listItem.textContent = _option_;
        optionsList.appendChild(listItem);
        listItem.value = _option_;
        listItem.addEventListener("click", checkAnswer);
     });
    }
}

function checkAnswer(event) {
    var questionQuess = event.target.textContent;
    console.log(questionIndex);
    var currentQuestion = questions[questionIndex];
    var selectedOption = currentQuestion.answer;
    if (selectedOption === questionQuess) {
        resultElement.textContent = "Correct!";
        questionIndex++;

    }   else {
        resultElement.textContent = "Incorrect. The correct answer is: " + currentQuestion.answer;
        questionIndex++;
        secondsLeft = secondsLeft-15;
    } 
    getQuestion();

    if (questionIndex > questions.length) {
        clearInterval(timerInterval);
        endMessage();
        startButton.disabled = false;
        questionIndex = 0;
    }
    getQuestion();
}

function setTime() {

    startButton.disabled = true;

    var timerInterval = setInterval(function() {
        timerEl.innerHTML = secondsLeft;
        secondsLeft--;

        if (secondsLeft > 0 && questionIndex === questions.length && questions.answer !== "") {
            clearInterval(timerInterval);
            winMessage();
            }
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz() 
        } else {
            getQuestion();
        }}, 1000)
    }

function endQuiz() {
    endMessage();
    secondsLeft=75;
}

//Win message

function winMessage() {
    timerEl.innerHTML = "YOU FINISHED!";
    unHideDiv();
}

//Lose message

function endMessage() {
    timerEl.innerHTML = "Out of time :(";
}

//Hides finish page until quiz is passed

function unHideDiv() {

    if (secondsLeft > 0) {
        hiddenDiv.style.display = "contents";
    }
}

function saveScore() {

if (initials !== "") {

scores = JSON.parse(window.localStorage.getItem("scores")) || [];

var newScore = {
    score: secondsLeft,
    initials: initials,
};

scores.push(newScore);
window.localStorage.setItem("scores", JSON.stringify(scores));
}
}


// submitButton.addEventListener("click", function(event) {
// event.preventDefault();


// localStorage.setItem("wins", JSON.stringify(wins));
// localStorage.setItem("losses",JSON.stringify(losses));

function saveWins() {
    var previousWin = JSON.parse(localStorage.getItem(wins))
    if (previousWin !== null) {
        document.querySelector("#winLog").textContent = previousWin;
    }
}

function saveLoss() {
    var previousLoss = JSON.parse(localStorage.getItem(losses))
    if (previousLoss !== null) {
        document.querySelector("#loseLog").textContent = previousLoss;
    }
}