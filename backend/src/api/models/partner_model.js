const { Schema, model } = require('mongoose');
const Hasher = require('./../services/hasher');

const partnerSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    brandName: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: "Partner" },
    isApproved: { type: Boolean, default: false },
    isRejected: { type: Boolean, default: false },
    approvedOn: { type: Date },
    createdOn: { type: Date },
    updatedOn: { type: Date }
});

partnerSchema.pre('save', function(next) {
    this.createdOn = new Date();
    this.updatedOn = new Date();

    // Hash the password
    const hash = Hasher.generateHash(this.password);
    this.password = hash;

    next();
});

partnerSchema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();
    next();
});

const PartnerModel = model('Partner', partnerSchema);

module.exports = PartnerModel;