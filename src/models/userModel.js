const db = require('../database/db');

exports.getAllUsers = (offset, limit) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};