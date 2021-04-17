"use strict";

var addGuesses = document.querySelector('.add-guesses'); // form class to add guess

var guessesList = document.querySelector('.guesses-list'); //guess list

var chancesLeft = document.querySelector('.chancesLeft'); //chances left div

var timeBlock = document.querySelector('timer-container'); // timer div

var guessInput = document.querySelector('#guess-input');
var audio = document.getElementById('audio');
var playPauseButton = document.querySelector('.playPauseButton');
var guesses = JSON.parse(localStorage.getItem('guesses')) || []; // store guesses in session

var code = JSON.parse(localStorage.getItem('code')); // store code in session 

var count = 0;

function playPause() {
  if (count == 0) {
    count = 1;
    audio.pause();
    playPauseButton.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-play-circle\" viewBox=\"0 0 16 16\">\n        <path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"/>\n        <path d=\"M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z\"/>\n      </svg>";
  } else {
    count = 0;
    audio.play();
    playPauseButton.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pause-circle\" viewBox=\"0 0 16 16\">\n        <path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"/>\n        <path d=\"M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z\"/>\n      </svg>";
  }
}

$(document).ready(function () {
  var radios = document.getElementsByName("difficulty");
  var val = JSON.parse(localStorage.getItem('difficulty')) || 'normal';

  for (var i = 0; i < radios.length; i++) {
    if (radios[i].value == val) {
      radios[i].checked = true;
    }
  }

  $('input[name="difficulty"]').on('change', function () {
    localStorage.setItem('difficulty', JSON.stringify($(this).val()));
    getCode($(this).val());
    playAgain();
  });
});

function openHowToPlay() {
  var howDiv = document.getElementById("how-to-play");
  var buttonText = document.getElementById("how-button");

  if (howDiv.style.display === "none") {
    howDiv.style.display = "block";
    buttonText.innerHTML = "Back to playing";
  } else {
    howDiv.style.display = "none";
    buttonText.innerHTML = "How to play";
  }

  return howDiv;
}

function checkGameOver(guesses, status) {
  var tries = guesses.length;
  status = JSON.stringify(status);
  verifyCode = JSON.stringify([1, 1, 1, 1]);
  var code = JSON.parse(localStorage.getItem('code'));

  if (status == verifyCode) {
    stopTimer(); // populateList(guesses, guessesList);

    guessInput.disabled = true;
    var mytimer = JSON.parse(localStorage.getItem('timer'));
    var time_array = mytimer.split(":");
    var seconds = parseInt(time_array[1]) || 0;
    var minutes = parseInt(time_array[0]) || 0;
    var confirmPlay = confirm("Congrats, You won in ".concat(tries, " tries and ").concat(minutes, " minute(s) ").concat(seconds, " second(s) ! Click ok to play again"));

    if (confirmPlay) {
      playAgain();
    }
  } else if (tries >= 10) {
    alert("Game Over, you lost. The code was ".concat(code));
    stopTimer();
    playAgain();
  }
}

function updateChances(guesses) {
  var num = guesses.length;
  chancesLeft.innerHTML = "".concat(10 - num);
}

function addItem(e) {
  e.preventDefault();
  var text = this.querySelector('[name=guess]').value;
  var code = JSON.parse(localStorage.getItem('code')); // store code in session 

  var status = checkStatus(text, code);
  var item = {
    text: text,
    status: status
  };
  this.reset();
  guesses.push(item);
  localStorage.setItem('guesses', JSON.stringify(guesses));
  checkGameOver(guesses, status);
  populateList(guesses, guessesList);
  updateChances(guesses);
}

function populateList() {
  var guesses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var guessesList = arguments.length > 1 ? arguments[1] : undefined;
  guessesList.innerHTML = guesses.map(function (guess, i) {
    return "\n        <div class=\"guess-hint\">\n            <li>\n                <label class=\"attempt-col\"> ".concat(i + 1, "</label>\n            </li>\n            <li>\n                <label class =\"guess-col\" for=\"item").concat(i, "\">").concat(guess.text, "</label>\n            <li>\n                <label class= \"status-col\" for=\"item").concat(i, "\">").concat(guess.status.join(" "), "</label>\n            </li>\n        </div>\n        ");
  }).join('');
}

function playAgain() {
  localStorage.removeItem('code');
  localStorage.removeItem('guesses');
  localStorage.removeItem('timer');
  location.reload();
  var val = JSON.parse(localStorage.getItem('difficulty'));
  getCode(val);
}

function changeDifficulty(difficulty) {
  localStorage.setItem('difficulty', JSON.stringify(difficulty));
  getCode(difficulty);
}

guessInput.addEventListener('keydown', onInputChange);

function onInputChange(e) {
  var error = document.getElementById("error-p");
  var val = JSON.parse(localStorage.getItem('difficulty'));
  validKeysBasedOnDifficulty = {
    "easy": [8, 13, 37, 39, 48, 49, 50, 51, 52],
    "normal": [8, 13, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55],
    "hard": [8, 13, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
  };
  var validKeys = validKeysBasedOnDifficulty[val];

  if (validKeys.includes(e.keyCode)) {
    error.innerHTML = "";
  } else {
    if (val == "easy") {
      e.preventDefault();
      error.innerHTML = "Error: Please enter a number from 0-4";
    } else if (val == "normal") {
      e.preventDefault();
      error.innerHTML = "Error: Please enter a number from 0-7";
    } else {
      e.preventDefault();
      error.innerHTML = "Error: Please enter a number from 0-9";
    }
  }
}

if (code === null) {
  var val = JSON.parse(localStorage.getItem('difficulty')) || "normal";
  getCode(val);
}

addGuesses.addEventListener('submit', addItem);
populateList(guesses, guessesList);
updateChances(guesses);
module.exports = populateList;