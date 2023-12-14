const Events = require("../../models/Events");

const deleteEvent = async (id) => {
  const event = await Events.destroy(
    {
      where: { id: id },
    }
  );

  return event;
};

module.exports = {
  deleteEvent,
};
