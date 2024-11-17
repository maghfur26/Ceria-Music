const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

userRoute.post('/login', userController.login);
userRoute.post('/logout', authMiddleware, userController.logout);

module.exports = userRoute