const express = require('express');
const bookingController = require('../controllers/bookingController');
const paymentController = require('../controllers/paymentController');
const bookingRoute = express.Router();

bookingRoute.post('/booking', bookingController.createBooking);
bookingRoute.get('/booking/:id', bookingController.getBookingDetails);

module.exports = bookingRoute;