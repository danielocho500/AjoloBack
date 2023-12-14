
const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const Stalls = require("../../models/Stalls");
const Userstalls = require("../../models/Userstalls");

const deleteStall = async (req, res) => {
  console.log("Update Stalls");

  const { idStall } = req.params
  
  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }


  const stall = await Stalls.findOne({ where: {id: idStall}});
  if(!stall){
    return responseMsg(res, 401, "fail", "Stall Not Found", {
    });
  }

  stall.enabled = false;

  await stall.save()

  return responseMsg(res, 200, 'success', 'Stall deleted', {})
};

module.exports = {
    deleteStall,
};
