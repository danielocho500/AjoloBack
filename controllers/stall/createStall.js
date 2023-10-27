const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const Stall = require("../../models/Stalls")
const Userstalls = require("../../models/Userstalls");

const createStall = async (req, res) => {
  console.log("Post Stall");

  const { id_stall_type, name, description, cost, minimun_height_cm, uuid_employeer } = req.body;
  
  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const uuid = getUidByToken(req.headers.authtoken);

  const user = await User.findOne({ where: { uuid } });
  if (!user) {
    return responseMsg(res, 401, "fail", "Not user Found", {
      created: false,
    });
  }

  if(user.id_rol != 2){
    return responseMsg(res, 401, "fail", "Not authorized to create Stalls", {
        logged: false,
      });
  }

  const stallExist = await Stall.findOne({where: { name }})
  if(stallExist){
    return responseMsg(res, 400, "fail", "The name of the Stall already Exist", {
      created: false,
    });
  }

  const employeer = await User.findOne({where: { uuid: uuid_employeer}})
  if (!employeer) {
    return responseMsg(res, 401, "fail", "Employeer Not Found", {
      created: false,
    });
  }

  if(employeer.id_rol != 4){
    return responseMsg(res, 401, "fail", "The uuid isn't of an employeer", {
      created: false,
    });
  }

  const stall = await Stall.create({
    id_stall_type,
    name,
    description,
    cost,
    minimun_height_cm,
    enabled: true,
    image_url: ""
  });

  await Userstalls.create({
    id_stall: stall.id,
    uuid: uuid_employeer,
    description: ""
  })

  return responseMsg(res, 201, "Success", "Stall Created", {
    created: true,
  });
};

module.exports = {
  createStall,
};
