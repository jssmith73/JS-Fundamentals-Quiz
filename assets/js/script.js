

var startButton = document.querySelector(".btn");
var timerEl = document.querySelector(".timer");

var secondsLeft = 75;

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.innerHTML = secondsLeft;

        if(secondsLeft === 0) {
        clearInterval(timerInterval);
    }
}, 1000);
}


