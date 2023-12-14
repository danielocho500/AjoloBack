const Shop = require("../../models/Shopcoins");

const getShoppings = async (id_client) => {
  console.log(id_client);
  try {
    const shoppings = await Shop.findAll({
      where: { uuid_client: id_client },
      order: [['createdAt', 'DESC']],

    });
    if (shoppings) {
      return shoppings;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getShoppings,
};
