const Reviewstalls = require("../../models/Reviewstalls");
const User = require("../../models/User");

const getReviewsByStall = async (idStall) => {
  const newList = [];
  try {
    const reviews = await Reviewstalls.findAll({
      where: { id_stall: idStall },
    });
    if (reviews) {
      for (const r of reviews) {
        const user = await User.findOne({ where: { uuid: r.uuid } });
        newList.push({
          id: r.id,
          id_stall: r.id_stall,
          description: r.description,
          points: r.points,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
          publisher: user
        });
      };
      return newList;
    } else {
      return [];
    }
  }
  catch (error) {
    throw error;
  }
}


module.exports = {
  getReviewsByStall,
}