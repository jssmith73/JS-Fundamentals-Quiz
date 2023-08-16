var timerEl = document.querySelector(".timer");
var isWin = false;
var startButton = document.getElementById("button1");
var hiddenDiv = document.querySelector(".finish");
var titleEl = document.querySelector("#question-title")
var secondsLeft = 75;
var questionContainer = document.getElementById("question-container");
var questionTitle = document.getElementById("question-title");
var optionsList = document.getElementById("options-list");
var submitButton = document.getElementById("submitBtn");
var resultElement = document.getElementById("result");
var questionIndex = 0;

import * as questions from './questions'

// var questions = [
//     {
//         title: "Which of these stores the values 'true' and 'false'?",
//         options: ["Numbers", "Booleans", "Prompts", "Strings"],
//         answer: "Booleans",
//     },
//     {
//         title: "The condition in an if / else statement is enclosed within _________.",
//         options: ["quotes", "curly brackets", "parentheses", "All of the above"],
//         answer: "All of the above",
//     },
    
//     {
//         title: "String values must be enclosed within ______ when being assigned to variables.",
//         options: ["commas", "curly brackets", "quotes", "parentheses"],
//     },
    
//     {
//         title: "A very useful too used during development and debuggin for printing content to the debugger is:",
//         options: ["Javascript", "terminal / bash", "for loops", "console.log"],
//         answer: "console.log",
//     },
    
//     {
//         title: "Arrays in JavaScript can be used to store ________",
//         options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
//         answer: "all of the above",
//     },
    
//     {
//         title: "1+1=____",
//         options: ["3", "3.0", "2", "11"],
//         answer: "2",
//     }
//     ]


//Button that starts timer and starts quiz

    startButton.addEventListener("click", setTime);

    //Loads random question from questions.js

function getQuestion() {
    var currentQuestion = questions[questionIndex];
    console.log(currentQuestion)
     questionTitle.textContent = currentQuestion.title;
     optionsList.innerHTML = "";

     currentQuestion.options.forEach(function(option, index) {
        var listItem = document.createElement("li");
        listItem.textContent = option;
        optionsList.appendChild(listItem);
        listItem.value = option;
        listItem.addEventListener("click", checkAnswer)
     });
    }

function checkAnswer(event) {
    var questionQuess = event.target.textContent;
    console.log(questionQuess);
    var currentQuestion = questions[questionIndex];
    var selectedOption = currentQuestion.answer;
    if (selectedOption === questionQuess) {
        resultElement.textContent = "Correct!";
        questionIndex++;

    }    else {
        resultElement.textContent = "Incorrect. The correct answer is: " + currentQuestion.answer;
        questionIndex++;
        secondsLeft = secondsLeft-15;
    } 
    getQuestion();
}

submitButton.addEventListener("click", function() {
    var selectedOptionIndex = document.querySelector("#answer-input").value;
    checkAnswer(selectedOptionIndex, questions[questionIndex]);
});

// var currentQuestionIndex = Math.floor(Math.random() * questions.length);
// getQuestion(questions[currentQuestionIndex]);

function setTime() {

    startButton.disabled = true;

    

    var timerInterval = setInterval(function() {
        timerEl.innerHTML = secondsLeft;
        secondsLeft--;

        if (secondsLeft > 0) {
            hideDiv(hiddenDiv);
            if (isWin === true && secondsLeft > 0) {
            clearInterval(timerInterval);
            winMessage();
            }
        }
        
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            endMessage();
            startButton.disabled = false;
            hideDiv()
            }

}, 1000)

getQuestion();

}

//Win message

function winMessage() {
    timerEl.innerHTML = "YOU PASS!";
}

//Lose message

function endMessage() {
    timerEl.innerHTML = "Out of time :(";
}

function passQuiz() {

}

//Hides finish page until quiz is passed

function hideDiv() {

    if (secondsLeft > 0 && isWin === true) {
        hiddenDiv.style.display = "block";
    } 
    else {
        hiddenDiv.style.display = "none";
    }
}