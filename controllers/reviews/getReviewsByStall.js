
const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const { getReviewsByStall } = require("../../db/reviews/getReviewsByStall")
const User = require("../../models/User");

const getReviewsListByStall = async (req, res) => {
  console.log("GET Reviews");

  const { id } = req.params;

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

  const reviews = await getReviewsByStall(id);

  return responseMsg(res, 200, "Success", "Stalls obtained", reviews ? reviews : []);
};

module.exports = {
  getReviewsListByStall,
};
