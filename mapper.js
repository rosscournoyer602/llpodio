var object = require('./testObject')

//console.log(object.fields[83].config.settings.options)
var buttons = object.fields[83].config.settings.options

for (i=0; i < buttons.length; ++i) {
    console.log('\n' + i)
    console.log(buttons[i].text)
    console.log(buttons[i].id)
}

//if app field is modofied
//create an array of button text/id pair objects
//return the object

//grader will use this to update it's return value object

resultValues = {
    
}