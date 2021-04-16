"use strict";

function checkStatus(guess, code) {
  // console.log("checkstatus called code and guess is:",code,guess)
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
} // export default checkStatus;
// module.exports = checkStatus;