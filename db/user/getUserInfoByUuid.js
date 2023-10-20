const User = require("../../models/User");

const getUserInfoByUuid = async (uuid) => {
    const user = await User.findOne({ where: { uuid } });
  
    console.log(user)

    return !user;
  };

module.exports = {
  getUserInfoByUuid,
}