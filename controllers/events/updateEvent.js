const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const { updateEvent } = require("../../db/events/updateEvent");

const updateEventService = async (req, res) => {
  console.log("Put event");

  const { id, name, cost, dateEvent, location } = req.body;

  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const uuid = getUidByToken(req.headers.authtoken);

  const user = await User.findOne({ where: { uuid: uuid } });
  if (!user) {
    return responseMsg(res, 401, "fail", "Not user Found", {
      created: false,
    });
  }

  if (user.id_rol == 1) {
    return responseMsg(res, 401, "fail", "Not authorized to create Stalls", {
      logged: false,
    });
  }

  const event = await updateEvent(id, uuid, name, cost, dateEvent, location);

  return responseMsg(res, 201, "Success", "Event updated", {
    event,
  });
};

module.exports = {
  updateEventService,
};
