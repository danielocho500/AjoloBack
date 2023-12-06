const ReviewStall = require("../../models/Reviewstalls");

const createReview = async (idStall, uuidClient, description, points, imageUrl) => {

  const review = await ReviewStall.create({
    id_stall: idStall,
    uuid: uuidClient,
    description: description,
    points: points,
    image_url: imageUrl,
    enabled: true,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  });

  console.log(review);

  return review;
};

module.exports = {
  createReview,
};
