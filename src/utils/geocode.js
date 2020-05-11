const request = require("request")
// address is the input gotten from the user
const geocode = (address, callback) => {
    // that address is being passed into the url to use the API key
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaWliZXppbSIsImEiOiJjazd6cDlhMXowN2diM2xwZTI3c285MTNkIn0.BezGy8UydliDwHAZZNZoOQ"
    
    // after sending a request, we expect either an error or {body} of data in a json format
    request({url, json:true}, (error, {body}) => {
        if (error) {
            // a call back function is always gonn ahave two parameters, undefined or the response
            callback("unable to connect to location services!", undefined)

        }
        else if (body.features.length === 0) {
            callback("unable to find the location. Try another search.", undefined)
        }
        else{
           
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:  body.features[0].place_name 
            } )
    
            
        }
    })

}

module.exports = geocode