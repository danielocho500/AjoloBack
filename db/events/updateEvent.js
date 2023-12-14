const Event = require("../../models/Events");

const updateEvent = async (
  id,
  uuid,
  name,
  cost,
  dateEvent,
  location,
  timeEvent
) => {
  const event = await Event.update(
    {
      uuid: uuid,
      name: name,
      cost: cost,
      dateEvent: dateEvent,
      location: location,
      timeEvent,
      updatedAt: new Date().getTime(),
    },
    {
      where: { id: id },
    }
  );

  return await Event.findOne({ where: { id } });
};

module.exports = {
  updateEvent,
};
