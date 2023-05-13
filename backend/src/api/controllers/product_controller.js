const { Request, Response } = require('express');
const ProductModel = require('./../models/product_model');
const ApiResponse = require('./../config/response');
const { Types } = require('mongoose');

const ProductController = {

    /**
     * @param {Request} req
     * @param {Response} res
    */
    getProductsForPartner: async function(req, res) {
        try {
            const partnerId = req.params.id;
            const products = await ProductModel.find({ partnerId: partnerId });
            return ApiResponse.success(res, products);
        }
        catch(ex) {
            return ApiResponse.error(res, ex.toString());
        }
    },

    /**
     * @param {Request} req
     * @param {Response} res
    */
    createProduct: async function(req, res) {
        try {
            const productData = req.body;
            const newProduct = new ProductModel(productData);
            await newProduct.save();
            return ApiResponse.success(res, newProduct);
        }
        catch(ex) {
            return ApiResponse.error(res, ex.toString());
        }
    },

    /**
     * @param {Request} req
     * @param {Response} res
    */
    updateProduct: async function(req, res) {
        try {
            const id = req.params.id;
            if(!Types.ObjectId.isValid(id)) throw "Invalid id";
            
            const updateData = req.body;
            
            const updatedProduct = await ProductModel.findOneAndUpdate(
                { _id: id },
                updateData,
                { new: true }
            );
            
            if(!updatedProduct) {
                throw "Product not found!";
            }

            return ApiResponse.success(res, updatedProduct);
        }
        catch(ex) {
            return ApiResponse.error(res, ex.toString());
        }
    },

    /**
     * @param {Request} req
     * @param {Response} res
    */
    deleteProduct: async function(req, res) {
        try {
            const id = req.params.id;
            if(!Types.ObjectId.isValid(id)) throw "Invalid id";
            
            const deletedProduct = await ProductModel.findOneAndDelete({ _id: id });
            
            if(!deletedProduct) {
                throw "Product not found!";
            }

            return ApiResponse.success(res, deletedProduct);
        }
        catch(ex) {
            return ApiResponse.error(res, ex.toString());
        }
    },

};

module.exports = ProductController;