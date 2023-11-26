const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const { emailExistsInUpdate } = require("../../db/user/emailExists");
const { userNameExistsInUpdate } = require("../../db/user/userNameExists");

const updateUserAdmin = async (req, res) => {
  console.log("Update User by admin");

  const {email, username} = req.body;

  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const uuidAdmin = getUidByToken(req.headers.authtoken);
  const {uuid} = req.params;

  const userAdmin = await User.findOne({ where: { uuid: uuidAdmin } });
  if (!userAdmin) {
    return responseMsg(res, 404, "fail", "Not user Found", {
      qrCode: false,
    });
  }

  if(userAdmin.id_rol != 2){
    return responseMsg(res, 401, "fail", "Not authorized", {
        qrCode: false,
      });
  }

  const userToEdit = await User.findOne({ where: { uuid } });
  if (!userToEdit || userToEdit.enabled == 0) {
    return responseMsg(res, 404, "fail", "Uuid not valid", {});
  }


  if(email){
    const validEmail = await emailExistsInUpdate(email);
    if (!validEmail) {
        return responseMsg(res, 401, "fail", "email already registered", {
        edited: false,
        });
    }
  }
  
  if(username){
    const validUserName = await userNameExistsInUpdate(username);
    if (!validUserName) {
        return responseMsg(res, 401, "fail", "username already registered", {
        edited: false,
        });
    }
  }
  if(username)
    userToEdit.user_name = username

  if(email)
    userToEdit.email = email

  await userToEdit.save();

  return responseMsg(res, 200, 'success', 'User updated', {
    user_name: userToEdit.user_name,
    email: userToEdit.email,
  })
};

module.exports = {
  updateUserAdmin,
};
