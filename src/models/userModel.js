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

exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
};

exports.createUser = (name, email) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;
        db.run(sql, [name, email], function (err) {
            if (err) {
                reject(err);
            }
            resolve({ id: this.lastID, name, email });
        });
    });
};