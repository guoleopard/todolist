const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// 注册接口
router.post('/register', authController.register);

// 登录接口
router.post('/login', authController.login);

// 获取用户信息（需要登录）
router.get('/user', authMiddleware, authController.getUserInfo);

module.exports = router;
