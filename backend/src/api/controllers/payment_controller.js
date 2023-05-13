const Payments = require('./../config/razorpay');
const ProductModel = require('./../models/product_model');
const uuid = require('uuid');
const ApiResponse = require('./../config/response');
const { Types } = require('mongoose');

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
                callback_url: `http://localhost:5000/paymentCompleted`,
                callback_method: "get"
            });

            return ApiResponse.success(res, paymentLink.short_url);
        }
        catch(ex) {
            return ApiResponse.error(res, ex);
        }
    },

};

module.exports = PaymentController;