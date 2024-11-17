const express = require('express');
const roomRoute = express.Router();
const authMiddleware = require('../middleware/auth');
const roomController = require('../controllers/roomController');

roomRoute.get('/room/:id', authMiddleware, roomController.getAllRooms)
roomRoute.get('/room', authMiddleware, roomController.getUserRooms)
roomRoute.put('/room/add', authMiddleware, roomController.createRoom)
roomRoute.put('/room/:id', authMiddleware, roomController.updateRoom)
roomRoute.delete('/room/:id', authMiddleware, roomController.deleteRoomById)

module.exports = roomRoute