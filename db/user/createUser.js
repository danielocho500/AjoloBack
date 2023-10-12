const { encryptString } = require("../../helpers/encrypt");
const { generateUID } = require("../../helpers/generateUuid");
const User = require("../../models/User");

const createUser = async (password, email, username, rol) => {
  const hashedPass = await encryptString(password);
  const uuid = await generateUID();

  const user = await User.create({
    uuid: uuid,
    id_rol: rol,
    email: email,
    ps: hashedPass,
    user_name: username,
    coins: 0,
    image_url: "undefined",
    language_configured: "undefined",
    enabled: 1,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  });

  return user;
};

module.exports = {
  createUser,
};
