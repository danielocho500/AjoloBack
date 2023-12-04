const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { check } = require("express-validator");
const {
  getShoppingsByIdClient,
} = require("../controllers/ajolocoins/getShoppings");
const { shopCoins } = require("../controllers/ajolocoins/shopCoins");

const router = Router();
router.get(
  "/getShoppings/:id_client",
  [validateParams, validateJWT],
  getShoppingsByIdClient
);

router.post("/add", [validateParams, validateJWT], shopCoins);

module.exports = router;
