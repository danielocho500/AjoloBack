const User = require("../../models/User");

const updateCoins = async (
  uuid,
  coins,
) => {

  const user = await User.update(
    {
      coins: coins,
      updatedAt: new Date().getTime(),
    },
    {
      where: { uuid: uuid },
    }
  );

  return await User.findOne({ where: { uuid } });
};

module.exports = {
  updateCoins,
};
