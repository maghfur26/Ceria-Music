const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

userRoute.post('/login', userController.login);
userRoute.put('/update', authMiddleware, upload('user'), userController.updateProfile);
userRoute.post('/logout', authMiddleware, userController.logout);

module.exports = userRoute