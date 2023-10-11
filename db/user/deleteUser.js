const { encryptString } = require("../../helpers/encrypt");
const User = require("../../models/User");

const deleteUser = async (uuid) => {
  const user = await User.update(
    {
      enabled: 0,
      updatedAt: new Date().getTime(),
    },
    {
      where: { uuid: uuid },
    }
  );

  return await User.findOne({ where: { uuid } });
};

module.exports = {
  deleteUser,
};
