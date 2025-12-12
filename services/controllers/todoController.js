const pool = require('../config/db');

// 获取用户的所有待办事项
exports.getTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    const [todos] = await pool.execute('SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    res.json(todos);
  } catch (error) {
    console.error('获取待办事项失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 添加待办事项
exports.addTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, desc, quadrant } = req.body;

    if (!title) {
      return res.status(400).json({ message: '标题不能为空' });
    }

    const [result] = await pool.execute(
      'INSERT INTO todos (user_id, title, desc, quadrant) VALUES (?, ?, ?, ?)',
      [userId, title, desc || '', quadrant || 1]
    );

    const [newTodo] = await pool.execute('SELECT * FROM todos WHERE id = ?', [result.insertId]);
    res.status(201).json(newTodo[0]);
  } catch (error) {
    console.error('添加待办事项失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 更新待办事项
exports.updateTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const todoId = req.params.id;
    const { title, desc, quadrant } = req.body;

    // 检查待办事项是否存在且属于当前用户
    const [existingTodos] = await pool.execute('SELECT * FROM todos WHERE id = ? AND user_id = ?', [todoId, userId]);
    if (existingTodos.length === 0) {
      return res.status(404).json({ message: '待办事项不存在' });
    }

    await pool.execute(
      'UPDATE todos SET title = ?, desc = ?, quadrant = ? WHERE id = ? AND user_id = ?',
      [title, desc, quadrant, todoId, userId]
    );

    const [updatedTodo] = await pool.execute('SELECT * FROM todos WHERE id = ?', [todoId]);
    res.json(updatedTodo[0]);
  } catch (error) {
    console.error('更新待办事项失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 删除待办事项
exports.deleteTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const todoId = req.params.id;

    // 检查待办事项是否存在且属于当前用户
    const [existingTodos] = await pool.execute('SELECT * FROM todos WHERE id = ? AND user_id = ?', [todoId, userId]);
    if (existingTodos.length === 0) {
      return res.status(404).json({ message: '待办事项不存在' });
    }

    await pool.execute('DELETE FROM todos WHERE id = ? AND user_id = ?', [todoId, userId]);
    res.json({ message: '删除成功' });
  } catch (error) {
    console.error('删除待办事项失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};
