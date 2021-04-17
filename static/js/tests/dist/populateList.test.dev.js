"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

global.window = window;
global.$ = require('jquery');

var populateList = require('../scripts');

test('should get an object', function () {
  expect(_typeof(populateList([{
    "text": "3255",
    "status": [0, 1]
  }, {
    "text": "2343",
    "status": ["-"]
  }], ""))).toEqual('object');
});