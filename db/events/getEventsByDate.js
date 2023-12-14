const Events = require("../../models/Events");

const getEventsByDate = async (date) => {
  try {
    const events = await Events.findAll({
      where: { dateEvent: date },
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