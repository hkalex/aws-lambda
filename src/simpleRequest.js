var URL = require('url');
var HTTP = require('http');
var HTTPS = require('https');

function simpleRequest(method, url, headers, body) {
  var urlObject = URL.parse(url);

  var isHttps = urlObject.protocol === 'https:';
  var connection = isHttps ? HTTPS : HTTP;

  console.log('isHttps', isHttps);

  var requestObject = {
    hostname: urlObject.hostname,
    port: parseInt(urlObject.port) || (isHttps ? 443 : 80),
    path: urlObject.path,
    method: method || 'GET',
    headers: headers,
    timeout: 3000
  }

  if (body) {
    var bodyString = typeof body === 'string' ? body : JSON.stringify(body);
    requestObject.headers = requestObject.headers || {};
    requestObject.headers['Content-Length'] = Buffer.byteLength(bodyString);
  }

  console.log(requestObject);

  return new Promise(function (resolve, reject) {
    try {
      var req = connection.request(requestObject, function (res) {
        res.setEncoding("utf8");

        var body = [];

        res.on("data", function (chunk) {
          body.push(chunk);
        });
        res.on("end", function () {
          res.body = body.join('');
          resolve(res);
        });
        res.on('error', function (ex) {
          reject(ex);
        })
      });

      if (body) {
        console.log('writing body');
        req.write(bodyString);
      }

      req.on("error", function (ex) {
        console.log('request error');
        reject(ex);
      });

      req.end();
    } catch (ex) {
      console.log('Promise error');
      reject(ex);
    }
  })



}

module.exports = simpleRequest;