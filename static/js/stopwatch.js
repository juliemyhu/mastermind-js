var h2 = document.getElementsByTagName('h2')[0]
var mytimer = JSON.parse(localStorage.getItem('timer')) || "00:00";

localStorage.setItem('timer', JSON.stringify(h2.textContent));

var time_array = mytimer.split(":")

var seconds = parseInt(time_array[1]) || 0
var minutes = parseInt(time_array[0]) || 0
var t

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    h2.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    localStorage.setItem('timer', JSON.stringify(h2.textContent));
    timer();

}
function timer() {
    t = setTimeout(add, 1000);
}

timer();

function stopTimer() {
    clearTimeout(t)
}

// function clearTimer(t) {
//     clearTimeout(t)
//     localStorage.setItem('timer',JSON.stringify("00:00");
    
// }
