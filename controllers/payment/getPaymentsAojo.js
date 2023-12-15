const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const { getPayment } = require("../../db/aojopay/getPayments");
const Coupons = require("../../models/Coupons");
const Userstalls = require("../../models/Userstalls");
const { list } = require("firebase/storage");

const getPaymentesByIdClient = async (req, res) => {
  console.log("Get shoppings");

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

  const list = [];

  const shoppings = await getPayment(uuid);
  console.log(shoppings);

  if (shoppings) {
    for (element in shoppings) {
      const stall = Userstalls.findOne({
        where: { uuid: element.uuid_employeer },
      });
      console.log(stall);
      if (stall) {
        list.push({ shop: element, stall: stall });
      }
    }
  }

  return responseMsg(res, 200, "success", "Shoppings obtained", {
    shoppings: list,
  });
};

module.exports = {
  getPaymentesByIdClient,
};
