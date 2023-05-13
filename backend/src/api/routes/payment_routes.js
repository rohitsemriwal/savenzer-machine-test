const PaymentRoutes = require('express').Router();
const PaymentController = require('./../controllers/payment_controller');

PaymentRoutes.post("/createLink", PaymentController.createPaymentLink);

module.exports = PaymentRoutes;