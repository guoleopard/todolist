const pool = require('../config/db');

const User = {
  getAll: async () => {
    const [rows] = await pool.execute('SELECT id, username, email, created_at FROM users ORDER BY created_at DESC');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await pool.execute('SELECT id, username, email, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  getByUsername: async (username) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },
  getByEmail: async (email) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  create: async (username, email, password) => {
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    return result.insertId;
  },
  update: async (id, username, email) => {
    const [result] = await pool.execute(
      'UPDATE users SET username = ?, email = ? WHERE id = ?',
      [username, email, id]
    );
    return result.affectedRows > 0;
  },
  delete: async (id) => {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = User;