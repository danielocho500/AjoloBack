const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { check } = require("express-validator");
const { updateCard } = require("../controllers/credit card/updateCard");
const { getCard } = require("../controllers/credit card/getCreditCard");

const cardNumberRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

const router = Router();

router.post(
  "/update",
  [
    check("card_number", "put a valid card number").notEmpty().matches(cardNumberRegex),
    check("card_holder", "put a valid name").notEmpty(),
    check("card_expiration_month", "put a valid month, between 1-12").notEmpty().isInt({min: 1, max: 12}),
    check("card_expiration_year", "put a valid year").notEmpty().isInt({min: 2023, max: 2040}),
    validateParams,
    validateJWT
  ],
  updateCard
);

router.get(
  "/card",
  [
    validateParams,
    validateJWT
  ],
  getCard
)
module.exports = router;
