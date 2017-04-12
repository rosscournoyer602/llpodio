var creds = require('./creds');
var Podio = require('podio-js').api;
var https = require('https');
var app = require('./server');

var podio = new Podio({
	authType: 'app',
	clientId: creds.clientID,
	clientSecret: creds.secret
});


podio.authenticateWithApp(creds.appID, creds.appToken, function(err) {
	if (err) {
		throw new Error(err);
	}

	podio.isAuthenticated().then(function() {
	
		var token = podio.authObject.accessToken;
		var path = `/app/${creds.appID}/item/1?oauth_token=${token}`;

		podio.request('GET', path).then(function(responseData) {
			//console.log(JSON.stringify(responseData, null, 4));
	   		 // var student = {
   	   //  		"studentID": responseData.app_item_id,
   	   //  		"firstName": responseData.fields[0].values[0].value,
   	   //  		"lastName": responseData.fields[1].values[0].value,
   	   //  		"age": Math.floor(responseData.fields[2].values[0].value),
	   	  //  		"grade": responseData.fields[3].values[0].value.text,
	   	  //  		"school": responseData.fields[4].values[0].value.text,
	   	  //  		"parentFirstName": responseData.fields[5].values[0].value,
	   	  //  		"parentLastName": responseData.fields[6].values[0].value,
	   	  //  		"parentEmail": responseData.fields[7].values[0].value,
	   	  //  		"parentPhone": responseData.fields[8].values[0].value,
	   	  //  		"recommendedCourse": responseData.fields[10].values[0].value.text
	   		 //  };

	   		 //console.log(student);

			}).catch(function(f) {
				console.log(f)
				})

	});
});

app.listen(3000)