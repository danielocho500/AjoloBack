const Stalls = require("../../models/Stalls")
const UserStalls = require("../../models/Userstalls")

const getStallsInfo = async (user, query) => {

    const { id_rol, uuid } = user;

    const stalls = []
    if(id_rol == 4){
        const userstalls = await UserStalls.findAll({where: {uuid}})
        for (const us of userstalls) {
          const stall = await Stalls.findOne({where: { id: us.id_stall, enabled: { [Op.eq]: 1 } }});
          stalls.push(stall.dataValues)
        }
    }
    else{
      const stallsFound = await Stalls.findAll({where: {enabled: 1}});
      for(const sf of stallsFound){
        stalls.push(sf.dataValues)
      }
    }
    
    
    return stalls
};

module.exports = {
  getStallsInfo,
};
