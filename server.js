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

podio.authenticateWithApp(creds.ptAppID, creds.ptAppToken, function(err) {
	if (err) {
		throw new Error(err);
	}
	console.log('authenticated with Podio')
	app.listen(3000)
});

app.get('/', function(req,res) {
	//console.log(req);
	res.send('halllo world');
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.post('/', urlencodedParser, function(req, res) {

// 	if (req.body.type === 'hook.verify') {

// 		var hookID = req.body.hook_id;

// 		var postBody = {
// 			"code" : req.body.code
// 		};

// 		var options = {
//   		hostname: 'api.podio.com',
//   		port: 443,
//   		path: `/hook/${hookID}/verify/validate`,
//   		method: 'POST',
//   		headers: {
//               'Content-Type': 'application/json',
//           }
// 		};

// 		var verify = https.request(options, function(res) {
// 			res.setEncoding('utf8');
// 			res.on('data', function(chunk) {
// 				console.log(chunk);
// 			});
// 		});

// 		verify.write(postBody);
// 		verify.end();
// 	}

// 	else {
// 		console.log(Object.keys(req.body)[0]);
// 	}
// })

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
	//gather relevant information from student registry entry and create a sign up link
	podio.isAuthenticated().then(function() {
	
		var token = podio.authObject.accessToken;
		var path = `/app/${creds.appID}/item/1?oauth_token=${token}`;

		podio.request('GET', path).then(function(responseData) {
			//console.log(JSON.stringify(responseData, null, 4));
			
	   		  var student = {
   	    		"studentID": responseData.app_item_id,
   	    		"firstName": responseData.fields[0].values[0].value,
   	    		"lastName": responseData.fields[1].values[0].value,
   	    		"age": Math.floor(responseData.fields[2].values[0].value),
	   	   		"grade": responseData.fields[3].values[0].value.text,
	   	   		"school": responseData.fields[4].values[0].value.text,
	   	   		"parentFirstName": responseData.fields[5].values[0].value,
	   	   		"parentLastName": responseData.fields[6].values[0].value,
	   	   		"parentEmail": responseData.fields[7].values[0].value,
	   	   		"parentPhone": responseData.fields[8].values[0].value,
	   	   		"recommendedCourse": responseData.fields[10].values[0].value.text,
	   	   		"finalPrice": Math.floor(responseData.fields[12].values[0].value)
	   		  };

	   		 console.log(student);
	   		 res.end()
			}).catch(function(f) {
				console.log(f)
				})
	})
})

