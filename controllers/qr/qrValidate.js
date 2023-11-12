const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const { isTimestampValid } = require("../../helpers/isTimeStampValid");
const User = require("../../models/User");
const Qr = require("../../models/Qrcodes")

const validateQr = async (req, res) => {
  console.log("GET QR Validate");

  const { code_qr } = req.body;

  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const uuid = getUidByToken(req.headers.authtoken);

  const user = await User.findOne({ where: { uuid } });
  if (!user) {
    return responseMsg(res, 401, "fail", "Not user Found", {
      valid: false,
    });
  }

  const qrCode = await Qr.findOne({ where: { code_qr }})

  if(!qrCode){
    return responseMsg(res, 400, "fail", "Not valid Qr", {
        valid: false
    })
  }

  if(!isTimestampValid(qrCode.expiration_time)){
    return responseMsg(res, 400, "fail", "The Qr is valid, but is old", {
        valid: false
    })
  }

  return responseMsg(res, 200, 'success', 'ValidQr', {
        valid: true,
        uuid: qrCode.uuid
  })
};

module.exports = {
  validateQr,
};
