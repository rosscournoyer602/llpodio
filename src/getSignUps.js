const Podio = require('podio-js').api
const creds = require('./creds.json')

const podio = new Podio({
	authType: 'app',
	clientId: creds.clientID,
	clientSecret: creds.secret
})

function getAllSignupEmails() { 
    var emails = new Array()
    podio.authenticateWithApp(creds.sandboxID, creds.sandboxToken, (err) => {
        if (err) throw err

        console.log('authenticated with Podio')
        
        var emails = new Array()
        let signups = new Array()

        for (k=1; k <= 5; ++k) {
            let id = k.toString()
            let itemPath = `/app/${creds.sandboxSignup}/item/${id}`
            
            signups.push(podio.request('GET', itemPath)) 
        }

        Promise.all(signups).then(values => {

            var signUpEmails = values.map(function(signup) {
                let id = signup.item_id
                let itemPath = `/item/${id}/value/148833291`
                return podio.request('GET', itemPath)
            })

            Promise.all(signUpEmails).then(values => {
                emails = values.map(signUpEmails => {
                    return signUpEmails[0].value
                })
                
            }).catch((e) => {
                console.log(e)
            })
        })
        .catch((e) => {
            console.log(e)
        })
    })
}
getAllSignupEmails()
module.exports = getAllSignupEmails
