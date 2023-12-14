const { getRoleByUuid } = require("../../db/user/getRoleByUuid");
const { verifyConnection } = require("../../db/verifyConnection");
const { ROLES } = require("../../helpers/RolesEnum");
const { responseMsg } = require("../../helpers/responseMsg");
const { getUidByToken } = require("../../jwt/getUidByToken");
const Coupons = require("../../models/Coupons");
const User = require("../../models/User");

const findAllCoupons = async (req, res) => {
    console.log("Find Coupon");
    const isConnected = await verifyConnection();
    if (!isConnected) {
        return responseServerError(res);
    }

    const uuid = getUidByToken(req.headers.authtoken);

    const user = await User.findOne({ where: { uuid: uuid } });
    if (!user) {
        return responseMsg(res, 401, "fail", "Not user Found", {
            created: false,
        });
    }

    const coupon = await Coupons.findAll();

    return responseMsg(res, 201, "success", "Coupons", coupon);
}

module.exports = {
    findAllCoupons
}