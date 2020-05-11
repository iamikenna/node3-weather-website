const request = require("request")

const forecast = (long, lang, callback) => {
    const url = "https://api.darksky.net/forecast/77cb87a38527ee39ca1a22d5e0ab07e5/"+ encodeURIComponent(long) + "," + encodeURIComponent(lang) + "?lang=en"
    request({url, json: true}, (error, {body}) => { 
        if (error){
            callback("cant connect to api service", undefined)
        } 
        else if (body.code === 400){
            callback(body.error, undefined)
        }
        else{
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                probability: body.currently.precipProbability +"%"
            })
        }

    })
}
module.exports = forecast