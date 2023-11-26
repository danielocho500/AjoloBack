const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const { emailExistsInUpdate } = require("../../db/user/emailExists");
const { userNameExistsInUpdate } = require("../../db/user/userNameExists");

const deleteUser = async (req, res) => {
  console.log("Delete User");

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

  user.enabled = 0;

  await user.save();

  return responseMsg(res, 200, 'success', 'User deleted', {})
};

module.exports = {
  updateUser,
};
