const AdminRoutes = require('express').Router();
const AdminController = require('./../controllers/admin_controller');

AdminRoutes.post("/", AdminController.createAdmin);
AdminRoutes.post("/logIn", AdminController.logIn);

module.exports = AdminRoutes;