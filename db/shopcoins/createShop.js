const { encryptString } = require("../../helpers/encrypt");
const { generateUID } = require("../../helpers/generateUuid");
const Shop = require("../../models/Shopcoins");

const createShop = async (uuidClient, uuidEmployer, idCoupon, cost) => {
  const uuid = await generateUID();

  const shop = await Shop.create({
    uuid_client: uuidClient,
    uuid_employeer: uuidEmployer,
    id_payment_method: 1,
    id_coupon: idCoupon,
    cost: cost,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  });

  console.log(shop);

  return shop;
};

module.exports = {
  createShop,
};
