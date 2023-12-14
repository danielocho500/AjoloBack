const Events = require("../../models/Events");

const createEvent = async (uuid, name, cost, dateEvent, location, timeEvent) => {

  const event = await Events.create({
    uuid: uuid,
    name: name,
    cost: cost,
    dateEvent: dateEvent,
    location: location,
    timeEvent,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  });

  console.log(event);

  return event;
};

module.exports = {
  createEvent,
};
