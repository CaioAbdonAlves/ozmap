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

exports.getUserByName = (name) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE name = ?`;
    db.get(sql, [name], (err, row) => {
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
        reject(err);DELETE
      }
      resolve({ id: this.lastID, name, email, idade });
    });
  });
};

exports.updateUser = (id, name, email, idade) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET name= ?, email= ?, idade= ? WHERE name = ?`;
    db.run(sql, [name, email, idade, id], function (err) {
      if (err) {
        reject(err);
      } else if (this.changes === 0) {
        reject(new Error(`O usuário com o nome: ${id} não foi encontrado.`));
      } else {
        resolve({ id, name, email, idade });
      }
    });
  });
};

exports.deleteUser = (name) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM users WHERE name= ?`;
    db.run(sql, [name], function (err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};