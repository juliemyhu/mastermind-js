const addGuesses = document.querySelector('.add-guesses'); // form class to add guess
const guessesList = document.querySelector('.guesses-list'); //guess list
const chancesLeft = document.querySelector('.chancesLeft'); //chances left div
const timeBlock = document.querySelector('timer-container'); // timer div
const guessInput = document.querySelector('#guess-input');
var audio = document.getElementById('audio');

var playPauseButton = document.getElementById('playPauseButton');

const guesses = JSON.parse(localStorage.getItem('guesses')) || []; // store guesses in session
var code = JSON.parse(localStorage.getItem('code')); // store code in session 

var count = 0;
audio.autoplay = true;

function playPause() {
    if(count==0) {
        count = 1;
        audio.play();
        playPauseButton.innerHTML = "| |"
    } else {
        count = 0;
        audio.pause();
        playPauseButton.innerHTML = "&#9654"
    }
}

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

async function getCode(difficulty) {
    try {
    max_param= {
                "easy": 4,
                "normal": 7,
                "hard": 9
    }
    const num = max_param[difficulty]
    const result = await fetch(`https://www.random.org/integers/?num=4&min=0&max=${num}&col=1&base=10&format=plain&rnd=new`, {});
    const data = await result.text();
    html = data.replace(/\n/g,'');
    localStorage.setItem('code', JSON.stringify(html));
    return html
} catch (e) {
    console.log(e)
    return null;
}

}

function checkGameOver(guesses, status) {

    var tries = guesses.length;
    status = JSON.stringify(status)
    verifyCode = JSON.stringify([1,1,1,1])
    var code = JSON.parse(localStorage.getItem('code')); 

    if (status == verifyCode) {
        stopTimer()
        // populateList(guesses, guessesList);
        guessInput.disabled = true;
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
        stopTimer()
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
    checkGameOver(guesses, status);
    populateList(guesses, guessesList);
    
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

        if (val == "easy"){
            e.preventDefault()
            error.innerHTML = "Error: Please enter a number from 0-4"
        } else if (val == "normal") {
            e.preventDefault()
            error.innerHTML = "Error: Please enter a number from 0-7"
        } else {   
            e.preventDefault()
            error.innerHTML = "Error: Please enter a number from 0-9"
        }
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