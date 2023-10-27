const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { validateQr } = require("../controllers/qr/qrValidate");
const { check } = require("express-validator");
const { getUsersByRol } = require("../controllers/user/getUsersByRol");

const router = Router();
router.get(
  "/getByRole",
  [
    check("id_rol","You should include the id of the role, between 1-4").notEmpty().isInt({min: 1, max: 4}),
    validateParams,
    validateJWT
  ],
  getUsersByRol
);


module.exports = router;
