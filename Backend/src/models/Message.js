import db from '../config/db.js';

export const saveMessage = (sender, text) => {
  const stmt = db.prepare('INSERT INTO messages (sender, text) VALUES (?, ?)');
  stmt.run(sender, text);
};

export const getRecentMessages = (limit = 20) => {
  const stmt = db.prepare('SELECT sender, text FROM messages ORDER BY id DESC LIMIT ?');
  return stmt.all(limit).reverse();
};