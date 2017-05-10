var http = require('http');
var querystring = require('querystring');

var data = querystring.stringify({
    url : 'http://www.learningleaders.com',
})

var options = {
    host: 'http://dwz.cn/create.php',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
};

var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log("body: " + chunk);
    });
});

req.write(data);
req.end();