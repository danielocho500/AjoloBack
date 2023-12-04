const Shop = require("../../models/Shopcoins");

const getShoppings = async (id_client) => {
  try {
    const shoppings = await Shop.findAll({
      where: { uuid_client: id_client },
    });
    if (shoppings) {
      return shoppings;
    } else {
      return [];
    }
  } catch (error) {
    throw "error";
  }
};

module.exports = {
  getShoppings,
};
