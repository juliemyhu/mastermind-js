"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var getCode = require('../getCode');

global.fetch = jest.fn(function () {
  return Promise.resolve({
    text: function text() {
      return Promise.resolve('1234');
    }
  });
});
beforeEach(function () {
  fetch.mockClear();
});
it("gets easy code from api", function _callee() {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getCode("easy"));

        case 2:
          result = _context.sent;
          expect(_typeof(result)).toEqual('string');
          expect(fetch).toHaveBeenCalledTimes(1);
          expect(fetch).toHaveBeenCalledWith('https://www.random.org/integers/?num=4&min=0&max=4&col=1&base=10&format=plain&rnd=new', {});

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
it("gets normal code from api", function _callee2() {
  var result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getCode("normal"));

        case 2:
          result = _context2.sent;
          expect(_typeof(result)).toEqual('string');
          expect(fetch).toHaveBeenCalledTimes(1);
          expect(fetch).toHaveBeenCalledWith('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new', {});

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
it("gets hard code from api", function _callee3() {
  var result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(getCode("hard"));

        case 2:
          result = _context3.sent;
          expect(_typeof(result)).toEqual('string');
          expect(fetch).toHaveBeenCalledTimes(1);
          expect(fetch).toHaveBeenCalledWith('https://www.random.org/integers/?num=4&min=0&max=9&col=1&base=10&format=plain&rnd=new', {});

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
it('handles exception with null', function _callee4() {
  var code;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          fetch.mockImplementationOnce(function () {
            return Promise.reject("API failure");
          });
          _context4.next = 3;
          return regeneratorRuntime.awrap(getCode("easy"));

        case 3:
          code = _context4.sent;
          expect(code).toEqual(null);
          expect(fetch).toHaveBeenCalledWith('https://www.random.org/integers/?num=4&min=0&max=4&col=1&base=10&format=plain&rnd=new', {});

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
});