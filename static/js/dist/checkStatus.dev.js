"use strict";

// function that checks guess with code and returns list of hints
function checkStatus(guess, code) {
  var result = [];

  for (var i = 0; i < code.length; i++) {
    if (guess[i] === code[i]) {
      result.push(1);
    } else if (code.includes(guess[i])) {
      result.push(0);
    }
  }

  if (result.length === 0) {
    result.push("-");
  }

  return result;
}

module.exports = checkStatus;