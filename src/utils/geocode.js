const request = require('request')

const geocode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=2&access_token=pk.eyJ1IjoibXV2ZW44OSIsImEiOiJja3NsemdudGkwMjI1MnZwNzdzNGNqemQ0In0.pGfIR7psfgjwmnfF7yRC2A'
    
    request({url: geocodeUrl, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect to location services!', undefined)
            return
        }

        // handling API level errors.
        if(response.body.features.length == 0){
            callback('Unable to find location. Try another search!', undefined)
            return
        }

        // returning the response
        // calling callback with the response
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        const location = response.body.features[0].place_name
        callback(undefined, {
            latitude: latitude,
            longitude: longitude,
            location: location
        })
    })
}

module.exports = geocode