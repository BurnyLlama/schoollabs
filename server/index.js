console.log('Startar servern...');

console.log('Läser in inställningar...');
let settings;
(async () => {
    const settings_request = await fetch(`settings.json`);
    settings = await settings_request.json();
    console.log('');
})();

const mysql = require('mysql');
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

