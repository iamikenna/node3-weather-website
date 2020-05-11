// Npm modules being installing by the name e.g npm i module name@version number 
const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const ik = "Index family"
 
//  path to the folder holding the app code 
// console.log(__dirname)

// // Joining two paths together 
// console.log(path.join(__dirname, "../public/index.html"))

// Calling the express function after importing the module from npm
const app = express()

// Getting the path of the html content and saving it in a variable name, calling it later with app.use()
// Define paths for express configuration
const public_static = path.join(__dirname, "../public")
const about_static = path.join(__dirname, "../public/about.html")
const help_static = path.join(__dirname, "../public/help.html")

// Setting up the partials path for re useable code 
const partials_static = path.join(__dirname, "../templates/partials")

// Changing the path name from views to template
// Define paths for express configuration
const temp_views = path.join(__dirname, "../templates/views")

//  Setting up a dynamic templates with hbs handlebars.js
// Setup handlebars engine and views location
app.set("view engine", "hbs")

//Note: Used when the "views" name folder has been changed 
// Setup handlebars engine and views location
app.set("views", temp_views)

// Setup handlebar engine and view locations for partials 
hbs.registerPartials(partials_static)

// This excutes the content of each page and renders it in an html page
// setup static directory to serve
app.use(express.static(public_static))
app.use(express.static(about_static))
app.use(express.static(help_static))

// ------------------------------------------------------------------
// Setting the router and render page
// Index page
app.get("/", (req, res) => {
    //res.render redirects the response to the html page specified
    res.render("index",{
        title: "Weather App",
        name: ik
    })
})
// Setting the router and render page
// Index page
app.get("/index", (req, res) => {
    res.render("index",{
        title: "Weather App",
        name: ik
    })
})
// ------------------------------------------------------------------

// About page
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Ikenna Ibezim"
    })
})

// Help page
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Ask for help if you need", 
        name: "Help team"
    })
}) 

// setting up error 404 for any /help/anything else
app.get("/help/*", (req, res) => {
    res.render("page_not_found.hbs", {
        error: "Help article is unavailabe"
    })
    
    

})

// Setting up page for error 404
// * means match anything else that doesnt have a url 
//  this function must always come last 
// app.get("*", (req, res) => {
//     res.render("page_not_found.hbs", {
//         error: "My 404 page"
//     })
    

// })
// ------------------------------------------------------------------
//  complete path to the app directory
console.log(__filename)

// this is an old router handler used to display and route content to html page
app.get("/help", (req, res) => {
    res.send( [{
        name: "Ikenna"
    }, {
        name: "Ibezim"
    }])
})

app.get("", (req, res) => {
    res.send("<h1>Hello express!</h1>")

})

//  rending html and json data to the browser on port 3000 by listening
app.get("/about", (req, res) => {
    res.send("<h1>This is about node JS</h1>")
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide an address"
        })
    }
    // taking input from the query string of address
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
       
        if (error){
            return res.send({
                error: error + " in geocode function"
            })
        }
        else{
            forecast(latitude, longitude, (error, {summary, temperature, probability}) => {
            
                if (error){
                    
                    return res.send({
                        error: error + " in forecast function"
                    })
                }
                else{ 

                    res.send({
                        location: location,
                        temperature: temperature,
                        summary: summary,
                        probability: probability,
                        address: req.query.address
                    })
                   
                }
            })
        }
    })
    console.log(req.query.address)
    // res.send({
    //     forecast: "30 degrees",
    //     location: "New york",
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
  
    if(!req.query.search){
        return res.send({
            error:"you must provide a search term"
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})

// This shows us that we can have different routes or pages in a website. eg app.com/help or app.com/about
// app.com
// app.com/help
// app.com/about
// app.com/weather

// setting up a server on port 3000
app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})