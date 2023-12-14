const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const { deleteEvent } = require("../../db/events/deleteEvent");

const deleteEventService = async (req, res) => {
  console.log("Delete event");

  const { id } = req.params;

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

  if (user.id_rol != 1) {
    return responseMsg(res, 401, "fail", "Not authorized to create Stalls", {
      logged: false,
    });
  }

  const event = await deleteEvent(id);

  return responseMsg(res, 201, "Success", "Event deleted", {
    event,
  });
};

module.exports = {
  deleteEventService,
};
