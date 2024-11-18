const express = require('express');
const roomRoute = express.Router();
const authMiddleware = require('../middleware/auth');
const roomController = require('../controllers/roomController');
const upload = require('../middleware/upload');

roomRoute.get('/room', authMiddleware, roomController.getAllRooms)
roomRoute.get('/room/:id', authMiddleware, roomController.getEachRooms)
roomRoute.post('/room/add', authMiddleware, upload('rooms'), roomController.createRoom)
roomRoute.put('/room/:id', authMiddleware, upload('rooms'), roomController.updateRoom)
roomRoute.delete('/room/:id', authMiddleware, roomController.deleteRoomById)

module.exports = roomRoute