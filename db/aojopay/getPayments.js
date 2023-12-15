const Events = require("../../models/Events");
const { Op } = require("sequelize");
const Tickets = require("../../models/Tickets");

const getPayment = async (uuid) => {
  try {
    const tickets = await Tickets.findAll({ where: { uuid_client: uuid } });
    if (tickets) {
      return tickets;
    } else {
      return [];
    }
  } catch (error) {
    throw "error";
  }
};

module.exports = {
  getPayment,
};
