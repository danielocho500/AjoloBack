
const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const { getStallsInfo } = require("../../db/stall/getStalls")
const User = require("../../models/User");
const Stalls = require("../../models/Stalls");
const Userstalls = require("../../models/Userstalls");

const updateStalls = async (req, res) => {
  console.log("Update Stalls");

  const { name, description, cost, uuid_employeer, minimun_height_cm } = req.body;
  const { idStall } = req.params
  
  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const uuid = getUidByToken(req.headers.authtoken);

  const user = await User.findOne({ where: { uuid } });
  if (!user) {
    return responseMsg(res, 401, "fail", "Not user Found", {
    });
  }

  const stall = await Stalls.findOne({ where: {id: idStall}});
  if(!stall){
    return responseMsg(res, 401, "fail", "Stall Not Found", {
    });
  }

  if(name)
    stall.name = name;

  if(description)
    stall.description = description;

  if(cost)
    stall.cost = cost;

  if(uuid_employeer){
    const employeer_new = await User.findOne({ where: {uuid: uuid_employeer}})
    if(!employeer_new){
        return responseMsg(res, 401, "fail", "Employeer Not Found", {
        });
    }
    else{
        const userStall = await Userstalls.findOne({ where: { id_stall: stall.id }})
        userStall.uuid = uuid_employeer
        await userStall.save();
    }
  }
    
  if(minimun_height_cm){
    stall.minimun_height_cm = minimun_height_cm;
  }

  await stall.save()

  return responseMsg(res, 200, 'success', 'Stall updated', {
    stall
  })
};

module.exports = {
    updateStalls,
};
