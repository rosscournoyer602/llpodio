var object = require('./testObject')
var creds = require('./creds')
var classes = require('./placementMap.json')
var Podio = require('podio-js').api

var podio = new Podio({
	authType: 'app',
	clientId: creds.clientID,
	clientSecret: creds.secret
})

podio.authenticateWithApp(creds.appID, creds.appToken, function(err) {
    if (err) throw err
	//console.log('authenticated with Podio')

    podio.isAuthenticated()
    .then(() => {
        var appPath = `/app/${creds.ptAppID}`
        return podio.request('GET', appPath)
    })
    .then((responseData) => {
        module.exports =  map(responseData)
    })
    .catch(function(e) {
		console.log(e)
	})
})

var map = function(app) {

    var buttons = app.fields[83].config.settings.options
    var appMap = []
    var buttonMap = {}
    for (i=0; i < buttons.length; ++i) {
        var button = {
            "text": buttons[i].text,
            "id": buttons[i].id
        }
        appMap.push(button)
        var shortname = classes[button['text']]
        buttonMap[shortname] = button['id']
    }
    return buttonMap
}

//if app field is modified
//create an array of button text/id pair objects and store in variable
//loop thru variable and create key value pair of shortnames and id
//export the key value pair

//grader will use this to update it's return value object
//["long": "id"]
//"long": "short"
//"shorthand: "id"