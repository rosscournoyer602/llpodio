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

podio.authenticateWithApp(creds.appID, creds.appToken, function(err) {
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

app.post('/placement', urlencodedParser, function(req, res) {
	podio.isAuthenticated().then(function() {
		var itemID = Object.keys(req.body)[0];
		console.log(itemID);
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

//webhook sends itemID to node server
app.post('/signup',urlencodedParser, function(req, res) {
	//gather information from the item student registry entry and format a link
	//to pre-populated Podio webform
	podio.isAuthenticated()
		.then(function() {

			var itemID = Object.keys(req.body)[0];
			var token = podio.authObject.accessToken;
			var itemPath = `/app/${creds.appID}/item/${itemID}?oauth_token=${token}`;

			return podio.request('GET', itemPath)
		})
		.then(function(responseData) {
			//this request works
			console.log(JSON.stringify(responseData, null, 4));
			var student = {
				"studentID": responseData.app_item_id,
				"firstName": encodeURIComponent(responseData.fields[0].values[0].value),
				"lastName": encodeURIComponent(responseData.fields[1].values[0].value),
				"age": Math.floor(responseData.fields[2].values[0].value),
				"grade": responseData.fields[3].values[0].value.text,
				"school": encodeURIComponent(responseData.fields[4].values[0].value.text),
				"parentFirstName": encodeURIComponent(responseData.fields[5].values[0].value),
				"parentLastName": encodeURIComponent(responseData.fields[6].values[0].value),
				"parentEmail": responseData.fields[7].values[0].value,
				"parentPhone": responseData.fields[8].values[0].value,
				"recommendedCourse": encodeURIComponent(responseData.fields[10].values[0].value.text),
				"finalPrice": Math.floor(responseData.fields[12].values[0].value)
			}
			//console.log(student);
			//big ugly link
			var fieldPath = `/item/571453849/value/signup-link-2`;	
			var requestData = { url: 'http://coderbunker.com' };
			link = `https://podio.com/webforms/18330088/1232365?fields[student-id]=${student.studentID}&fields[title]=${student.firstName}&fields[student-last-name]=${student.lastName}&fields[age]=${student.age}&fields[school]=${student.school}&fields[2016-2017-incoming-grade]=${student.grade}&fields[placement-recommendation]=${student.recommendedCourse}&fields[final-price]=${student.finalPrice}`;

			console.log('\n');
			console.log('fieldpath: ' + fieldPath + '\n');
			//console.log('generatedlink: ' + link + '\n');

			return podio.request('PUT', fieldPath, requestData)
		})
		.then(function(responseData) {
			//I want to PUT this item back into a field in the student registry item from w
			console.log(JSON.stringify(responseData, null, 4));
			res.end()
		})
		.catch(function(f) {
			console.log(f)
			res.end()
		})

	})

