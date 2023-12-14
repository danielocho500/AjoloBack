const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { check } = require("express-validator");
const {
  getShoppingsByIdClient,
} = require("../controllers/ajolocoins/getShoppings");
const {shopCoinsCash } = require("../controllers/ajolocoins/shopCoinsCash");
const { shopCoinsCard } = require("../controllers/ajolocoins/shopCoinsCard");
const router = Router();
router.get(
  "/getShoppings",
  [validateParams, validateJWT],
  getShoppingsByIdClient
);

router.post("/cash", 
  [
    check("uuidClient", "the uuidClient is required").notEmpty(),
    check("idCoupon", "the idCoupon is required"),
    check("cost", "the cost is required").notEmpty(),
    validateParams, 
    validateJWT], 
  shopCoinsCash);

router.post("/card",
  [
    check("idCoupon", "the idCoupon is required"),
    check("cost", "the cost is required").notEmpty(),
    validateParams, 
    validateJWT
  ],
  shopCoinsCard);

module.exports = router;
