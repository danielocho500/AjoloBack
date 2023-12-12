const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const Shop = require("../../models/Shopcoins");
const User = require("../../models/User");
const Coupon = require("../../models/Coupons");
const { createShopCash } = require("../../db/shopcoins/createShopCash");
const { updateCoins } = require("../../db/user/updateCoins");

const shopCoinsCash = async (req, res) => {
  console.log("Shop coins");

  const {
    uuidClient,
    idCoupon,
    cost} = req.body;

    const coins = cost / 10;

  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const uuidEmployer = getUidByToken(req.headers.authtoken);

  const employer = await User.findOne({ where: { uuid: uuidEmployer } });
  if (!employer) {
    return responseMsg(res, 401, "fail", "employer not found", {
      isCorrect: false,
    });
  }

  const client = await User.findOne({ where: { uuid: uuidClient } });
  if (!client) {
    return responseMsg(res, 401, "fail", "Client not found", {
      isCorrect: false,
    });
  } else {
    const sum = client.coins + coins;
    const clientUpdated = await updateCoins(uuidClient, sum);
    if (!clientUpdated) {
      return responseMsg(res, 401, "fail", "Client couldn't be updated", {
        isCorrect: false,
      });
    }
  }

  if(idCoupon){
    const coupon = await Coupon.findOne({ where: { id: idCoupon } });
    if (!coupon) {
      return responseMsg(res, 401, "fail", "Coupon not found", {
        isCorrect: false,
      });
  }
  }
  

  const shop = await createShopCash(uuidClient, uuidEmployer, cost, idCoupon);
  if (!shop) {
    return responseMsg(res, 401, "fail", "The shopping couldn't be completed", {
      edited: false,
    });
  }


  return responseMsg(res, 200, 'success', 'Shopping saved', shop)
};

module.exports = {
  shopCoinsCash,
};
