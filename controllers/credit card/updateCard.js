const { verifyConnection } = require("../../db/verifyConnection");
const { responseMsg } = require("../../helpers/responseMsg");
const { responseServerError } = require("../../helpers/responseServerError");
const { getUidByToken } = require("../../jwt/getUidByToken");
const User = require("../../models/User");
const Card = require("../../models/Creditcards")

const updateCard = async (req, res) => {
  console.log("Post update Card");

  const {card_number, card_holder, card_expiration_month, card_expiration_year, normalized_name} = req.body;

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
    return responseMsg(res, 401, "fail", "Not authorized to register a card", {
        valid: false,
      });
  }

  const card = await Card.findOne({ where: { uuid_client: uuid }})

  if(card){
    card.card_number = card_number;
    card.card_holder = card_holder;
    card.card_expiration_month = card_expiration_month;
    card.card_expiration_year = card_expiration_year;
    card.normalized_name = normalized_name;
    await card.save();
    return responseMsg(res, 200, 'success', 'Updated Card', {});
  }

  await Card.create({
    uuid_client: uuid,
    card_number,
    card_holder,
    card_expiration_month,
    card_expiration_year, 
    normalized_name,
    enabled: true,
  })

  return responseMsg(res, 200, 'success', 'Created Card', {})
};

module.exports = {
  updateCard,
};
