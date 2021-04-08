const answer = document.querySelector('.answer')
// form class to add guess
const addGuesses = document.querySelector('.add-guesses');
//guess container
const guessesList = document.querySelector('.guesses-container');
// store guesses in session
const guesses = JSON.parse(localStorage.getItem('guesses')) || [];
// store code in session 
var code = JSON.parse(localStorage.getItem('code')) || [];


function getCode() {
    fetch("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new", {})
    .then(response => response.text())  
    .then(function store (html) {
        html = html.replace(/\n/g, '');
        localStorage.setItem('code', JSON.stringify(html));
        code = JSON.parse(localStorage.getItem('code'));
        }  
    ) 
}

console.log("code",code)


// 0 correct color, wrong location
// 1 correct color, correct location
function checkStatus(guess,code) {
    var result = []
    console.log("code:",code)
    console.log("guess",guess)
    for (var i = 0 ; i< code.length;i++){
        if (guess[i] === code[i]) {
            result.push(1)
        } else if (code.includes(guess[i])) {
            result.push(0)
        } 
    }
    console.log(typeof(result));
    return result
}

function gameOver(guesses, status) {
    console.log(status);
    console.log(guesses);
    if (JSON.stringify(status) == JSON.stringify([1,1,1,1])) {
        alert("You won")
    } else if (guesses.length === 10 ) {
        alert("game over, you lose")
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
    populateList(guesses, guessesList);

    localStorage.setItem('guesses', JSON.stringify(guesses));

    gameOver(guesses, status);
    
  }

function populateList(guesses = [], guessesList) {
guessesList.innerHTML = guesses.map((guess, i) => {
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
    getCode();
}

addGuesses.addEventListener('submit', addItem);

populateList(guesses, guessesList);
console.log(localStorage.getItem('guesses'))
//*[@id="invisible"]/pre
