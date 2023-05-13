const { Schema, model } = require('mongoose');
const Hasher = require('./../services/hasher');

const adminSchema = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    createdOn: { type: Date },
    updatedOn: { type: Date }
});

adminSchema.pre('save', function(next) {
    this.createdOn = new Date();
    this.updatedOn = new Date();

    // Hash the password
    const hash = Hasher.generateHash(this.password);
    this.password = hash;

    next();
});

adminSchema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();
    next();
});

const AdminModel = model('Admin', adminSchema);

module.exports = AdminModel;