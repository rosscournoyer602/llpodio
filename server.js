'use strict'

var express = require('express')
var Podio = require('podio-js').api
var bodyParser = require('body-parser')
var grader = require('./placementGrader')
var app = express()
var shorten = require('./shortener')

var podio = new Podio({
	authType: 'app',
	clientId: process.env.clientID,
	clientSecret: process.env.secret
});

podio.authenticateWithApp(process.env.appID, process.env.appToken, function(err) {
	if (err) {
		throw new Error(err)
	}
	console.log('authenticated with Podio')
	app.listen(process.env.PORT)
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
			var itemPath = `/app/${process.env.ptAppID}/item/${appItemID}?oauth_token=${token}`;

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
			var fieldPath = `/item/${itemID}/value/145749370`
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
			var itemPath = `/app/${process.env.appID}/item/${appItemID}?oauth_token=${token}`;

			return podio.request('GET', itemPath) 
		})
		.then(function(responseData) {
			//console.log(JSON.stringify(responseData, null, 4));
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

			var fieldPath = `/item/${student.itemID}/value/placement-test-link-3`
			var url = `https://podio.com/webforms/18489237/1244278?fields[placement-test-link-2]=${student.itemID}&fields(&fields[student]=${student.studentID}&fields[title]=${student.firstName}%20${student.lastName}&fields[parent-name]=${student.parentFirstName}%20${student.parentLastName}&fields[student-grade]=${student.grade}&fields[student-school]=${student.school}&fields[parent-email]=${student.parentEmail}`
			// ^ will be shortened by shortener
			return shorten(url, fieldPath)
		})
		.then(function(responseData) {
			var requestData = { url: responseData.url }
			return podio.request('PUT', responseData.fieldPath, requestData)
		})
		.then(function(responseData) {
			res.end(JSON.stringify(responseData, null, 4))
		})
		.catch(function(f) {
			console.log(f)
			res.end(JSON.stringify(responseData, null, 4))
		})
})

app.post('/signup', urlencodedParser, (req, res) => {
	podio.isAuthenticated()
	
		.then(function() {

			var appItemID = Object.keys(req.body)[0];
			var token = podio.authObject.accessToken;
			var itemPath = `/app/${process.env.appID}/item/${appItemID}?oauth_token=${token}`;

			return podio.request('GET', itemPath)
		})
		.then(function(responseData) {

			var student = {
				"itemID": responseData.item_id,
				"studentID": responseData.app_item_id,
				"firstName": lookup(responseData, 'title', 'FIRST NAME'),
				"lastName": lookup(responseData, 'last-name', 'LAST NAME'),
				"age": lookup(responseData, 'age', 'AGE'),
				"grade": lookup(responseData, 'grade', 'GRADE'),
				"school": lookup(responseData, 'school', 'SCHOOL'),
				"parentFirstName": lookup(responseData, 'parent-first-name', 'PARENT FIRST'),
				"parentLastName": lookup(responseData, 'parent-last-name', 'PARENT LAST'),
				"parentEmail": lookup(responseData, 'parent-email-2', 'PARENT EMAIL'),
				"parentPhone": lookup(responseData, 'parent-phone-2', 'PARENT PHONE'),
				"homeAddress": lookup(responseData, 'home-address', 'ADDRESS'),
				"previousCourse": lookup(responseData, 'previous-course-if-any', 'PREVIOUS'),
				"recommendedCourse": lookup(responseData, 'placement-recommentation','Empty'),
				"finalPrice": lookup(responseData, 'final-price', '8800')
			}

			var fieldPath = `/item/${student.itemID}/value/signup-link-2`
			var url = `https://podio.com/webforms/18489238/1244279?fields[title]=${student.firstName}&fields[student-last-name]=${student.lastName}&fields[parent-first-name]=${student.parentFirstName}&fields[parent-phone-number]=${student.parentPhone}&fields[parent-last-name]=${student.parentLastName}&fields[2016-2017-incoming-grade]=${student.grade}&fields[age]=${student.age}&fields[school]=${student.school}&fields[previous-course]=${student.previousCourse}&fields[placement-recommendation]=${student.recommendedCourse}&fields[parent-email-address]=${student.parentEmail}`

			return shorten(url, fieldPath)
		})
		.then(function(responseData) {
			var requestData = { url: responseData.url }
			return podio.request('PUT', responseData.fieldPath, requestData)
		})
		.then(function(responseData) {
			res.end(JSON.stringify(responseData, null, 4))
		})
		.catch(function(f) {
			console.log(f)
			res.end(JSON.stringify(responseData, null, 4))
		})
})

