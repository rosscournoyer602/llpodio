module.exports = shorten
//needs to take all the info and return an object with all the stuff
var http = require('http')

function shorten(url, fieldPath) {
    return new Promise((resolve,reject) => {
        http.get('http://tinyurl.com/api-create.php?url=' + encodeURIComponent(url), res => {
            res.on('data', chunk => {
                data = {
                    "url": chunk.toString(),
                    "fieldPath": fieldPath
                }
                resolve(data)
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
}