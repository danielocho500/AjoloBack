const Events = require("../../models/Events");
const { Op } = require("sequelize");
const Tickets = require("../../models/Tickets");

const getPayment = async () => {
  try {
    const tickets = await Tickets.findAll();
    if (tickets) {
      return events;
    } else {
      return [];
    }
  }
  catch (error) {
    throw 'error';
  }
}


module.exports = {
  getPayment,
}