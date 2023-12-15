const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { check } = require("express-validator");
const { shopStallService } = require("../controllers/payment/shopStall");
const {
  getPaymentesByIdClient,
} = require("../controllers/payment/getPaymentsAojo");

const router = Router();

router.post("/create", [validateParams, validateJWT], shopStallService);

router.get("/find", [validateParams, validateJWT], getPaymentesByIdClient);

module.exports = router;
