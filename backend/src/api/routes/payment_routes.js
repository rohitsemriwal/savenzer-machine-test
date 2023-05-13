const PaymentRoutes = require('express').Router();
const PaymentController = require('./../controllers/payment_controller');

PaymentRoutes.get("/completePayment", PaymentController.completePayment);
PaymentRoutes.post("/createLink", PaymentController.createPaymentLink);

module.exports = PaymentRoutes;