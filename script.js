

const answer = document.querySelector('.answer')
// form class to add guess
const addGuesses = document.querySelector('.add-guesses');
//guess list
const guessesList = document.querySelector('.guesses-list');
// store guesses in session
const guesses = JSON.parse(localStorage.getItem('guesses')) || [];
// store code in session 

var code = JSON.parse(localStorage.getItem('code'));



const restart_button = document.querySelector('.restart-button');

const addGuessButton = document.querySelector('.addGuessButton');

const chancesLeft = document.querySelector('.chancesLeft');

$(document).ready(function() {
    var radios = document.getElementsByName("difficulty");
    var val = localStorage.getItem('difficulty') || 'normal';
    localStorage.setItem('difficulty',val)
    for(var i=0;i<radios.length;i++){
      if(radios[i].value == val){
        radios[i].checked = true;
      }
    }
    $('input[name="difficulty"]').on('change', function(){
      localStorage.setItem('difficulty', JSON.stringify($(this).val()));
      getCode($(this).val());
    });
});


// checked radio value 
// var difficultyValue = document.querySelector('input[name="difficulty"]:checked')
// console.log("What is",difficultyValue.value)

// store difficulty in localstorage
// localStorage.setItem('difficulty', JSON.stringify(difficultyValue.value));
// localStorage.setItem('difficulty', JSON.stringify(radioDifficulty.value));




var radioDifficulty = document.getElementsByName("difficulty"); // list of radio buttons
console.log("radio",radioDifficulty)


function getCode(difficulty) {
    console.log("getting new code",difficulty, typeof(difficulty));
    max_param= {
        "easy": 4,
        "normal": 7,
        "hard": 9
    };
    const num = max_param[difficulty]

    fetch(`https://www.random.org/integers/?num=4&min=0&max=${num}&col=1&base=10&format=plain&rnd=new`, {})
    .then(response => response.text())  
    .then(function store (html) {
        html = html.replace(/\n/g, '');
        localStorage.setItem('code', JSON.stringify(html));
        code = JSON.parse(localStorage.getItem('code'));
        console.log("64",code)
    });

}

function openHowToPlay() {
    var popup = document.getElementById("how-to-play");
    var buttonText = document.getElementById("how-button");
    if (popup.style.display === "none") {   
        popup.style.display = "block";
        buttonText.innerHTML = "Close How to play";
    } else {
      popup.style.display = "none";
      buttonText.innerHTML = "How to play"
    }
}

function checkStatus(guess,code) {
    console.log(code,guess)
    var result = []

    for (var i = 0 ; i< code.length;i++){
        if (guess[i] === code[i]) {
            result.push(1)
        } else if (code.includes(guess[i])) {
            result.push(0)
        } 
    }
    return result
}

function gameOver(guesses, status) {

    status = JSON.stringify(status)
    verifyCode = JSON.stringify([1,1,1,1])

    if (status == verifyCode) {
        var confirmPlay = confirm("Congrats, You won! Click ok to play again")
        if (confirmPlay) {
            playAgain();
          }
    } else if (guesses.length >= 10 ) {
        alert("game over, you lose")
        playAgain();
    }
}

function updateChances(guesses) {
    var num = guesses.length;
    chancesLeft.innerHTML = `${10 - num}`;
}

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=guess]')).value;
    const status = checkStatus(text,code);
    const item = {
      text,
      status,
    };
    this.reset();
    guesses.push(item);
    populateList(guesses, guessesList);
    localStorage.setItem('guesses', JSON.stringify(guesses));
    gameOver(guesses, status);
    updateChances(guesses)  
}

function populateList(guesses = [], guessesList) {
    guessesList.innerHTML = guesses.map((guess, i) => {
        return `
        <div class="guess-hint">
            <li class="list-group-item list-group-item-primary">
                <label class ="guess-col" for="item${i}">${guess.text}</label>
            <li class="list-group-item list-group-item-primary">
                <label class= "status-col" for="item${i}">${guess.status}</label>
            </li>
        </div>
        `;
    }).join('');
}


function playAgain () {

    
    localStorage.removeItem('code');
    localStorage.removeItem('guesses');
    location.reload();
    var val = JSON.parse(localStorage.getItem('difficulty'));
    // var val = localStorage.getItem('difficulty');
    console.log("154",val)
    getCode(val)

}



addGuesses.addEventListener('submit', addItem);

populateList(guesses, guessesList);
updateChances(guesses)


function changeDifficulty(difficulty) {
    console.log("inside change difficult function",difficulty)
    // playAgain()
    localStorage.setItem('difficulty', JSON.stringify(difficulty));
    getCode(difficulty)  
      
}

if (code === null) {
    var val = JSON.parse(localStorage.getItem('difficulty'));
    console.log("outside fx call")
    getCode(val)
}


const timeBlock = document.querySelector('timer-container')
function getTimer() {

    timeBlock.innerHTML(time)
}