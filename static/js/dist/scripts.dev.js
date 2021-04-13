"use strict";

var addGuesses = document.querySelector('.add-guesses'); // form class to add guess

var guessesList = document.querySelector('.guesses-list'); //guess list

var guesses = JSON.parse(localStorage.getItem('guesses')) || []; // store guesses in session

var code = JSON.parse(localStorage.getItem('code')); // store code in session 

var chancesLeft = document.querySelector('.chancesLeft');
var timeBlock = document.querySelector('timer-container');
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

function getCode(difficulty) {
  // console.log("getting new code",difficulty, typeof(difficulty));
  max_param = {
    "easy": 4,
    "normal": 7,
    "hard": 9
  };
  var num = max_param[difficulty];
  fetch("https://www.random.org/integers/?num=4&min=0&max=".concat(num, "&col=1&base=10&format=plain&rnd=new"), {}).then(function (response) {
    return response.text();
  }).then(function store(html) {
    html = html.replace(/\n/g, '');
    localStorage.setItem('code', JSON.stringify(html));
    code = JSON.parse(localStorage.getItem('code'));
  });
}

function openHowToPlay() {
  var popup = document.getElementById("how-to-play");
  var buttonText = document.getElementById("how-button");

  if (popup.style.display === "none") {
    popup.style.display = "block";
    buttonText.innerHTML = "Back to playing";
  } else {
    popup.style.display = "none";
    buttonText.innerHTML = "How to play";
  }
} // function that takes in users guess and current code, returns hint in array 
// function checkStatus(guess,code) {
//     // console.log("checkstatus called code and guess is:",code,guess)
//     var result = []
//     for (var i = 0 ; i< code.length;i++){
//         if (guess[i] === code[i]) {
//             result.push(1)
//         } else if (code.includes(guess[i])) {
//             result.push(0)
//         } 
//     }
//     return result
// }


function gameOver(guesses, status) {
  var tries = guesses.length;
  status = JSON.stringify(status);
  verifyCode = JSON.stringify([1, 1, 1, 1]);
  var code = JSON.parse(localStorage.getItem('code'));

  if (status == verifyCode) {
    stop();
    populateList(guesses, guessesList);
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
  var status = checkStatus(text, code);
  var item = {
    text: text,
    status: status
  };
  this.reset();
  guesses.push(item);
  populateList(guesses, guessesList);
  localStorage.setItem('guesses', JSON.stringify(guesses));
  gameOver(guesses, status);
  updateChances(guesses);
}

function populateList() {
  var guesses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var guessesList = arguments.length > 1 ? arguments[1] : undefined;
  guessesList.innerHTML = guesses.map(function (guess, i) {
    return "\n        <div class=\"guess-hint\">\n            <li>\n                <label class=\"attempt-col\"> ".concat(i + 1, "</label>\n            </li>\n            <li>\n                <label class =\"guess-col\" for=\"item").concat(i, "\">").concat(guess.text, "</label>\n            <li>\n                <label class= \"status-col\" for=\"item").concat(i, "\">").concat(guess.status, "</label>\n            </li>\n        </div>\n        ");
  }).join('');
}

function playAgain() {
  localStorage.removeItem('code');
  localStorage.removeItem('guesses');
  localStorage.removeItem('timer');
  location.reload();
  var val = JSON.parse(localStorage.getItem('difficulty')); // var val = localStorage.getItem('difficulty');

  console.log("154", val);
  getCode(val);
}

function changeDifficulty(difficulty) {
  // console.log("inside change difficult function",difficulty)
  // playAgain()
  localStorage.setItem('difficulty', JSON.stringify(difficulty));
  getCode(difficulty);
}

if (code === null) {
  var val = JSON.parse(localStorage.getItem('difficulty')); // console.log("outside fx call")

  getCode(val);
}

addGuesses.addEventListener('submit', addItem);
populateList(guesses, guessesList);
updateChances(guesses); // module.exports = checkStatus;