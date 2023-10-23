const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const {createQR} = require("../../db/qr/createqr");
const User = require("../../models/User");

const generateQRCode = async (req, res) => {
  console.log("GET QR");

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

  if(user.id_rol != 1){
    return responseMsg(res, 401, "fail", "Not authorized to create QR Codes", {
        logged: false,
      });
  }

  const qrCode = await createQR(uuid)

  console.log(qrCode)
  if(qrCode == -1){
    return responseServerError(res)
  }

  return responseMsg(res, 200, 'success', 'QRCreated', {
    qrCode,
  })
};

module.exports = {
  generateQRCode,
};
