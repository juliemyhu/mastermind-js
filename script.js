const answer = document.querySelector('.answer')
// form class to add guess
const addGuesses = document.querySelector('.add-guesses');
//guess container
const guessesList = document.querySelector('.guesses-container');
// store guesses in session
const guesses = JSON.parse(localStorage.getItem('guesses')) || [];
// store code in session 
const code = JSON.parse(localStorage.getItem('code')) || [];
// function getCode() {
//     // var code = [];
//     fetch("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new", {})
//     .then(response => response.text())  
//     .then(html =>  
//         answer.innerHTML = html
//     ) 
// }


fetch("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new", {})
.then(response => response.text())  
.then(function store (html) {
    html = html.replace(/\n/g, '');
    localStorage.setItem('code', JSON.stringify(html))
    }  
) 

console.log("code",code)

function checkStatus(guess,code) {
    if (guess === code) {
        return "correct"
    }
    for (var i ; i< code.length;i++){
        console.log(i)
    }
    return true
}

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=guess]')).value;
    const status = checkStatus(text,code);
    const item = {
      text,
      status,
    };

    guesses.push(item);
    populateList(guesses, guessesList);
    localStorage.setItem('guesses', JSON.stringify(guesses));
    this.reset();
  }

  function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
      return `
        <li>
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
    }).join('');
  }

  addGuesses.addEventListener('submit', addItem);

populateList(guesses, guessesList);
//*[@id="invisible"]/pre
