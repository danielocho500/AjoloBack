const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const Shop = require("../../models/Shopcoins");
const User = require("../../models/User");
const Coupon = require("../../models/Coupons");
const { createShopCash } = require("../../db/shopcoins/createShopCash");
const { updateCoins } = require("../../db/user/updateCoins");
const { createTicket } = require("../../db/aojopay/createTicket");

const shopStallService = async (req, res) => {
  console.log("Shop in stall");

  const { uuid_client, coins } = req.body;

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

  const client = await User.findOne({ where: { uuid: uuid_client } });
  if (!client) {
    return responseMsg(res, 401, "fail", "Client not found", {
      isCorrect: false,
    });
  } else {
    const sum = client.coins - coins;
    const clientUpdated = await updateCoins(uuid_client, sum);
    if (!clientUpdated) {
      return responseMsg(res, 401, "fail", "Client couldn't be updated", {
        isCorrect: false,
      });
    }
  }

  const shop = await createTicket(uuid_client, uuidEmployer, coins);
  if (!shop) {
    return responseMsg(res, 401, "fail", "The shopping couldn't be completed", {
      edited: false,
    });
  }

  return responseMsg(res, 200, "success", "Shopping saved", shop);
};

module.exports = {
  shopStallService,
};
