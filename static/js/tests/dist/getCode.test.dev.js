"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var getCode = require('../getCode'); // test('should recognize win', function () {
//     expect(checkStatus('1234', '1234')).toEqual([1, 1, 1, 1]);
//   });


test('should get an object', function () {
  expect(_typeof(getCode("easy"))).toEqual('object');
}); // test('should get an object', function () {
//     expect(typeof getCode("medium")).toEqual('null')
//     });