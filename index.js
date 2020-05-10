// Inform the user that they are launching the server.
console.log('Startar upp SchoolLabs servern...')

// Import packages
// Dotenv - Create a file called .env and fill it wit all environment variables...
const dotenv = require('dotenv')
dotenv.config()

// Express
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// Database
const mongooose = require('mongoose')


// Connect to db
console.log('Kontaktar databasen...')
mongooose.connect(
    process.env.DB_URI, // Put this variable in .env ; should look something like this: "DB_URI = mongdb://user:password@domaim_or_IP:port/database"
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Databasen är ansluten!')
)

// Middlewares
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.set('view engine', 'ejs')

// Use static files for CSS
app.use(express.static('static'))

// Render top-level pages.
app.get('/', (req, res) => {
    res.render('pages/signin')
})
app.get('/forgot_pass', (req, res) => {
    res.render('pages/forgotPass')
})

// Import and render sub-level pages
const adminPages = require('./client/adminPages')
app.use('/admin', adminPages)
const hubPages = require('./client/hubPages')
app.use('/hub', hubPages)

/*
    The following 2 sections sets up the API calls.
*/
// Defines what happens on /api, puts to console and sends back feedback.
app.get("/api", (req, res, next) => {
    console.log('Inkommande anslutning!')
    res.send('{"msg" : "Ansluten till API!"}')
})

// Import API Routes
const authRoute = require('./api/auth')
app.use('/api/auth', authRoute)
const fetchRoute = require('./api/fetch')
app.use('/api/fetch', fetchRoute)
const userRoute = require('./api/user')
app.use('/api/user', userRoute)
const adminRoute = require('./api/admin')
app.use('/api/admin', adminRoute)
const newsRoute = require('./api/news')
app.use('/api/news', newsRoute)

// Start the actual server at port 5555 (for some reason)...
app.listen(5555, () => console.log(`Startat servern på port 5555`))
