// Inform the user that they are launching the server.
console.log('Startar upp SchoolLabs servern...');

// Import packages
// Dotenv - Create a file called .env and fill it wit all environment variables...
const dotenv = require('dotenv');
dotenv.config();

// Express
const express = require('express');
let app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

// Database
const mongooose = require('mongoose');


// Connect to db
console.log('Kontaktar databasen...')
mongooose.connect(
    process.env.DB_URI, // Put this variable in .env ; should look something like this: "DB_URI = mongdb://user:password@domaim_or_IP:port/database"
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Databasen är ansluten!')
);

// Set up some middleware...
app.use(session({
    secret: process.env.APP_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

// Making sure that /client can be served as /
console.log('Laddar in filer...');
app.use(express.static('client'));


// Import Routes
const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);


// Defines what happens on /api, puts to console and sends back feedback.
app.get("/api", (req, res, next) => {
    console.log('Inkommande anslutning!');
    res.send('{"msg" : "Ansluten till API!"}')
});


// Start the actual server at port 5555 (for some reason)...
app.listen(5555, () => console.log(`Startat servern på port 5555`));
