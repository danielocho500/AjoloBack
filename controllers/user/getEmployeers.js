const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");

const getEmployeers = async (req, res) => {
  console.log("Get Employeers");

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

  if(user.id_rol != 2){
    return responseMsg(res, 401, "fail", "Not authorized", {
        logged: false,
      });
  }

  const users = await User.findAll({
    where: {
      id_rol: {
        [Op.or]: [3, 4] // Utilizando Sequelize (suponiendo que estás utilizando Sequelize)
      }
    }
  });

  return responseMsg(res, 200, 'success', 'Users obtained', {
    users,
  })
};

module.exports = {
  getEmployeers,
};
