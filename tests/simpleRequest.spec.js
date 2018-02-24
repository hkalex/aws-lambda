const TARGET = require('../src/simpleRequest');

const assert = require('assert');

var mockEvent = {
  method: 'GET',
  body: null
}

describe('simpleRequest', function () {
  it('works', function (done) {
    TARGET('GET', 'http://checkip.amazonaws.com', null, null).then(function (response) {
      console.log(response.body);
      done();
    }).catch(function (ex) {
      done(ex);
    })
  }).timeout(5000);

  it('works with headers', function (done) {
    var headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36'
    }
    TARGET('GET', 'http://checkip.amazonaws.com', headers, null).then(function (response) {
      console.log(response.body);
      done();
    }).catch(function (ex) {
      done(ex);
    })
  }).timeout(5000);

  it('works with headers', function (done) {
    var url = 'https://www.google.com.au/gen_204?s=webaft&atyp=csi&ei=U0yRWr71MIzH0gSO7afoCQ&rt=wsrt.564,aft.261,prt.261,sct.204';
    var headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36'
    }
    TARGET('POST', url, headers, {
      "mykey": "myvalue"
    }).then(function (response) {
      console.log(response.body);
      done();
    }).catch(function (ex) {
      done(ex);
    })
  }).timeout(5000);

})