console.log('Startar servern...');
// Import packages
const fs = require('fs');
const express = require('express');
let app = express();

console.log('Läser in inställningar...');
const settings_file = fs.readFileSync('settings.json');
let settings = JSON.parse(settings_file);

console.log('Kontaktar databasen...');
const db = require('monk')(settings.database.connectCommand);

console.log('Startar upp SchoolLabs servern...');
app.listen(5555, () => {
    console.log(`Startat servern på port 5555`)
    app.get("/api", (req, res, next) => {
        console.log('Inkommande anslutning!')
    });
});
