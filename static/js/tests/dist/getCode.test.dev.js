"use strict";

var getCode = require('../getCode');

global.fetch = jest.fn(function () {
  return Promise.resolve({
    json: function json() {
      return Promise.resolve({
        result: "2367"
      });
    }
  });
}); // it("gets promise", async () => {
//     const data = await getCode("normal");
//     expect(data).toEqual("2367")
//     // expect(fetch).toHaveBeenCAlledTimes(1);
//     }
// );

it("handles exception", function _callee() {
  var data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          fetch.mockImplementationOnce(function () {
            return Promise.reject("API failure");
          });
          _context.next = 3;
          return regeneratorRuntime.awrap(getCode("normal"));

        case 3:
          data = _context.sent;
          expect(data).toEqual(null);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});