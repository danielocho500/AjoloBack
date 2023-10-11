const User = require("../../models/User");

const emailExists = async (email) => {
  const user = await User.findOne({ where: { email } });

  return !user;
};

const emailExistsInUpdate = async (email, uuid) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    if (user.uuid !== uuid) {
      return true;
    }
  }
  return !user;
};

module.exports = {
  emailExists,
  emailExistsInUpdate,
};
