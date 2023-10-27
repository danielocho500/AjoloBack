const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const { getStallsInfo } = require("../../db/stall/getStalls")
const User = require("../../models/User");
const Stall = require("../../models/Stalls")
const Userstalls = require("../../models/Userstalls");

const getStalls = async (req, res) => {
  console.log("GET Stall");

  const { query } = req.query;
  
  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const uuid = getUidByToken(req.headers.authtoken);

  const user = await User.findOne({ where: { uuid } });
  if (!user) {
    return responseMsg(res, 401, "fail", "Not user Found", {
    
    });
  }

  const stalls = await getStallsInfo(user, query);

  return responseMsg(res, 200, "Success", "Stalls obtained", {
    stalls
  });
};

module.exports = {
    getStalls,
};
