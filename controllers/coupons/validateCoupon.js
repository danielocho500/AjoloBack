const { getRoleByUuid } = require("../../db/user/getRoleByUuid");
const { ROLES } = require("../../helpers/RolesEnum");
const { responseMsg } = require("../../helpers/responseMsg");
const { getUidByToken } = require("../../jwt/getUidByToken");
const Coupons = require("../../models/Coupons");

const validateCoupon = async (req, res) => {
    console.log("Post Coupon");

    const {code, uuid} = req.params;

    const uuidUser = await getUidByToken(req.headers.authtoken)
    const role = await getRoleByUuid(uuidUser);

    if(role != ROLES.ADMIN && role != ROLES.EMPLOYEER){
        return responseMsg(res, 501, "fail", "Not Authorized", {
            registered: false,
        });
    }

    const coupon = await Coupons.findOne({ where: {code_coupon: code} })

    if(!coupon){
        return responseMsg(res, 404, "fail", "Not Valid Coupon", {
            valid: false,
        });
    }

    if(!coupon.enabled){
        return responseMsg(res, 404, "fail", "Not Enabled Coupon", {
            valid: false,
        });
    }

    return responseMsg(res, 201, "success", "Valid Coupon", {
        valid: true,
        id_coupon_type: (coupon.id_coupon_type == 1) ? "Discount" : "Percentage",
        minimun_amount: (coupon.minimun_amount > 0) ? coupon.minimun_amount : 0,
        value_coupon: coupon.value_coupon,
        id_coupon: coupon.id
    })
}

module.exports = {
    validateCoupon
}