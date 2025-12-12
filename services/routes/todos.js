const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

// 获取所有待办事项
router.get('/', authMiddleware, todoController.getTodos);

// 添加待办事项
router.post('/', authMiddleware, todoController.addTodo);

// 更新待办事项
router.put('/:id', authMiddleware, todoController.updateTodo);

// 删除待办事项
router.delete('/:id', authMiddleware, todoController.deleteTodo);

module.exports = router;
