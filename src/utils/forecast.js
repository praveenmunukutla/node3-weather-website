const request = require('request')

const forecast = (lat, long, callback) => {
    const forecastURL = 'http://api.weatherstack.com/current?access_key=177f170c9875798c52b46d6733923cca&query='+lat+','+long+'&units=m'

    // request for weather
    request({url: forecastURL, json: true}, (error, response) => {
        //added error handling : Turn off internet you get error object
        if(error){
            callback("Unable to connect to Weather Stack service!", undefined)
            return
        }

        // when we gave wrong URL or the query isnt supported by the service
        // we get a response with error.
        if(response.body.error){
            callback("Unable to find weather for "+ lat+", "+long, undefined)
            return
        }

        
        // returning the response
        // calling callback with the response
        callback(undefined, {
            description: response.body.current.weather_descriptions[0],
            temperature: response.body.current.temperature,
            feelslike: response.body.current.feelslike
        })
    })
}

module.exports = forecast