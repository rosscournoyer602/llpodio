var Podio = require('podio-js').api
var bodyParser = require('body-parser')
var creds = require('./creds.json')

var podio = new Podio({
	authType: 'app',
	clientId: creds.clientID,
	clientSecret: creds.secret
});

podio.authenticateWithApp(creds.appID, creds.appToken, (err) => {
    if (err) throw err
    podio.isAuthenticated()
    .then(() => {
        return podio.request('GET', '/item/app/18489238/count')
        .then((responseData) => {
            for (i=1; i <= responseData.count; ++i) {
                var id = i.toString()
                var itemPath = `/app/${creds.appID}/item/${id}`
                //does this need to be a new promise?
                // var getStudent = new Promise((res, rej) => {
                //     res(podio.request('GET', itemPath)) 
                // })
                // .then((responseData) => {
                //     //responseData.fields[1].values[0].value.text, 5
                //     if (responseData.fields[1].values[0].value.text === 'Current Student') {
                //         return (responseData)
                //     }
                //     else {
                //         console.log('Not Current Student')
                //     }
                // })
                // .then((responseData) => {
                //     var name = responseData.fields[0].values[0].value
                //     var grade = parseInt(responseData.fields[5].values[0].value)
                //     grade += 1
                //     var fieldPath = `/item/${responseData.item_id}/value/grade`
                //     var requestData = { value: grade }
                //     //console.log(grade)
                //     return podio.request('PUT', fieldPath, requestData)
                // })
                // .catch((err) => {
                //     console.log(err)
                // })
                // console.log(getStudent)
                //1580-961
            }
        })
    })
})