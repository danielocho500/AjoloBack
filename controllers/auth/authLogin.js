const { verifyConnection } = require("../../db/verifyConnection");
const { checkPassword } = require("../../helpers/checkPassword");
const { getRequestData } = require("../../helpers/getRequestData");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { generateJWT } = require("../../jwt/generateJWT");
const User = require("../../models/User");

const authLogin = async (req, res) => {
  console.log("POST Login");

  const { email, password } = req.body;
  const { userAgent, userIp } = getRequestData(req);

  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const userfound = await User.findOne({ where: { email, ps: password } });
  if (userfound) {
    return responseMsg(res, 401, true, "The credentials are incorrect", {
      user: userfound,
      logged: true,
    });
  } else {
    return responseMsg(res, 401, true, "The credentials are incorrect", {
      logged: false,
    });
  }
};

module.exports = {
  authLogin,
};
