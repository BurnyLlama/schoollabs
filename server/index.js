console.log('Startar servern...');

const mysql = require('mysql');
const db = mysql.createConnection({
    host: "78.72.169.7",
    user: "schoollabs",
    password: "schoollabs"
});

console.log('Kontaktar MySQL-servern (databas-servern)...');
db.connect(function(err) {
    if (err) throw err;
    console.log('Anslutning till databasen är fullbordad.');
});

