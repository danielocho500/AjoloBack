const ReviewStall = require("../../models/Reviewstalls");

const deleteReview = async (id) => {
  const review = await ReviewStall.destroy(
    {
      where: { id: id },
    }
  );

  return review;
};

module.exports = {
  deleteReview,
};
