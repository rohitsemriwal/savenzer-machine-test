const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
    partnerId: { type: Schema.Types.ObjectId, ref: "Partner", required: true },
    customerName: { type: String, default: "" },
    customerEmail: { type: String, default: "" },
    customerPhone: { type: String, default: "" },
    amount: { type: Number, required: true },
    paymentId: { type: String, required: true },
    paymentLinkId: { type: String, required: true },
    signature: { type: String, required: true },
    status: { type: String, required: true },
    createdOn: { type: Date },
    updatedOn: { type: Date }
});

transactionSchema.pre('save', function(next) {
    this.createdOn = new Date();
    this.updatedOn = new Date();
    next();
});

transactionSchema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();
    next();
});

const TransactionModel = model('Transaction', transactionSchema);

module.exports = TransactionModel;