'use strict'

var express = require('express');
var Podio = require('podio-js').api;
var bodyParser = require('body-parser');
var grader = require('./placementGrader');
var app = express();

var podio = new Podio({
	authType: 'app',
	clientId: clientID,
	clientSecret: secret
});

podio.authenticateWithApp(appID, appToken, function(err) {
	if (err) {
		throw new Error(err);
	}
	console.log('authenticated with Podio')
	app.listen(3000)
});

app.get('/', function(req,res) {
	//console.log(req);
	res.send('LL Podio Client is Up and Listening')
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })

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

app.post('/grade', urlencodedParser, (req, res) => {
	podio.isAuthenticated()
		.then(function () {
			var appItemID = Object.keys(req.body)[0];
			var token = podio.authObject.accessToken;
			var itemPath = `/app/${ptAppID}/item/${appItemID}?oauth_token=${token}`;

			return podio.request('GET', itemPath)
		})
		.then(function(responseData) {
			console.log(JSON.stringify(responseData, null, 4));
			var itemID = responseData.item_id;
			var grade = Number(lookup(responseData, 'student-grade'));
			var debXP = Number(lookup(responseData, 'debate-xp'));
			var classXP = Number(lookup(responseData, 'class-xp'));
			var arg = Number(lookup(responseData, 'argument-score'));
			var ref = Number(lookup(responseData, 'refutation-score'));
			var cs = Number(lookup(responseData, 'current-events-score'));
			var ps = Number(lookup(responseData, 'public-speaking-score'));

			var placement = grader(grade, debXP, classXP, arg, ref, cs, ps);
			var fieldPath = `/item/${itemID}/value/144010865`
			var requestData = { value: placement }

			return podio.request('PUT', fieldPath, requestData);
		})
		.then(function(responseData) {
			res.end(JSON.stringify(responseData, null, 4))	
		})
		.catch(function(f) {
			console.log(f)
			res.end()
		})
})

app.post('/placement', urlencodedParser, (req, res) => {
	podio.isAuthenticated()
		.then(function() {

			var appItemID = Object.keys(req.body)[0];
			var token = podio.authObject.accessToken;
			var itemPath = `/app/${appID}/item/${appItemID}?oauth_token=${token}`;

			return podio.request('GET', itemPath) 
		})
		.then(function(responseData) {
			console.log(JSON.stringify(responseData, null, 4));
			var student = {
				"itemID": responseData.item_id,
				"studentID": responseData.app_item_id,
				"firstName": encodeLookup(responseData, 'title', 'FIRST NAME'),
				"lastName": encodeLookup(responseData, 'last-name', 'LAST NAME'),
				"age": encodeLookup(responseData, 'age', 'AGE'),
				"grade": encodeLookup(responseData, 'grade', 'GRADE'),
				"school": encodeLookup(responseData, 'school', 'SCHOOL'),
				"parentFirstName": encodeLookup(responseData, 'parent-first-name', 'PARENT FIRST'),
				"parentLastName": encodeLookup(responseData, 'parent-last-name', 'PARENT LAST'),
				"parentEmail": encodeLookup(responseData, 'parent-email-2', 'PARENT EMAIL'),
				"parentPhone": encodeLookup(responseData, 'parent-phone', 'PARENT PHONE'),
			}

			var fieldPath = `/item/${student.itemID}/value/placement-test-link-3`;
			var requestData = { url:`https://podio.com/webforms/18297059/1232341?fields[placement-test-link-2]=${student.itemID}&fields(&fields[student]=${student.studentID}&fields[title]=${student.firstName}%20${student.lastName}&fields[parent-name]=${student.parentFirstName}%20${student.parentLastName}&fields[student-grade]=${student.grade}&fields[student-school]=${student.school}&fields[parent-email]=${student.parentEmail}` };

			return podio.request('PUT', fieldPath, requestData)
		})
		.then(function(responseData) {
			res.end(JSON.stringify(responseData, null, 4))
		})
		.catch(function(f) {
			console.log(f)
			res.end(JSON.stringify(responseData, null, 4))
		})
})

//webhook sends itemID to node server
app.post('/signup', urlencodedParser, (req, res) => {
	//gather information from the item student registry entry and format a link
	//to pre-populated Podio webform
	podio.isAuthenticated()
		.then(function() {

			var appItemID = Object.keys(req.body)[0];
			var token = podio.authObject.accessToken;
			var itemPath = `/app/${appID}/item/${appItemID}?oauth_token=${token}`;

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
				"parentEmail": encodeLookup(responseData, 'parent-email-2', 'PARENT EMAIL'),
				"parentPhone": encodeLookup(responseData, 'parent-phone-2', 'PARENT PHONE'),
				"recommendedCourse": encodeLookup(responseData, 'placement-recommentation','Empty'),
				"finalPrice": encodeLookup(responseData, 'final-price', '8800')
			}

			var fieldPath = `/item/${student.itemID}/value/signup-link-2`;	
			var requestData = { url: `https://podio.com/webforms/18330088/1232365?fields[student-id]=${student.studentID}&fields[title]=${student.firstName}&fields[student-last-name]=${student.lastName}&fields[parent-first-name]=${student.parentFirstName}&fields[parent-last-name]=${student.parentLastName}&fields[parent-email-address]=${student.parentEmail}&fields[parent-phone-2]=${student.parentPhone}&fields[age]=${student.age}&fields[school]=${student.school}&fields[2016-2017-incoming-grade]=${student.grade}&fields[placement-recommendation]=${student.recommendedCourse}&fields[final-price]=${student.finalPrice}` };

			return podio.request('PUT', fieldPath, requestData)
		})
		.then(function(responseData) {

			console.log(JSON.stringify(responseData, null, 4))
			res.end(JSON.stringify(responseData, null, 4))
		})
		.catch(function(f) {
			console.log(f)
			res.end(JSON.stringify(f, null, 4))
		})
})

