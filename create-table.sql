CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  idade INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);