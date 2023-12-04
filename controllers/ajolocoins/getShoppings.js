const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const { getShoppings } = require("../../db/shopcoins/getShoppings");

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

  return responseMsg(res, 200, "success", "Shoppings obtained", {
    shoppings,
  });
};

module.exports = {
  getShoppingsByIdClient,
};
