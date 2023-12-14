const Events = require("../../models/Events");
const { Op } = require("sequelize");

const getEventsByDate = async (date) => {
  try {
    const events = await Events.findAll({
      where: {
        dateEvent: {
          [Op.gte]: date,
        },
      },
    });
    if (events) {
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
  getEventsByDate,
}