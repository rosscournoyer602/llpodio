'use strict'

var express = require('express');
var Podio = require('podio-js').api;
var bodyParser = require('body-parser');
//var https = require('https');
//var querystring = require('querystring');
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

function lookup(responseData, fieldName, defaultValue) {
	var result = responseData.fields.find((e) => e.external_id === fieldName)
	if(!result) {
		return defaultValue
	}
	if(result.type === 'category') {
		return result.values[0].value.text
	}

	if(result.type === 'number') {
		return Math.floor(result.values[0].value)
	}
	return result.values[0].value
}

function encodeLookup(responseData, fieldName, defaultValue) {
	return encodeURIComponent(lookup(responseData, fieldName, defaultValue))
}

//webhook sends itemID to node server
app.post('/signup', urlencodedParser, (req, res) => {
	//gather information from the item student registry entry and format a link
	//to pre-populated Podio webform
	podio.isAuthenticated()
		.then(function() {

			var appItemID = Object.keys(req.body)[0];
			var token = podio.authObject.accessToken;
			var itemPath = `/app/${creds.appID}/item/${appItemID}?oauth_token=${token}`;

			return podio.request('GET', itemPath)
		})
		.then(function(responseData) {
			//this request works
			//console.log(JSON.stringify(responseData, null, 4));
			var student = {
				"itemID": responseData.item_id,
				"studentID": responseData.app_item_id,
				"firstName": encodeLookup(responseData, 'title', 'FIRST NAME'),
				"lastName": encodeLookup(responseData, 'last-name', 'LAST NAME'),
				"age": encodeLookup(responseData, 'age', 'AGE'),
				"grade": lookup(responseData, 'student-grade', 'GRADE'),
				"school": encodeLookup(responseData, 'school', 'SCHOOL'),
				"parentFirstName": encodeLookup(responseData, 'parent-first-name', 'PARENT FIRST'),
				"parentLastName": encodeLookup(responseData, 'parent-last-name', 'PARENT LAST'),
				"parentEmail": encodeLookup(responseData, 'parent-email', 'PARENT EMAIL'),
				"parentPhone": encodeLookup(responseData, 'parent-phone', 'PARENT PHONE'),
				"recommendedCourse": encodeLookup(responseData, 'placement-recommentation','Empty'),
				"finalPrice": encodeLookup(responseData, 'final-price', '8800')
			}

			var fieldPath = `/item/${student.itemID}/value/signup-link-2`;	
			var requestData = { url: `https://podio.com/webforms/18330088/1232365?fields[student-id]=${student.studentID}&fields[title]=${student.firstName}&fields[student-last-name]=${student.lastName}&fields[age]=${student.age}&fields[school]=${student.school}&fields[2016-2017-incoming-grade]=${student.grade}&fields[placement-recommendation]=${student.recommendedCourse}&fields[final-price]=${student.finalPrice}` };

			return podio.request('PUT', fieldPath, requestData)
		})
		.then(function(responseData) {
			
			console.log(JSON.stringify(responseData, null, 4));
			res.end(JSON.stringify(responseData, null, 4))
		})
		.catch(function(f) {
			console.log(f)
			res.end(JSON.stringify(f, null, 4))
		})
})

