const RazorPay = require('razorpay');

const Payments = new RazorPay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
});

module.exports = Payments;