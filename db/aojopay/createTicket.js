const Tickets = require("../../models/Tickets");

const createTicket = async (uuid_client, uuid_employeer, cost) => {
  const ticket = await Tickets.create({
    uuid_client: uuid_client,
    uuid_employeer: uuid_employeer,
    cost: cost,
    type: 'Stall',
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  });

  console.log(ticket);

  return ticket;
};

module.exports = {
  createTicket,
};
