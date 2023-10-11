const { encryptString } = require("../../helpers/encrypt");
const User = require("../../models/User");

const updateUser = async (
  uuid,
  email,
  password,
  username,
  coins,
  imageUrl,
  languageConfigured,
  enabled,
  rol
) => {
  const hashedPass = await encryptString(password);

  const user = await User.update(
    {
      email: email,
      ps: hashedPass,
      user_name: username,
      coins: coins,
      image_url: imageUrl,
      language_configured: languageConfigured,
      enabled: enabled,
      rol: rol,
      updatedAt: new Date().getTime(),
    },
    {
      where: { uuid: uuid },
    }
  );

  return await User.findOne({ where: { uuid } });
};

module.exports = {
  updateUser,
};
