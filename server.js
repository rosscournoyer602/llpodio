var express = require('express');
var Podio = require('podio-js').api;
var bodyParser = require('body-parser');
var https = require('https');
var querystring = require('querystring');
var app = express();
var creds = require('./creds.json');

var podio = new Podio({
	authType: 'app',
	clientId: creds.clientID,
	clientSecret: creds.secret
});

app.get('/', function(req,res) {
	//console.log(req);
	res.send('halllo world');
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/', urlencodedParser, function(req, res) {

	if (req.body.type === 'hook.verify') {

		var hookID = req.body.hook_id;

		var postBody = {
			"code" : req.body.code
		};

		var options = {
  		hostname: 'api.podio.com',
  		port: 443,
  		path: `/hook/${hookID}/verify/validate`,
  		method: 'POST',
  		headers: {
              'Content-Type': 'application/json',
          }
		};

		var verify = https.request(options, function(res) {
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				console.log(chunk);
			});
		});

		verify.write(postBody);
		verify.end();
	}

	else {
		console.log(Object.keys(req.body)[0]);
	}
})

app.post('/placement', urlencodedParser, function(req, res) {
	podio.isAuthenticated().then(function() {
		var itemID = Object.keys(req.body)[0];
		//console.log(itemID);
		var token = podio.authObject.accessToken;
		var path = `/app/${creds.ptAppID}/item/${itemID}?oauth_token=${token}`;
		var ptFormPath = 'https://podio.com/webforms/18297059/1232341'
		podio.request('GET', path).then(function(responseData) {
			console.log(responseData.fields[1].values[0].value);
			res.end()
			//get all student info, and format a string
		}).catch(function(f) {
			console.log(f)
		})
	}).catch((err) => {
		console.log(err)
	})
})

app.post('/signup',urlencodedParser, function(req, res) {

})

podio.authenticateWithApp(creds.ptAppID, creds.ptAppToken, function(err) {
	if (err) {
		throw new Error(err);
	}
	console.log('authenticated with Podio')
	app.listen(3000)
});

