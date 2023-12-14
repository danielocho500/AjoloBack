const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const Stalls = require("../../models/Stalls")

const getStall = async (req, res) => {
  console.log("GET Stall");

  let { idStall } = req.params;
  idStall = parseInt(idStall);

  if (isNaN(idStall) || !Number.isInteger(idStall) || idStall < 0) {
    return responseMsg(res, 400, 'Fail', "the idStall should be an integer", {});
  }
  
  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const stall = await Stalls.findOne({where: { id: idStall }})

  if(!stall){
    return responseMsg(res, 400, "Fail", "Not valid Stall id", {
      stall
    });
  }

  return responseMsg(res, 200, "Success", "Stall obtained", {
    stall
  });
};

module.exports = {
    getStall,
};
