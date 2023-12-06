const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { check } = require("express-validator");
const { publishReview } = require("../controllers/reviews/createReview");
const { removeReview } = require("../controllers/reviews/deleteReview");
const { getReviewsListByStall } = require("../controllers/reviews/getReviewsByStall");

const router = Router();
router.post(
  "/create",
  [validateParams, validateJWT],
  publishReview
);

router.delete(
  "/delete/:id",
  [
    validateParams,
    validateJWT
  ],
  removeReview
);

router.get(
  "/stall/:id",
  [
    validateParams,
    validateJWT
  ],
  getReviewsListByStall
);

module.exports = router;
