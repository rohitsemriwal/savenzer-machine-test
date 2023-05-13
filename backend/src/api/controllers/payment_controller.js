const Payments = require('./../config/razorpay');
const ProductModel = require('./../models/product_model');
const TransactionModel = require('./../models/transaction_model');
const uuid = require('uuid');
const ApiResponse = require('./../config/response');
const { Types } = require('mongoose');
const { ClIENT_PAYMENT_COMPLETED, RAZORPAY_PAYMENT_REDIRECT } = require('./../config/urls');

const PaymentController = {

    /**
     * @param {Request} req
     * @param {Response} res
    */
    createPaymentLink: async function(req, res) {
        try {
            const { partnerId, productId } = req.body;
            if(!Types.ObjectId.isValid(partnerId)) throw "Invalid partnerId";
            if(!Types.ObjectId.isValid(productId)) throw "Invalid productId";

            // Fetching product details
            const foundProduct = await ProductModel.findOne({ _id: productId });
            if(!foundProduct) throw "Product not found!";

            const paymentLink = await Payments.paymentLink.create({
                // Converting Rupee to Paisa (assuming our database the prices in rupee)
                amount: foundProduct.price * 100,
                currency: "INR",
                notify: {
                    sms: true,
                    email: true
                },
                notes: {
                    price: foundProduct.price,
                    partnerId: partnerId.toString(),
                    productId: productId.toString()
                },
                callback_url: RAZORPAY_PAYMENT_REDIRECT,
                callback_method: "get"
            });

            return ApiResponse.success(res, paymentLink.short_url);
        }
        catch(ex) {
            return ApiResponse.error(res, ex);
        }
    },

    /**
     * @param {Request} req
     * @param {Response} res
    */
    completePayment: async function(req, res) {
        try {
            const {
                razorpay_payment_id,
                razorpay_payment_link_id,
                razorpay_signature
            } = req.query;

            const paymentLinkData = await Payments.paymentLink.fetch(razorpay_payment_link_id);
            const customer = paymentLinkData.customer;
            const notes = paymentLinkData.notes;

            // Create new Transaction
            const newTransaction = new TransactionModel({
                partnerId: notes.partnerId,
                customerName: customer.name,
                customerEmail: customer.email,
                customerPhone: customer.contact,
                paymentId: razorpay_payment_id,
                paymentLinkId: razorpay_payment_link_id,
                signature: razorpay_signature,
                status: paymentLinkData.status,
                amount: paymentLinkData.amount_paid
            });
            await newTransaction.save();

            return res.redirect(ClIENT_PAYMENT_COMPLETED);
        }
        catch(ex) {
            return ApiResponse.error(res, ex.toString());
        }
    }

};

module.exports = PaymentController;