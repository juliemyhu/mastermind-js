
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

// const sw = new Stopwatch()

// function createStopwatch(start) {
//     sw.start();

//     // var h1 = document.createElement('h1');
//     // var textAnswer = document.createTextNode('Timer: ' + sw.duration)
//     // h1.setAttribute('id','ageInDays');
//     // h1.appendChild(textAnswer)
//     // document.getElementById('flex-box-result').appendChild(h1)
// }


// function stopStopwatch(sw) {
//     return sw.stop
// }



function updateTime(time) {
    var timer = document.querySelector(".timer-container")
    var sw = Stopwatch()

    timer.innerHTML = "hiheihe"
}

updateTime("hiieiee")