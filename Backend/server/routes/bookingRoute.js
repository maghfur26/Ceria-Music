const express = require('express');
const bookingController = require('../controllers/bookingController');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/auth');
const bookingRoute = express.Router();

bookingRoute.post('/booking', authMiddleware, bookingController.createBooking);
bookingRoute.get('/booking/:id', authMiddleware, bookingController.getBookingDetails);
bookingRoute.get('/booking/:id/receipt', authMiddleware, bookingController.generateReceipt);

module.exports = bookingRoute;