console.log('Startar servern...');
// Import packages
const fs = require('fs');
const express = require('express');
let app = express();

// Some settings should be changeable, those will be in /settings.js
console.log('Läser in inställningar...');
const settings_file = fs.readFileSync('settings.json');
let settings = JSON.parse(settings_file);

console.log('Kontaktar databasen...');
const db = require('monk')(settings.database.connectCommand);

console.log('Laddar in filer...');
app.use(express.static('client'));

console.log('Startar upp SchoolLabs servern...');
app.listen(5555, () => {
    console.log(`Startat servern på port 5555`);

    // Defines what happens on /api, puts to console and sends back feedback.
    app.get("/api", (req, res, next) => {
        console.log('Inkommande anslutning!');
        res.send('{"msg" : "Ansluten till API!"}')
    });
});
