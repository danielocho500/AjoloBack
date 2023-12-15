const { Router } = require("express");
const { validateParams } = require("../helpers/validateParams");
const { validateJWT } = require("../jwt/validateJWT");
const { createCoupon } = require("../controllers/coupons/createCoupon");
const { check } = require("express-validator");
const { validateCoupon } = require("../controllers/coupons/validateCoupon");
const { deleteCoupon } = require("../controllers/coupons/deleteCoupon");
const { findAllCoupons } = require("../controllers/coupons/getAllCoupons");

const router = Router();

router.post(
    "/create",
    [
        check("id_coupon_type", "put a valid name").notEmpty().isAlphanumeric().custom((value) => {
            if (value !== 1 && value !== 2) {
                throw new Error("id_coupon_type must be 1 for Discount or 2 for Percentaje");
            }
            return true;
        }),
        check("value_coupon", "value_coupon is required").notEmpty().isAlphanumeric().custom(value => {
            if (value <= 0) {
                throw new Error("value_coupon must be more than 0");
            }
            return true;
        }),
        check("code_coupon", "value_coupon is required").notEmpty(),
        check("minimun_amount", "minimun_amount is required"),
        check("uses_per_user", "uses_per_user is required"),
        check("total_uses", "total_uses is required"),
        validateParams,
        validateJWT
    ],
    createCoupon
)

router.get(
    "/validate/:code/:uuid",
    [
        check("code", "code is required").notEmpty(),
        validateParams,
        validateJWT
    ],
    validateCoupon
)

router.get(
    "/validate/:code",
    [
        check("code", "code is required").notEmpty(),
        validateParams,
        validateJWT
    ],
    validateCoupon
)

router.delete(
    "/delete/:id",
    [
        validateJWT
    ],
    deleteCoupon
)

router.get(
    "/coupons",
    [
        validateJWT
    ],
    findAllCoupons
)

module.exports = router;