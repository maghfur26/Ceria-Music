const express = require('express');
const userRoute = require('./userRoute');
const facilityRoute = require('./facilityRoute');
const roomRoute = require('./roomRoute');
const bookingRoute = require('./bookingRoute');
const paymentRoute = require('./paymentRoute');

const router = express.Router();

router.use(userRoute);
router.use(facilityRoute);
router.use(roomRoute);
router.use(bookingRoute);
router.use(paymentRoute);

module.exports = router;