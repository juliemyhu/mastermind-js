const addGuesses = document.querySelector('.add-guesses'); // form class to add guess
const guessesList = document.querySelector('.guesses-list'); //guess list

const chancesLeft = document.querySelector('.chancesLeft'); //chances left div
const timeBlock = document.querySelector('timer-container'); // timer div
const guessInput = document.querySelector('#guess-input');

const guesses = JSON.parse(localStorage.getItem('guesses')) || []; // store guesses in session
var code = JSON.parse(localStorage.getItem('code')); // store code in session 

$(document).ready(function() {
    var radios = document.getElementsByName("difficulty");
    var val = JSON.parse(localStorage.getItem('difficulty')) || 'normal';
    for(var i=0;i<radios.length;i++){
      if(radios[i].value == val){
        radios[i].checked = true;
      }
    }
    $('input[name="difficulty"]').on('change', function(){
      localStorage.setItem('difficulty', JSON.stringify($(this).val()));
      getCode($(this).val());
      playAgain()
    });
});

function openHowToPlay() {
    var error = document.getElementById("how-to-play");
    var buttonText = document.getElementById("how-button");
    if (error.style.display === "none") {   
        error.style.display = "block";
        buttonText.innerHTML = "Back to playing";
    } else {
      error.style.display = "none";
      buttonText.innerHTML = "How to play"
    }
}

// function that takes in users guess and current code, returns hint in array 
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


function checkGameOver(guesses, status) {

    var gameOver = false;
    var tries = guesses.length;
    status = JSON.stringify(status)
    verifyCode = JSON.stringify([1,1,1,1])
    var code = JSON.parse(localStorage.getItem('code')); 

    if (status == verifyCode) {
        stopTimer()
        populateList(guesses, guessesList);

        var mytimer = JSON.parse(localStorage.getItem('timer'));
        var time_array = mytimer.split(":")
        var seconds = parseInt(time_array[1]) || 0
        var minutes = parseInt(time_array[0]) || 0
        var confirmPlay = confirm(`Congrats, You won in ${tries} tries and ${minutes} minute(s) ${seconds} second(s) ! Click ok to play again`)
        
        if (confirmPlay) {
            
            playAgain();
          }
    } else if (tries >= 10 ) {
        alert(`Game Over, you lost. The code was ${code}`)
        
        playAgain();
        // clearTimer();
        
    }
}

function updateChances(guesses) {
    var num = guesses.length;
    chancesLeft.innerHTML = `${10 - num}`;
}

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=guess]')).value;
    // console.log(text ,typeof(text))
    var code = JSON.parse(localStorage.getItem('code')); // store code in session 

    // console.log(code ,typeof(code))
    const status = checkStatus(text,code);
    const item = {
      text,
      status,
    };
    this.reset();
    guesses.push(item);
    localStorage.setItem('guesses', JSON.stringify(guesses));

    populateList(guesses, guessesList);
    checkGameOver(guesses, status);
    updateChances(guesses)  
}

function populateList(guesses = [], guessesList) {
    guessesList.innerHTML = guesses.map((guess, i) => {
        return `
        <div class="guess-hint">
            <li>
                <label class="attempt-col"> ${i+1}</label>
            </li>
            <li>
                <label class ="guess-col" for="item${i}">${guess.text}</label>
            <li>
                <label class= "status-col" for="item${i}">${guess.status.join(" ")}</label>
            </li>
        </div>
        `;
    }).join('');
}

function playAgain () {
    localStorage.removeItem('code');
    localStorage.removeItem('guesses');
    localStorage.removeItem('timer')
    location.reload();
    var val = JSON.parse(localStorage.getItem('difficulty'));
    // localStorage.setItem('timer', JSON.stringify("00:00"));

    getCode(val)


}

function changeDifficulty(difficulty) {
    // console.log("inside change difficult function",difficulty)
    // playAgain()
    localStorage.setItem('difficulty', JSON.stringify(difficulty));
    getCode(difficulty) 

      
}

guessInput.addEventListener('keydown',onInputChange);

function onInputChange(e) {
    var error = document.getElementById("error-p");
    var val = JSON.parse(localStorage.getItem('difficulty'));
    validKeysBasedOnDifficulty= {
        "easy": [8,13,37,39,48,49,50,51,52],
        "normal":[8,13,37,39,48,49,50,51,52,53,54,55],
        "hard": [8,13,37,39,48,49,50,51,52,53,54,55,56,57]
    };
    var validKeys = validKeysBasedOnDifficulty[val];
    if (validKeys.includes(e.keyCode)) {
        error.innerHTML = ""
    } else {
        error.innerHTML = "Error: Please enter a valid number"
        e.preventDefault()
    }
}



if (code === null) {
    var val = JSON.parse(localStorage.getItem('difficulty'));
    getCode(val)
}

addGuesses.addEventListener('submit', addItem);
populateList(guesses, guessesList);
updateChances(guesses)

// module.exports = checkStatus;