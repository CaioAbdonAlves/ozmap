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

exports.createUser = (name, email, idade) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO users (name, email, idade) VALUES (?, ?, ?)`;
    db.run(sql, [name, email, idade], function (err) {
      if (err) {
        reject(err);
      }
      resolve({ id: this.lastID, name, email });
    });
  });
};

exports.updateUser = (id, name, email, idade) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET name= ?, email= ?, idade= ? WHERE id = ?`;
    db.run(sql, [name, email, idade, id], function (err) {
      if (err) {
        reject(err);
      }
      resolve({ id, name, email, idade });
    });
  });
};

exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM users WHERE id= ?`;
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};