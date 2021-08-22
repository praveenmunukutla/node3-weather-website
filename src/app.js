const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// store express object
// configures the server
const app = express()

// have to tell express that template engine is setup.
// spacing and capitalization is import.
// this line is required to setup handle bars.
// handle bars needs to be setup under views folder
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
// to modify the views path to templates.
// by default hbs expects the location at rootfolder/views
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//app.use way to customize the server to server the folder
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'Praveen Munukutla'
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About Me',
        name: 'Praveen Munukutla'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        message: 'Contact Praveen Munukutla : muven89@gmail.com',
        name: 'Praveen Munukutla'
    })
})

//express knows the object and it stringfies the object and send the JSON data.
app.get('/weather', (request, response)=>{
    if(!request.query.address){
        return response.send({
            error: 'Address needs to be provided to fetch the weather forecast'
        })
    }

    geocode(request.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return response.send({error})
        }
        
        forecast(latitude, longitude, (error, {description, temperature, feelslike} = {})=>{
            if(error){
                return response.send({error})
            }

            return response.send({
                description,
                temperature,
                feelslike
            })
        })
    })
})

app.get('/products', (request, response) => {
    console.log(request.query.karla)
    response.send({
        products: []
    })
})

app.get('/help/*', (request, response)=>{
    response.render('404',{
        title: '404',
        name: 'Praveen Munukutla',
        errorMessage: 'Help article not found'
    })
})

//match anything that is not matched so far
app.get('*', (request, response)=>{
    response.render('404',{
        title: 'About Me',
        name: 'Praveen Munukutla',
        errorMessage: 'Page not found'
    })
})

//starts server and listens on the port number
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})