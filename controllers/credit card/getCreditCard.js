const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const Card = require("../../models/Creditcards")

const getCard = async (req, res) => {
  console.log("Get Card");

  const isConnected = await verifyConnection();
  if (!isConnected) {
    return responseServerError(res);
  }

  const uuid = getUidByToken(req.headers.authtoken);

  const user = await User.findOne({ where: { uuid } });
  if (!user) {
    return responseMsg(res, 401, "fail", "Not user Found", {
      valid: false,
    });
  }

  if(user.id_rol != 1){
    return responseMsg(res, 401, "fail", "Not authorized to get a card", {
        valid: false,
      });
  }

  const card = await Card.findOne({ where: { uuid_client: uuid }})

  if(card){
    return responseMsg(res, 200, 'success', 'Card', {
        cardExist: true,
        card
    });
  }
  return responseMsg(res, 200, 'success', 'No credit Card registered', { cardExist: false })
};

module.exports = {
    getCard,
};
