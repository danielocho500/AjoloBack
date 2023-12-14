const { getRoleByUuid } = require("../../db/user/getRoleByUuid");
const { ROLES } = require("../../helpers/RolesEnum");
const { responseMsg } = require("../../helpers/responseMsg");
const { getUidByToken } = require("../../jwt/getUidByToken");
const Coupons = require("../../models/Coupons");

const createCoupon = async (req, res) => {
    console.log("Post Coupon");

    const {id_coupon_type, value_coupon, code_coupon, uses_per_user = -1, total_uses = -1, minimun_amount = -1} = req.body;

    const uuid = await getUidByToken(req.headers.authtoken)
    const role = await getRoleByUuid(uuid);

    if(role != ROLES.ADMIN && role != ROLES.EMPLOYEER){
        return responseMsg(res, 501, "fail", "Not Authorized", {
            registered: false,
        });
    }

    if(id_coupon_type == 2 && value_coupon > 100){
        return responseMsg(res, 501, "fail", "The coupon Value Must be between 1 and 100", {
            registered: false,
        });
    }

    const coupon = await Coupons.findOne({ where: {code_coupon} })

    if(coupon){
        if (coupon.enabled)
            return responseMsg(res, 501, "fail", "The coupon code Already Exist", {
                registered: false,
            });
        else
            return responseMsg(res, 501, "fail", "The coupon code Already Exist and isn't enabled", {
                registered: false,
            });
    }
    
    await Coupons.create({
        id_coupon_type,
        code_coupon,
        minimun_amount,
        value_coupon,
        uses_per_user,
        total_uses,
        enabled: true
    })

    return responseMsg(res, 201, "success", "Coupon Added", {
        registered: true,
    })
}

module.exports = {
    createCoupon
}