const Shop = require("../../models/Shopcoins");

const createShopCard = async (uuid, cost, idCard, idCoupon,) => {

    const shopData = {
        uuid_client: uuid,
        id_payment_method: 1,
        cost: cost,
        id_credit_card: idCard,
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
  createShopCard,
};
