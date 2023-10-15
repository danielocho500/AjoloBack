const { updateUser } = require("../../db/user/updateUser");
const { emailExistsInUpdate } = require("../../db/user/emailExists");
const { verifyConnection } = require("../../db/verifyConnection");
const { getRequestData } = require("../../helpers/getRequestData");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { validateJWT } = require("../../jwt/validateJWT");

const authUpdate = async (req, res) => {
  
  const {
    uuid,
    email,
    password,
    username,
    coins,
    imageUrl,
    languageConfigured,
    enabled,
    rol,
  } = req.body;

  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseMsg(res, 500, "error", "internal server error", {
      updated: false,
    });
  }

  const validEmail = await emailExistsInUpdate(email);
  if (!validEmail) {
    return responseMsg(res, 401, "fail", "email already registered", {
      updated: false,
    });
  }

  try {
    const user = await updateUser(
      uuid,
      email,
      password,
      username,
      coins,
      imageUrl,
      languageConfigured,
      enabled,
      rol
    );

    return responseMsg(res, 200, 'success', "User updated", {
      user: user,
      updated: true,
    });
  } catch (err) {
    console.log(err);
    return responseServerError(res);
  }
};

module.exports = {
  authUpdate,
};
