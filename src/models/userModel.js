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

exports.createUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.run(sql, [name, email, password], function (err) {
      if (err) {
        reject(err);
      }
      resolve({ id: this.lastID, name, email });
    });
  });
};

exports.updateUser = (id, name, email, password) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET name= ?, email= ?, password= ? WHERE id = ?`;
    db.run(sql, [name, email, password, id], function (err) {
      if (err) {
        reject(err);
      }
      resolve({ id, name, email, password });
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