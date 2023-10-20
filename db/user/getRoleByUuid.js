const User = require("../../models/User");
const {ROLES} = require("../../helpers/RolesEnum")

const getRoleByUuid = async (uuid) => {
    const user = await User.findOne({ where: { uuid } });

    if(user == null)
      return -1;

    let roleReturn = 0;
    
    switch(user.dataValues.id_rol){
      case 1:
        roleReturn = ROLES.CLIENT;
        break;
      case 2:
        roleReturn = ROLES.ADMIN;
        break;
      case 3:
        roleReturn = ROLES.EMPLOYEER;
        break;
      case 4:
        roleReturn = ROLES.STALLEMPLOYEER;
        break;
      default:
        roleReturn = -1;
    }

    return roleReturn;
  };

module.exports = {
  getRoleByUuid,
}