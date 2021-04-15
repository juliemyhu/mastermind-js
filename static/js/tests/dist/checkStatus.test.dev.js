"use strict";

var checkStatus = require('../checkStatus');

test('should recognize win', function () {
  expect(checkStatus('1234', '1234')).toEqual([1, 1, 1, 1]);
});
test('handles all 0 case', function () {
  expect(checkStatus('3041', '0314')).toEqual([0, 0, 0, 0]);
});
test('should none case', function () {
  expect(checkStatus('1234', '5678')).toEqual(["-"]);
});
test('should handle mix of 0 and 1s', function () {
  expect(checkStatus('1234', '1243')).toEqual([1, 1, 0, 0]);
});
test('should handle mix case 2', function () {
  expect(checkStatus('1246', '1485')).toEqual([1, 0]);
});
test('should handle mix case 3', function () {
  expect(checkStatus('6653', '1236')).toEqual([0, 0, 0]);
});
test('should handle repeated numbers 0 case', function () {
  expect(checkStatus('6667', '1256')).toEqual([0, 0, 0]);
});