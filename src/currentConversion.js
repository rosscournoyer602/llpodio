//sandbox student registry
//18830068
//4cefbd868ff34281b5e28407830c73ff

//sandbox signup
//18830239
//2afb0b7894a64a32a1faa2ef90fd5dc3

const Podio = require('podio-js').api
const creds = require('./creds.json')

const podio = new Podio({
	authType: 'app',
	clientId: creds.clientID,
	clientSecret: creds.secret
})
// item count /item/app/{app_id}/count
function getAllSignupEmails(count) { 
    // podio.authenticateWithApp(creds.sandboxID, creds.sandboxToken, (err) => {
        //if (err) throw err

        console.log('authenticated with Podio')
        console.log(count)
        
        //create an array to hold fetched signups
        var emails = new Array()
        let signups = new Array()

        for (k=1; k <= count.count; ++k) {
            let id = k.toString()
            let itemPath = `/app/${creds.sandboxSignup}/item/${id}`
            
            //populate array with Podio requests that will return signups
            signups.push(podio.request('GET', itemPath)) 
        }
        //when they all come back, do stuff with them
        Promise.all(signups).then(values => {
            //parse external item_id from returned signups//make array of email requests
            var signUpEmails = values.map(function(signup) {
                let id = signup.item_id
                let itemPath = `/item/${id}/value/148833291`
                return podio.request('GET', itemPath)
            })
            //when all the requests come back
            Promise.all(signUpEmails).then(values => {
                emails = values.map(signUpEmails => {
                    return signUpEmails[0].value
                })
                console.log("These are the emails of the sign-ups: \n")
                console.log(emails)
                getAllLeads(emails)
                
            }).catch((e) => {
                console.log(e)
            })
        })
        .catch((e) => {
            console.log(e)
        })
    //})
}

function getAllLeads(signUpEmails) {
    let listItemID = new Array()
    let listID = new Array()

    let limit = 500
        let request = {
            "sort_by": "app_item_id",
            "filters": 
            {
                "148831789": [2]
            },
            "limit": limit
        }
        let batchOfRequests = new Promise((res, rej) => {
            res(podio.request('POST', `/item/app/${creds.sandboxID}/filter/`, request))
        })
        .then((responseData) => {
            let listID = new Array()
            for(i=0; i<responseData.items.length; ++i){
                listItemID.push(responseData.items[i].item_id)
                listID.push(responseData.items[i].item_id)
            }
            return(listID)
        }).then((listID) => {
            let emails = new Array()
            for(i=0; i<listID.length; ++i) {
                let fieldPath = `/item/${listID[i]}/value/148831799`
                emails.push(podio.request('GET', fieldPath))
            }
            Promise.all(emails).then((returnedValues) => {
                var leadsList = new Array()
                for(i=0; i<returnedValues.length; ++i) {
                    leadsList.push(
                        {
                        "leadId": listItemID[i],
                        "leadEmail": returnedValues[i][0].value
                        }
                    )
                }
                console.log('These are the emails of all "Current Students" in Student Reg: \n')
                console.log(leadsList)
                return leadsList
            })
            .then((leadsList) => {
                let updateRequests = new Array()
                for(i=0; i<leadsList.length; ++i) {
                    let fieldPath = `/item/${leadsList[i].leadId}/value/148831789`
                    let request = {
                        value: 7
                    }
                    if(signUpEmails.includes(leadsList[i].leadEmail)) {
                        console.log('Match!: \n')
                        console.log(leadsList[i])
                        updateRequests.push(podio.request('PUT', fieldPath, request))
                    }
                }
            })
            .catch((e) => {
                console.log(e)
            })
        })
        .catch((e) => {
            console.log(e)
        })
}

function run() {
    podio.authenticateWithApp(creds.sandboxID, creds.sandboxToken, (err) => {
        if (err) throw err

        let count = new Promise((res, rej) => {
            res(podio.request('GET', `item/app/${creds.sandboxSignup}/count`))
        })
        .then((count) => {
            getAllSignupEmails(count)
        })
        .catch((err) => {
            console.log(err)
        })
    })
}
run()
module.exports = run