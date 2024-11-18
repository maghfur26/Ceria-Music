const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/auth");
const express = require('express')
const paymentRoute = express.Router();

paymentRoute.put('/payment/:id', authMiddleware, paymentController.updatePaymentStatus);

module.exports = paymentRoute