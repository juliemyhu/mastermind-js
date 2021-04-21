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

After deciding on a techstack, I planned the MVP - Minimal Viable Product and nice to have features. The MVP features were a guess field, history section, and the ability to give feedback as hints. Because I didn't use a database like mySQL or SQLalchemy, I decided to use the browsers Local Storage to store my data. Initially, local storage was used to store the code and guesses. I got this idea from following a todo list tutorial with local storage and thought it would be nice way to add a guess, display it, and persist the data. If a player refreshes their page, they can contiune the game where they left off! Through this, I gained a lot of practice with local storage. If you are curious and want to see for yourself, just open up the console -> application tab -> local storage.

The next big feature I built was the difficulty mode. I refractored the get code function to get differnet codes based on level and added difficulty to local storage. The reason I stored difficulty in local storage is so that the game knows which mode you are playing with and it can go and get that difficulties code. Weather you are changing the difficulty on the radio button, restarting a new game, or coming back to an old game, it will persist the data.

The last key feature was a timer. I created a function that increases a second count every second and updates the timer. I quickly realized that I had to add this into local storage as well because the timer will reset itself whenever the page refreshed.

Overall, I had a lot of fun creating this project. I worked with a lot on new technologies such as SASS/JEST and learned to improve my Javascript, HTML and CSS skills. I am a lot more comfortable working with vanilla JS. I gained a stronger understanding of the fundamentals of JS and even OOP in JS. I am excited to see how these skills will carry over to future projects.

# :bulb: Features

- Guess Field and History Section
- Input Error handleing
- Saves Game / Restart button
- How to play button
- Attempt Counter and Timer
- 3 Difficulty Mode
- Theme music

### :hammer_and_wrench: Future Improvements

- Allow hints
- replace alert wins/losses with popup div
- add black/ white colored pegs instead of 0's and 1's

### About the Author

Julie Hu is a previous pre-health student turned Software Engineer in the Bay Area. You can find more information about her in the links below:

[Github](https://github.com/juliemyhu)

[LinkedIn](https://www.linkedin.com/in/julie-hu/)

[Portfolio](https://juliemyhu.github.io/)
