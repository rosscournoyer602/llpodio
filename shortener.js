module.exports = shorten
//needs to take all the info and return an object with all the stuff
var http = require('http')

function shorten(url, fieldPath) {
    return new Promise((resolve,reject) => {
        http.get('http://tinyurl.com/api-create.php?url=' + encodeURIComponent(url), res => {
<<<<<<< HEAD
            res.on('data', chunk => {
=======
     		res.on('data', chunk => {
>>>>>>> testing
                data = {
                    "url": chunk.toString(),
                    "fieldPath": fieldPath
                }
<<<<<<< HEAD
                resolve(data)
            })
=======
     			resolve(data)
     		})
>>>>>>> testing
        })
    })
    .catch(err => {
        console.log(err)
    })
}