const { getRoleByUuid } = require("../../db/user/getRoleByUuid");
const { verifyConnection } = require("../../db/verifyConnection");
const { ROLES } = require("../../helpers/RolesEnum");
const { responseMsg } = require("../../helpers/responseMsg");
const { getUidByToken } = require("../../jwt/getUidByToken");
const Coupons = require("../../models/Coupons");
const User = require("../../models/User");

const deleteCoupon = async (req, res) => {
    console.log("Delete Coupon");

    const { id } = req.params;

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

    if (user.id_rol == 1) {
        return responseMsg(res, 401, "fail", "Not authorized to create Stalls", {
            logged: false,
        });
    }

    const coupon = await Coupons.destroy(
        {
            where: { id: id },
        }
    );

    return responseMsg(res, 201, "success", "Coupon deleted", {})
}

module.exports = {
    deleteCoupon
}