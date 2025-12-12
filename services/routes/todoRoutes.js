const express = require('express');
const Todo = require('../models/todoModel');
const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.getAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get todos by user id
router.get('/user/:userId', async (req, res) => {
  try {
    const todos = await Todo.getAllByUserId(req.params.userId);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get todo by id
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.getById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new todo
router.post('/', async (req, res) => {
  try {
    const { title, description, category, user_id } = req.body;
    if (!title || !category || !user_id) {
      return res.status(400).json({ error: 'Title, category and user_id are required' });
    }
    const id = await Todo.create(title, description || '', category, user_id);
    const newTodo = await Todo.getById(id);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update todo
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed, category } = req.body;
    const updated = await Todo.update(req.params.id, title, description, completed, category);
    if (!updated) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    const updatedTodo = await Todo.getById(req.params.id);
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Todo.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;