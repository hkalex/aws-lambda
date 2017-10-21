const TARGET = require('../src/checkip');

const assert = require('assert');

var mockEvent = {
  method: 'GET',
  body: null
}

describe('checkip', function() {
  it('works', function(done) {
    TARGET.handler(mockEvent, {}, function(error, response) {
      assert.equal(response.statusCode, 200);
      done();
    })
  });
})