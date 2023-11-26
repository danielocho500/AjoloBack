const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const { emailExistsInUpdate } = require("../../db/user/emailExists");
const { userNameExistsInUpdate } = require("../../db/user/userNameExists");

const updateUser = async (req, res) => {
  console.log("Update Users");

  const {email, username} = req.body;

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

  if(email){
    const validEmail = await emailExistsInUpdate(email);
    if (!validEmail) {
        return responseMsg(res, 401, "fail", "email already registered", {
        registered: false,
        });
    }
  }
  
  if(username){
    const validUserName = await userNameExistsInUpdate(username);
    if (!validUserName) {
        return responseMsg(res, 401, "fail", "username already registered", {
        registered: false,
        });
    }
  }
  if(username)
    user.user_name = username

  if(email)
    user.email = email

  await user.save();

  return responseMsg(res, 200, 'success', 'User updated', {
    user_name: user.user_name,
    email: user.email,
  })
};

module.exports = {
  updateUser,
};
