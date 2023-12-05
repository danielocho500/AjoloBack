const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { generateQRCode } = require("../controllers/qr/qrGenerate")
const { validateQr } = require("../controllers/qr/qrValidate");
const { check } = require("express-validator");

const router = Router();
router.get(
  "/generate",
  [
    validateParams,
    validateJWT
  ],
  generateQRCode
);

router.get(
  "/validate/:code_qr",
  [
    check("code_qr", "You should the code of the qr").notEmpty(),
    validateParams,
    validateJWT
  ],
  validateQr
);

module.exports = router;
