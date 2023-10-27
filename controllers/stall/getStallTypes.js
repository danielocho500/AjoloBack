const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const StallTypes = require("../../models/Stalltypes")

const getStallTypes = async (req, res) => {
  console.log("Get Stalls types");

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

  const stalls = await StallTypes.findAll();
  
  return responseMsg(res, 200, 'success', 'Stall types', {
    stalls,
  })
};

module.exports = {
    getStallTypes,
};
