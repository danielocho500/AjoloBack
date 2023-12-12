const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const Coupon = require("../../models/Coupons");
const { updateCoins } = require("../../db/user/updateCoins");
const Creditcards = require("../../models/Creditcards");
const { createShopCard } = require("../../db/shopcoins/createShopCard");

const shopCoinsCard = async (req, res) => {
  console.log("Shop coins with Card");

  const {
    idCoupon,
    cost} = req.body;

  const coins = cost / 10;

  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const uuid = getUidByToken(req.headers.authtoken);

  const client = await User.findOne({ where: { uuid } });
  if (!client) {
    return responseMsg(res, 401, "fail", "client not found", {
      isCorrect: false,
    });
  }

  if(idCoupon){
    const coupon = await Coupon.findOne({ where: { id: idCoupon } });
    if (!coupon) {
      return responseMsg(res, 401, "fail", "Coupon not found", {
        isCorrect: false,
      });
    }
  }

  const card = await Creditcards.findOne({ where: { uuid_client: uuid  }})
  if(!card){
    return responseMsg(res, 401, "fail", "Card not found", {
        isCorrect: false,
      });
  }

  const shop = await createShopCard(uuid, cost, card.id, idCoupon );
  if (!shop) {
    return responseMsg(res, 401, "fail", "The shopping couldn't be completed", {
      edited: false,
    });
  }

  const sum = client.coins + coins;
  await updateCoins(uuid, sum);


  return responseMsg(res, 200, 'success', 'Shopping saved', shop)
};

module.exports = {
  shopCoinsCard,
};
