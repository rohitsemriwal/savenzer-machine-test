const { Request, Response } = require('express');
const AdminModel = require('./../models/admin_model');
const ApiResponse = require('./../config/response');
const AdminModel = require('./../models/admin_model');
const Hasher = require('./../services/hasher');

const AdminController = {

    /**
     * @param {Request} req
     * @param {Response} res
    */
    createAdmin: async function(req, res) {
        try {
            const adminData = req.body;
            const newAdmin = new AdminModel(adminData);
            await newAdmin.save();
            return ApiResponse.success(res, newAdmin);
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
            const { username, password } = req.body;
            const foundAdmin = await AdminModel.findOne({
                username: username
            });

            if(!foundAdmin) throw "No account found!";

            if(!Hasher.compareHash(password, foundAdmin.password)) throw "Incorrect password";

            return ApiResponse.success(res, foundAdmin);
        }
        catch(ex) {
            return ApiResponse.error(res, ex.toString());
        }
    },

    /**
     * @param {Request} req
     * @param {Response} res
    */
    updateAdmin: async function(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
                
            const updatedAdmin = await AdminModel.findOneAndUpdate(
                { _id: id },
                updateData,
                { new: true }
            );

            if(!updatedAdmin) throw "Account not found!";

            return ApiResponse.success(res, updatedAdmin);
        }
        catch(ex) {
            return ApiResponse.error(res, ex.toString());
        }
    }

};

module.exports = AdminController;