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
      user: userfound,
      logged: true,
    });
  } 

  const result = checkPassword(password,User.password)
  if(result){
    const token = generateJWT(userfound.uuid, userAgent, userIp)

    return responseMsg(res, 200, 'success', "Correct Login", {
      userInfo: {
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
  else{
    return responseMsg(res, 401, true, "The credentials are incorrect", {
      user: userfound,
      logged: true,
    });
  }
};

module.exports = {
  authLogin,
};
