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

  const userfound = await User.findOne({ where: { email } });
  if (!userfound) {
    return responseMsg(res, 401, "fail", "The credentials are incorrect", {
      logged: false,
    });
  }

  const result = await checkPassword(password, userfound.ps)
  if (result) {
    const token = await generateJWT(userfound.uuid, userAgent, userIp, userfound.id_rol)
    console.log("correct login")
    console.log(token)
    return responseMsg(res, 200, 'success', "Correct Login", {
      userInfo: {
        uuid: userfound.uuid,
        email: userfound.email,
        id_rol: userfound.id_rol,
        user_name: userfound.user_name,
        coins: userfound.coins,
        image_url: userfound.image_url,
        language_configured: userfound.language_configured
      },
      registered: true,
      token,
    });
  }
  else {
    console.log("incorrect login :C")
    return responseMsg(res, 401, true, "The credentials are incorrect", {
      logged: false,
    });
  }
};

module.exports = {
  authLogin,
};
