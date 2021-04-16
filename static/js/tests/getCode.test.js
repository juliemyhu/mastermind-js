var getCode = require('../getCode'); 

// test('should recognize win', function () {
//     expect(checkStatus('1234', '1234')).toEqual([1, 1, 1, 1]);
//   });

test('should get an object', function () {
    expect(typeof getCode("easy")).toEqual('object')
    });

// test('should get an object', function () {
//     expect(typeof getCode("medium")).toEqual('null')
//     });