const TransactionRoutes = require('express').Router();
const TransactionController = require('./../controllers/transaction_controller');

TransactionRoutes.get("/", TransactionController.getTransactions);

module.exports = TransactionRoutes;