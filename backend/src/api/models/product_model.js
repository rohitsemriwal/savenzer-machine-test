const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    partnerId: { type: Schema.Types.ObjectId, ref: "Partner", required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    createdOn: { type: Date },
    updatedOn: { type: Date }
});

productSchema.pre('save', function(next) {
    this.createdOn = new Date();
    this.updatedOn = new Date();
    next();
});

productSchema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();
    next();
});

const ProductModel = model('Product', productSchema);

module.exports = ProductModel;