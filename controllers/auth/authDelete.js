const { deleteUser } = require("../../db/user/deleteUser");
const { emailExistsInUpdate } = require("../../db/user/emailExists");
const { verifyConnection } = require("../../db/verifyConnection");
const { getRequestData } = require("../../helpers/getRequestData");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { generateJWT } = require("../../jwt/generateJWT");

const authDelete = async (req, res) => {
  console.log("DELETE Method");
  const { uuid } = req.body;

  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseMsg(res, 500, "error", "internal server error", {
      updated: false,
    });
  }

  try {
    const user = await deleteUser(uuid);

    return responseMsg(res, 200, 'success', "User disabled", {
      user: user,
      updated: true,
    });
  } catch (err) {
    console.log(err);
    return responseServerError(res);
  }
};

module.exports = {
  authDelete,
};
