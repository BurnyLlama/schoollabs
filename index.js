// Inform the user that they are launching the server.
console.log('Startar upp SchoolLabs servern...');

// Import packages
// Dotenv - Create a file called .env and fill it wit all environment variables...
const dotenv = require('dotenv');
dotenv.config();

// Express
const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Database
const mongooose = require('mongoose');


// Connect to db
console.log('Kontaktar databasen...')
mongooose.connect(
    process.env.DB_URI, // Put this variable in .env ; should look something like this: "DB_URI = mongdb://user:password@domaim_or_IP:port/database"
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Databasen är ansluten!')
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cookieParser())

// Making sure that /client can be served as /
console.log('Laddar in filer...');
app.use(express.static('client'));

/*
    The following 2 sections sets up the API calls.
*/
// Defines what happens on /api, puts to console and sends back feedback.
app.get("/api", (req, res, next) => {
    console.log('Inkommande anslutning!');
    res.send('{"msg" : "Ansluten till API!"}')
});

// Import API Routes
const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);
const fetchRoute = require('./routes/fetch');
app.use('/api/fetch', fetchRoute);
const userRoute = require('./routes/user');
app.use('/api/user', userRoute)
const adminRoute = require('./routes/admin');
app.use('/api/admin', adminRoute)


// Start the actual server at port 5555 (for some reason)...
app.listen(80, () => console.log(`Startat servern på port 5555`));
