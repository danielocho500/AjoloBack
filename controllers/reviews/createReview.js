const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const Stall = require("../../models/Stalls")
const { createReview } = require("../../db/reviews/createReview");

const publishReview = async (req, res) => {
  console.log("Post review");

  const { idStall, description, points, imageUrl } = req.body;

  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const uuidClient = getUidByToken(req.headers.authtoken);

  const user = await User.findOne({ where: { uuid: uuidClient } });
  if (!user) {
    return responseMsg(res, 401, "fail", "Not user Found", {
      created: false,
    });
  }

  const stallExist = await Stall.findOne({ where: { id: idStall } })
  if (!stallExist) {
    return responseMsg(res, 401, "fail", "Not stall Found", {
      created: false,
    });
  }

  const review = await createReview(
    idStall,
    uuidClient,
    description,
    points,
    imageUrl
  );

  return responseMsg(res, 201, "Success", "Stall Created", {
    created: true,
    review
  });
};

module.exports = {
  publishReview,
};
