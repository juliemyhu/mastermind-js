const answer = document.querySelector('.answer')
// form class to add guess
const addGuesses = document.querySelector('.add-guesses');
//guess container
const guessesContainer = document.querySelector('.guesses-container');
// store guesses in session
const guesses = JSON.parse(localStorage.getItem('guesses')) || [];
// store code in session 
var code = JSON.parse(localStorage.getItem('code')) || [];

getCode()

function getCode() {
    fetch("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new", {})
    .then(response => response.text())  
    .then(function store (html) {
        html = html.replace(/\n/g, '');
        localStorage.setItem('code', JSON.stringify(html));
        console.log('Hello')
        code = JSON.parse (localStorage.getItem('code'));
        }  
    ) ;
    return code
}

console.log("code",code)


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
            // location.reload();
          }
    } else if (guesses.length >= 10 ) {
        alert("game over, you lose")
        playAgain();
    }
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
    populateList(guesses, guessesContainer);

    localStorage.setItem('guesses', JSON.stringify(guesses));

    gameOver(guesses, status);
    
  }

function populateList(guesses = [], guessesContainer) {
    guessesContainer.innerHTML = guesses.map((guess, i) => {
        return `
        <li>
            <label for="item${i}">${guess.text}</label>
            <label for="item${i}">${guess.status}</label>
        </li>
        `;
    }).join('');
}


function playAgain () {
    localStorage.clear();
    code = getCode();
    location.reload();
    console.log(code)
}

addGuesses.addEventListener('submit', addItem);

populateList(guesses, guessesContainer);
console.log(localStorage.getItem('guesses'))

