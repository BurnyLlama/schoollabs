console.log('Startar servern...');
// Import packages
const mysql = require('mysql');
const fs = require('fs');


console.log('Läser in inställningar...');

const settings_file = fs.readFileSync('settings.json');
let settings = JSON.parse(settings_file);

const db = mysql.createConnection({
    host: settings.database.host,
    user: settings.database.user,
    password: settings.database.pass
});

console.log('Kontaktar MySQL-servern (databas-servern)...');
db.connect(function(err) {
    if (err) throw err;
    console.log('Anslutning till databasen är fullbordad.');
});