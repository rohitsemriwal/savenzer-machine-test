const { Request, Response } = require('express');
const PartnerModel = require('./../models/partner_model');
const ApiResponse = require('./../config/response');
const { Types } = require('mongoose');
const Hasher = require('../services/hasher');
const TransactionModel = require('./../models/transaction_model');

const PartnerController = {

    /**
     * @param {Request} req
     * @param {Response} res
    */
    getPartners: async function(req, res) {
        try {
            const partners = await PartnerModel.find();
            return ApiResponse.success(res, partners);
        }
        catch(ex) {
            return ApiResponse.error(res, ex.toString());
        }
    },

    /**
     * @param {Request} req
     * @param {Response} res
    */
    getSubPartners: async function(req, res) {
        try {
            const id = req.params.id;
            if(!Types.ObjectId.isValid(id)) throw "Invalid id";
            
            const partners = await PartnerModel.find({ parent: id });
            return ApiResponse.success(res, partners);
        }
        catch(ex) {
            return ApiResponse.error(res, ex.toString());
        }
    },

    /**
     * @param {Request} req
     * @param {Response} res
    */
    getApprovalRequests: async function(req, res) {
        try {            
            const partners = await PartnerModel.find({ isApproved: false, isRejected: false });
            return ApiResponse.success(res, partners);
        }
        catch(ex) {
            return ApiResponse.error(res, ex.toString());
        }
    },

    /**
     * @param {Request} req
     * @param {Response} res
    */
    createPartner: async function(req, res) {
        try {
            const partnerData = req.body;
            const newPartner = new PartnerModel(partnerData);
            await newPartner.save();
            return ApiResponse.success(res, newPartner);
        }
        catch(ex) {
            return ApiResponse.error(res, ex.toString());
        }
    },

    /**
     * @param {Request} req
     * @param {Response} res
    */
    logIn: async function(req, res) {
        try {
            const {email, password} = req.body;
            
            const foundPartner = await PartnerModel.findOne({ email: email });
            if(!foundPartner) throw "No account exists with the given email id";

            // Comparing the password to hash
            if(!Hasher.compareHash(password, foundPartner.password)) throw "Incorrect Password";

            // Checking if the account is approved or not
            if(!foundPartner.isApproved) throw "This account has not been approved yet!";

            return ApiResponse.success(res, foundPartner);
        }
        catch(ex) {
            return ApiResponse.error(res, ex.toString());
        }
    },

    /**
     * @param {Request} req
     * @param {Response} res
    */
    updatePartner: async function(req, res) {
        try {
            const id = req.params.id;
            if(!Types.ObjectId.isValid(id)) throw "Invalid id";

            const updateData = req.body;
            
            const updatedPartner = await PartnerModel.findOneAndUpdate(
                { _id: id },
                updateData,
                { new: true }
            );
            
            if(!updatedPartner) {
                throw "Partner not found!";
            }

            return ApiResponse.success(res, updatedPartner);
        }
        catch(ex) {
            return ApiResponse.error(res, ex.toString());
        }
    },

    /**
     * @param {Request} req
     * @param {Response} res
    */
    deletePartner: async function(req, res) {
        try {
            const id = req.params.id;
            if(!Types.ObjectId.isValid(id)) throw "Invalid id";
            
            const deletedPartner = await PartnerModel.findOneAndDelete({ _id: id });
            
            if(!deletedPartner) {
                throw "Partner not found!";
            }

            return ApiResponse.success(res, deletedPartner);
        }
        catch(ex) {
            return ApiResponse.error(res, ex.toString());
        }
    },

};

module.exports = PartnerController;