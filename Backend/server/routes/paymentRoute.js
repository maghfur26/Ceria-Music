const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/auth");
const express = require('express')
const paymentRoute = express.Router();

paymentRoute.put('/payment', authMiddleware, paymentController.processPayment);
paymentRoute.get('/payment/receipt/:paymentId', authMiddleware, paymentController.downloadReceipt);

module.exports = paymentRoute