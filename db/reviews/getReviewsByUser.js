const ReviewStall = require("../../models/Reviewstalls");
const Users = require("../../models/User");

const getReviewsByStall = async (uuid) => {
  try {
    const reviews = await ReviewStall.findAll({
      where: { uuid: uuid },
    });
    if (reviews) {
      const user = await Users.findOne({ uuid: uuid });
      reviews.forEach(async function (review) {
        review = { ...review, publisher: user }
      });
      return reviews;
    } else {
      return [];
    }
  }
  catch (error) {
    throw 'error';
  }
}


module.exports = {
  getReviewsByStall,
}