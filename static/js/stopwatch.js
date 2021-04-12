
// stopwatch class 
function Stopwatch() {

    let startTime,endTime,running, duration = 0;
    this.start = function() {
        if (running)
            throw new Error('Stopwatch has already started.');
        running = true;
        startTime = new Date();
    };

    this.stop = function() {
        if (!running)
            throw new Error('Stopwatch has not started.');
        running = false;
        endTime = new Date();

        const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
        duration += seconds;
    }; 

    this.reset = function() {
        startTime = null;
        endTime = null;
        running = false;
        duration = 0
    };

    Object.defineProperty(this,'duration', {
        get:function() {
            return duration;
        }
    });
}

// const mytimer = new Stopwatch()
// console.log(mytimer)
// mytimer.start()

var h2 = document.getElementsByTagName('h2')[0]
var mytimer = JSON.parse(localStorage.getItem('timer'));

var time_array = mytimer.split(":")

// console.log("timearray",time_array)
var seconds = parseInt(time_array[2]) || 0
var minutes = parseInt(time_array[1]) || 0
var hours = parseInt(time_array[0]) || 0
var t

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    localStorage.setItem('timer', JSON.stringify(h2.textContent));
    timer();

}
function timer() {
    t = setTimeout(add, 1000);
}

timer();

function stop() {
    clearTimeout(t)
}
