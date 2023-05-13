const ProductRoutes = require('express').Router();
const ProductController = require('./../controllers/product_controller');

ProductRoutes.get("/:partnerId", ProductController.getProductsForPartner);
ProductRoutes.post("/", ProductController.createProduct);
ProductRoutes.put("/:id", ProductController.updateProduct);
ProductRoutes.delete("/:id", ProductController.deleteProduct);

module.exports = ProductRoutes;