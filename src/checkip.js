var https = require("http");

exports.handler = (event, context, callback) => {
  var url = "http://checkip.amazonaws.com:80";

  console.log(url);
  var req = https.get(url, function (res) {
    res.setEncoding("utf8");

    var body = [];

    res.on("data", function (chunk) {
      body.push(chunk);
    });
    res.on("end", function () {
      var finalResponse = {
        statusCode: 200,
        headers: {},
        body: JSON.stringify(body.join(''))
      }
      console.log(finalResponse);
      callback(null, finalResponse);
    });
  });

  req.on("error", function (e) {
    callback(e, null);
  });
};