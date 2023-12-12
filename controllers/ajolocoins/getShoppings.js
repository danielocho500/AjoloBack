const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const { getShoppings } = require("../../db/shopcoins/getShoppings");
const Coupons = require("../../models/Coupons");

const getShoppingsByIdClient = async (req, res) => {
  console.log("Get shoppings");

  const { id_client } = req.params;

  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const uuid = getUidByToken(req.headers.authtoken);

  const user = await User.findOne({ where: { uuid } });
  if (!user) {
    return responseMsg(res, 401, "fail", "Not user Found", {
      qrCode: false,
    });
  }

  const shoppings = await getShoppings(id_client);

  const couponNames = await Promise.all(
    shoppings.map(async (shopping) => {
      if (shopping.id_coupon) {
        const coupon = await Coupons.findOne({ where: { id: shopping.id_coupon } });
        return coupon ? coupon.code_coupon : "N/A";
      } else {
        return "N/A";
      }
    })
  );

  const shoppingsWithCouponNames = shoppings.map((shopping, index) => ({
    payment_method: shopping.id_payment_method,
    cost: shopping.cost,
    coins: shopping.cost / 10 ,
    couponName: couponNames[index],
    createdAt: shopping.createdAt
  }));

  return responseMsg(res, 200, "success", "Shoppings obtained", {
    shoppings: shoppingsWithCouponNames,
  });
};

module.exports = {
  getShoppingsByIdClient,
};
