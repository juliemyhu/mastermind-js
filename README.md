# :brain: Mastermind JS

Mastermind JS is a code breaking game based off the board game Mastermind. The same rules apply - there is a 4 code combination that we need to break. The only difference from the actual game is that we're using numbers instead of colors and pegs. Read more about Mastermind here: https://en.wikipedia.org/wiki/Mastermind_(board_game)

![](/static/images/game.gif?raw=true)

### :boom: Technologies/Languages Used

- Javascript
- JQuery
- HTML
- CSS / SCSS
- Jest

### :computer: How to locally run Mastermind

Nothing complicated here. Just run on your favorite browser. I recommend Chrome because that is what I used in development. I tested it on Safari and it works as well.

1. Download this repository
2. Open index.html

### :thought_balloon: Thought process

An obvious question might be why did I not use a front end framework ? When I first received this challenge, I immediately thought about which techstack to use. The options that came to mind were Pygame with Python, React with React-app, or vanilla Javascript. Having already made projects in pygame and react app,I decided to go with the vanilla Javascript option because I thought I would learn the most and still be able to complete the project in the timeframe given.
Prior to working on this project, I was also following a [JS 30 day course](https://javascript30.com/) and taking a [Object Oriented Programming Javascript course](https://www.educative.io/courses/learn-object-oriented-programming-in-javascript) on Educative.io. I was not comfortable with my Javascript skills at the time, so I was taking some courses and watching JS tutorials. Naturally I thought this would be the perfect time to practice what I've been learning.

# :bulb: Features

- Guess Field and History Section
- Input Error handeling
- Saves Game / Restart button
- How to play button
- Attempt Counter and Timer
- 3 Difficulty Mode
- Theme music

### How I implemented the "Database":

Because I didn't have a database like mySQL or SQLalchemy, I used the browsers Local Storage to store my data. It stores the difficulty, code, guesses, and timer. I got this idea from following a todo list tutorial with local storage and thought it would be nice way to persist data. If a player refreshes their page, they can contiune the game where they left off! It was also very good practice using local storage. If you are curious, just open up the console -> application tab -> local storage

The reason I stored difficulty in local storage is so that the game knows which mode you are playing with and it can go and get that difficulties code.

### About the Author

Julie Hu is a previous pre-health student turned Software Engineer in the Bay Area. You can find more information about her in the links below:

[Github](https://github.com/juliemyhu)

[LinkedIn](https://www.linkedin.com/in/julie-hu/)

[Portfolio](https://juliemyhu.github.io/)
