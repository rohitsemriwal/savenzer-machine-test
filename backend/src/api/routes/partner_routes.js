const PartnerRoutes = require('express').Router();
const PartnerController = require('./../controllers/partner_controller');

PartnerRoutes.get("/", PartnerController.getPartners);
PartnerRoutes.get("/:id/subPartners", PartnerController.getSubPartners);
PartnerRoutes.get("/approvalRequests", PartnerController.getApprovalRequests);

PartnerRoutes.post("/", PartnerController.createPartner);
PartnerRoutes.post("/logIn", PartnerController.logIn);

PartnerRoutes.put("/:id", PartnerController.updatePartner);

PartnerRoutes.delete("/:id", PartnerController.deletePartner);

module.exports = PartnerRoutes;