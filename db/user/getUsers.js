const User = require("../../models/User");

const getUsers = async (id_rol) => {
  try{

    const users = await User.findAll({
      where: { id_rol },
    });
    if (users) {
      return users;
    } else {
      return [];
    }
  }
  catch (error) {
    throw 'error';
  }
}


module.exports = {
  getUsers,
}