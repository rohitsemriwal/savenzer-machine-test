const TransactionRoutes = require('express').Router();
const TransactionController = require('./../controllers/transaction_controller');

TransactionRoutes.get("/:partnerId", TransactionController.getTransactionsForPartner);

module.exports = TransactionRoutes;