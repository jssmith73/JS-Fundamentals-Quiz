var timerEl = document.querySelector(".timer");
var startButton = document.getElementById("button1");
var hiddenDiv = document.querySelector(".finish");
var titleEl = document.querySelector("#question-title")
var secondsLeft = 75;
var questionContainer = document.getElementById("question-container");
var questionTitle = document.getElementById("question-title");
var optionsList = document.getElementById("options-list");
var submitButton = document.querySelector(".submit");
var resultElement = document.getElementById("result");
var questionIndex = 0;
var highscoreMsg = document.querySelector(".highscoreMsg");
var initials = document.getElementById("initials");
var wins = document.getElementById("winLog");
var wins2 = document.getElementById("winLog2");
var wins3 = document.getElementById("winLog3")
var finalScore = document.querySelector(".timer");
    
var questions = [
    {
        title: "Which of these stores the values 'true' and 'false'?",
        options: ["Numbers", "Booleans", "Prompts", "Strings"],
        answer: "Booleans",
    },
    {
        title: "The condition in an if / else statement is enclosed within _________.",
        options: ["parentheses", "curly brackets", "quotes", "All of the above"],
        answer: "parentheses",
    },
    
    {
        title: "String values must be enclosed within ______ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes",
    },
    
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["Javascript", "console.log", "for loops", "terminal / bash"],
        answer: "console.log",
    },
    
    {
        title: "Arrays in JavaScript can be used to store ________",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
    },
    
    {
        title: "________ comments out one or multiple lines of code, disabling it without deleting.",
        options: ["//", "**", "{}", "[]"],
        answer: "//",
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

//Checks if correct answer is selected

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

//Sets timer countdown

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

timerEl.textContent = secondsLeft;

//Message displays if timer runs out

function endQuiz() {
    endMessage();
}

//Win message displays after all questions are answered

function winMessage() {
    unHideDiv();
    var finalScore = document.querySelector(".timer");
    finalScore.textContent = secondsLeft;
    console.log(secondsLeft);
}

//Lose message

function endMessage() {
    timerEl.innerHTML = "Out of time :(";
}

//Hides finish page until quiz is passed

function unHideDiv() {

    showScores();

    if (secondsLeft > 0) {
        hiddenDiv.style.display = "contents";
    }
}

//Logs score to local storage

function logScore() {

    var newScore = {
        score: timerEl.textContent,
        initials: initials.value,
    };

console.log(newScore);

    if (!localStorage.getItem("scores")) {
        scores = []
        scores.push(newScore)
        window.localStorage.setItem("scores", JSON.stringify(scores));
    } else {
        scores = JSON.parse(window.localStorage.getItem("scores"));
        scores.push(newScore)
        console.log(scores);
        window.localStorage.setItem("scores", JSON.stringify(scores));
    }
}

submitButton.addEventListener("click", function() {
    localStorage.clear()
    logScore();
    document.getElementById("confirm").textContent = "Submitted!"

})

//Shows previous score on the right

function showScores() {
    if (localStorage.getItem("scores")) {
       
        var x = JSON.parse(localStorage.getItem("scores"))[0]
        wins.innerHTML = "Initials: " + x.initials + ", Score: " + x.score;
    }
}

showScores();