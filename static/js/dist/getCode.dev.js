"use strict";

function getCode(difficulty) {
  // console.log("getting new code",difficulty, typeof(difficulty));
  max_param = {
    "easy": 4,
    "normal": 7,
    "hard": 9
  };
  var num = max_param[difficulty];
  fetch("https://www.random.org/integers/?num=4&min=0&max=".concat(num, "&col=1&base=10&format=plain&rnd=new"), {}).then(function (response) {
    return response.text();
  }).then(function store(html) {
    html = html.replace(/\n/g, '');
    localStorage.setItem('code', JSON.stringify(html));
    code = JSON.parse(localStorage.getItem('code'));
  });
  return code;
} // returns a promise
// async function getCode(difficulty) {
//     try {
//     max_param= {
//                 "easy": 4,
//                 "normal": 7,
//                 "hard": 9
//     }
//     console.log(difficulty)
//     const num = max_param[difficulty]
//     const result = await fetch(`https://www.random.org/integers/?num=4&min=0&max=${num}&col=1&base=10&format=plain&rnd=new`, {});
//     const data = await result.text();
//     html = data.replace(/\n/g,'');
//     console.log(html)
//     localStorage.setItem('code', JSON.stringify(html));
//     return html
// } catch (e) {
//     console.log(e)
//     return null;
// }
// }
// module.exports = getCode;