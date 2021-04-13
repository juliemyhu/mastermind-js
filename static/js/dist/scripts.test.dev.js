"use strict";

var _require = require('@jest/globals'),
    expect = _require.expect;

var checkStatus = require('./scripts');

var $ = require("jquery");

test('should return 10', function () {
  expect(checkStatus(1123, 8123)).toEqual([0, 1, 1, 1]);
});