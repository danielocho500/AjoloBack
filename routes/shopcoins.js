const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { check } = require("express-validator");
const { getUsersByRol } = require("../controllers/user/getUsersByRol");
const { shopCoins } = require('../controllers/ajolocoins/shopCoins');


const router = Router();
router.get(
  "/getShoppings/:id_client",
  [
    validateParams,
    validateJWT
  ],
  getUsersByRol
);

router.post(
  "/add",
  [
    validateParams,
    validateJWT
  ],
  shopCoins
);

module.exports = router;
