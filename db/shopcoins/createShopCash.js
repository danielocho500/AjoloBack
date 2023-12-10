const Shop = require("../../models/Shopcoins");

const createShopCash = async (uuidClient, uuidEmployer, cost, idCoupon) => {
  const shopData ={
    uuid_client: uuidClient,
    uuid_employeer: uuidEmployer,
    id_payment_method: 2,
    cost: cost,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  };

  if (idCoupon) {
    shopData.id_coupon = idCoupon;
  }

  const shop = await Shop.create(shopData);

  return shop;
};

module.exports = {
  createShopCash,
};
