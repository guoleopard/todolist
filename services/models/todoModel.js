const pool = require('../config/db');

const Todo = {
  getAll: async () => {
    const [rows] = await pool.execute('SELECT * FROM todos ORDER BY created_at DESC');
    return rows;
  },
  getAllByUserId: async (userId) => {
    const [rows] = await pool.execute('SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows;
  },
  getById: async (id) => {
    const [rows] = await pool.execute('SELECT * FROM todos WHERE id = ?', [id]);
    return rows[0];
  },
  create: async (title, description, category, userId) => {
    const [result] = await pool.execute(
      'INSERT INTO todos (title, description, completed, category, user_id) VALUES (?, ?, ?, ?, ?)',
      [title, description, false, category, userId]
    );
    return result.insertId;
  },
  update: async (id, title, description, completed, category) => {
    const [result] = await pool.execute(
      'UPDATE todos SET title = ?, description = ?, completed = ?, category = ? WHERE id = ?',
      [title, description, completed, category, id]
    );
    return result.affectedRows > 0;
  },
  delete: async (id) => {
    const [result] = await pool.execute('DELETE FROM todos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Todo;