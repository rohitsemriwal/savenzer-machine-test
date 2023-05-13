const { Request, Response } = require('express');
const TransactionModel = require('./../models/transaction_model');
const ApiResponse = require('./../config/response');
const { Types } = require('mongoose');

const TransactionController = {

    /**
     * @param {Request} req
     * @param {Response} res
    */
    getTransactionsForPartner: async function(req, res) {
        try {
            const partnerId = req.params.partnerId;
            const transactions = await TransactionModel.find({ partnerId: partnerId });
            return ApiResponse.success(res, transactions);
        }
        catch(ex) {
            return ApiResponse.error(res, ex);
        }
    }

};

module.exports = TransactionController;