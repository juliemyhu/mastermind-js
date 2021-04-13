"use strict";

var checkStatus = require('../checkStatus'); // var $ = require("jquery");


test('should return 10', function () {
  expect(checkStatus('1123', '8123')).toEqual([0, 1, 1, 1]);
});
test('should return result', function () {
  expect(checkStatus('1234', '1243')).toEqual([1, 1, 0, 0]);
});
test('should return result', function () {
  expect(checkStatus('3041', '0314')).toEqual([0, 0, 0, 0]);
});
test('should return empty list', function () {
  expect(checkStatus('4321', '5678')).toEqual([]);
});