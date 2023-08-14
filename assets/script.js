

var startButton = document.querySelector(".button");
var timerEl = document.querySelector(".timer");


startButton.addEventListener("click", setTime());


function setTime() {

    var secondsLeft = 75;

    var timerInterval = setInterval(function() {
        
        if (secondsLeft > 0) {
        timerEl.innerHTML = secondsLeft;
        secondsLeft--;
        }
        else (secondsLeft === 0) {
        clearInterval(timerInterval);
        endMessage();
        }
}, 1000);
}

function endMessage {
    timerEl.innerHTML = "Out of time :(";
}





