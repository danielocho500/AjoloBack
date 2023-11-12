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
    image_url: "https://firebasestorage.googleapis.com/v0/b/ajoloferia-1080c.appspot.com/o/stalls%2FDefault.jpg?alt=media&token=2c61a089-d5ad-4441-bae9-d5c1ce7c607a&_gl=1*o7jy8p*_ga*MTk5MzI2ODM4MS4xNjk2NjE3MTkx*_ga_CW55HF8NVT*MTY5OTIwNTY2MS42LjEuMTY5OTIwODEwNC42MC4wLjA."
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
