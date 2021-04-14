"use strict";

// returns a promise
function getCode(difficulty) {
  var num, result, data;
  return regeneratorRuntime.async(function getCode$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          max_param = {
            "easy": 4,
            "normal": 7,
            "hard": 9
          };
          num = max_param[difficulty];
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch("https://www.random.org/integers/?num=4&min=0&max=".concat(num, "&col=1&base=10&format=plain&rnd=new"), {}));

        case 5:
          result = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(result.text());

        case 8:
          data = _context.sent;
          html = data.replace(/\n/g, '');
          localStorage.setItem('code', JSON.stringify(html));
          return _context.abrupt("return", html);

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", null);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

module.exports = getCode;