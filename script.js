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



function getCode() {
    console.log("get code called")
    fetch("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new", {})
    .then(response => response.text())  
    .then(function store (html) {
        html = html.replace(/\n/g, '');
        localStorage.setItem('code', JSON.stringify(html));
        console.log('Hello');
        code = JSON.parse (localStorage.getItem('code'));
        return code
        }  
    ) ;
    
}



function openHowToPlay() {
    var x = document.getElementById("how-to-play");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
// 0 correct color, wrong location
// 1 correct color, correct location
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
    localStorage.clear();
    location.reload();
    console.log(code);
}

if (code === null) {
    getCode()
    console.log("code",code)
}


addGuesses.addEventListener('submit', addItem);
// restart_button.addEventListener('submit',playAgain())

// addGuessButton.addEventListener("click", addItem);

populateList(guesses, guessesList);
updateChances(guesses)
console.log(localStorage.getItem('guesses'))

