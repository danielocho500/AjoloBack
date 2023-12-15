const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { check } = require("express-validator");
const { shopStallService } = require("../controllers/payment/shopStall");

const router = Router();

router.post("/create", [validateParams, validateJWT], shopStallService);

module.exports = router;
