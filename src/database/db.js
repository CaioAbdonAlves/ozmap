const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado na database de usuários.');
});

module.exports = db;