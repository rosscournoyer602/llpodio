
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
    return encodeURIComponent(result.values[0].value)
}

module.exports = lookup