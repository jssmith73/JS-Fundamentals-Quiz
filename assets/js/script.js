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

import { questions } from "./questions";

//Loads random question from questions.js

function getQuestion(questions) {
     questionTitle.textContent = questions.title;
     optionsList.innerHTML = "";

     questions.options.forEach(function(option, index) {
        var listItem = document.createElement("li");
        listItem.textContent = option;
        optionsList.appendChild(listItem);
     });
    }

function checkAnswer(selectedIndex, question) {
    var selectedOption = question.otipns[selectedIndex];
    if (selectedOption === questions.answer) {
        resultElement.textContent = "Correct!";
    }    else {
        resultElement.textContent = "Incorrect. The correct answer is: " + question.answer;
    }
}

submitButton.addEventListener("click", function() {
    var selectedOptionIndex = document.querySelector('input[name="option"]:checked').value;
    checkAnswer(selectedOptionIndex, questions[currentQuestionIndex]);
});

var currentQuestionIndex = Math.floor(Math.random() * questions.length);
displayQuestion(questions[currentQuestionIndex]);
      
    //  var currentQuestion = questions[questionsIndex];

    //  titleEl.textContent = currentQuestion.title;



    //  console.log("Question:", randomQuestion.title);
    //  for (var i = 0; i < randomQuestion.options.length; i++) {
    //     console.log(String.fromCharCode(97 + 1) + ") " + randomQuestion.options[1]);
    //  }

    //  var inputAnswer = "";

    //  if (randomQuestion.options[userAnswer.charCodeAt(0) - 97] === randomQuestion.answer) {
    //     console.log("Correct!");
    //  } else {
    //     console.log("Incorrect. The correct answer is:". randomQuestion.answer);
    //  }
        

//Set timer function

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
}, 1000);
}

//Button that starts timer and loads question

startButton.addEventListener("click", setTime, getQuestion);

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