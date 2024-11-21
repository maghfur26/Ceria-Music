const paymentController = require("../controllers/paymentController");
const express = require('express')
const paymentRoute = express.Router();

paymentRoute.put('/payment', paymentController.processPayment);
paymentRoute.get('/payment/receipt/:paymentId', paymentController.downloadReceipt);

module.exports = paymentRoute