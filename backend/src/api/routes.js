const ApiRoutes = require('express').Router();

const ProductRoutes = require('./routes/product_routes');
ApiRoutes.use("/product", ProductRoutes);

const PartnerRoutes = require('./routes/partner_routes');
ApiRoutes.use("/partner", PartnerRoutes);

const PaymentRoutes = require('./routes/payment_routes');
ApiRoutes.use("/payment", PaymentRoutes);

const TransactionRoutes = require('./routes/transaction_routes');
ApiRoutes.use("/transaction", TransactionRoutes);

module.exports = ApiRoutes;