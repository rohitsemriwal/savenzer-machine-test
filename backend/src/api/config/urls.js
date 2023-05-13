// Api URLs
const API_URL = "http://localhost:5000/api";

// Client URLs
const CLIENT_BASE_URL = "http://localhost";
const ClIENT_PAYMENT_COMPLETED = CLIENT_BASE_URL + "/payment-completed";

// Redirect
const RAZORPAY_PAYMENT_REDIRECT = API_URL + '/payment/completePayment';

module.exports = {
    API_URL,
    CLIENT_BASE_URL,
    ClIENT_PAYMENT_COMPLETED,
    RAZORPAY_PAYMENT_REDIRECT
};