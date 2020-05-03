console.log('Startar upp SchoolLabs servern...');
// Import packages
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

let app = express();

// Some settings should be changeable, those will be in /settings.js
console.log('Läser in inställningar...');
const settings_file = fs.readFileSync('settings.json');
let settings = JSON.parse(settings_file);

console.log('Kontaktar databasen...');
const db = require('monk')(settings.database.connectCommand);

console.log('Laddar in filer...');
app.use(express.static('client'));

// Set up somethings needed by the server.
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.listen(5555, () => {
    console.log(`Startat servern på port 5555`);

    // Defines what happens on /api, puts to console and sends back feedback.
    app.get("/api", (req, res, next) => {
        console.log('Inkommande anslutning!');
        res.send('{"msg" : "Ansluten till API!"}')
    });

    // When someone wants to login.
    app.post('/auth', (req, res, next) => {
        let user = req.body.user;
        let pass = req.body.pass;
        console.log(`Inkommande förfrågan om att logga in som ${user}.`);

        req.session.loggedin = true;
        req.session.user = user;

        res.redirect('/hub');
        res.end();
    });

    // When someone wants to change password.
    app.post('/auth_forgot', (req, res, next) => {
        let user = req.body.user;
        console.log(`Inkommande förfrågan om att byta lösenord på ${user}.`);
    });

    // When the client checks if you should be at /hub
    app.get('/auth_hub', (req, res, next) => {
        if (req.session.loggedin) {
            res.send(`{"msg" : "Välkommen ${req.session.user}"}`);
        } else {
            res.send('{"msg" : "Vänligen logga in!"}');
        };
        res.end();
    });
});
