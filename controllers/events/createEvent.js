const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const Stall = require("../../models/Stalls")
const Userstalls = require("../../models/Userstalls");
const { createEvent } = require("../../db/events/createEvent");

const createEventService = async (req, res) => {
  console.log("Post event");

  const { uuid, name, cost, dateEvent, location } = req.body;

  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const uuidTk = getUidByToken(req.headers.authtoken);

  const user = await User.findOne({ where: { uuid: uuidTk } });
  if (!user) {
    return responseMsg(res, 401, "fail", "Not user Found", {
      created: false,
    });
  }

  if (user.id_rol != 2) {
    return responseMsg(res, 401, "fail", "Not authorized to create Stalls", {
      logged: false,
    });
  }

  const event = await createEvent(uuid, name, cost, dateEvent, location);

  return responseMsg(res, 201, "Success", "Stall Created", {
    created: true,
  });
};

module.exports = {
  createEventService,
};
