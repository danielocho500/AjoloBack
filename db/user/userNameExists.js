const User = require("../../models/User");

const userNameExists = async (user_name) => {
  const user = await User.findOne({ where: { user_name } });

  return !user;
};

const userNameExistsInUpdate = async (user_name, uuid) => {
  const user = await User.findOne({ where: { user_name } });
  if (user) {
    if (user.uuid !== uuid) {
      return true;
    }
  }
  return !user;
};

module.exports = {
  userNameExists,
  userNameExistsInUpdate,
};
