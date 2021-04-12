"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var h2 = document.getElementsByTagName('h2')[0];
var mytimer = JSON.parse(localStorage.getItem('timer')) || "00:00:00";
console.log("mytimer", mytimer, "type is", _typeof(mytimer));
localStorage.setItem('timer', JSON.stringify(h2.textContent));
var time_array = mytimer.split(":"); // console.log("timearray",time_array)

var seconds = parseInt(time_array[2]) || 0;
var minutes = parseInt(time_array[1]) || 0;
var hours = parseInt(time_array[0]) || 0;
var t;

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

  h2.textContent = (hours ? hours > 9 ? hours : "0" + hours : "00") + ":" + (minutes ? minutes > 9 ? minutes : "0" + minutes : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
  localStorage.setItem('timer', JSON.stringify(h2.textContent));
  timer();
}

function timer() {
  t = setTimeout(add, 1000);
}

timer();

function stop() {
  clearTimeout(t);
}