const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const { deleteReview } = require("../../db/reviews/deleteReview");
const User = require("../../models/User");

const removeReview = async (req, res) => {
  console.log("Delete Review");

  const { id } = req.params;

  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const uuid = getUidByToken(req.headers.authtoken);

  const user = await User.findOne({ where: { uuid } });
  if (!user) {
    return responseMsg(res, 401, "fail", "Not user Found", {
      qrCode: false,
    });
  }

  const reviewDeleted = await deleteReview(id);

  return responseMsg(res, 200, 'success', 'Review deleted', reviewDeleted)
};

module.exports = {
  removeReview,
};
