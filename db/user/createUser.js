const { encryptString } = require("../../helpers/encrypt");
const { generateUID } = require("../../helpers/generateUuid");
const User = require("../../models/User");

const createUser = async (password, email, username, rol) => {
  const hashedPass = await encryptString(password);
  const uuid = await generateUID();

  console.log("asdsadsa");

  const user = await User.create({
    uuid: uuid,
    id_rol: rol,
    email: email,
    ps: hashedPass,
    user_name: username,
    coins: 0,
    image_url: "https://firebasestorage.googleapis.com/v0/b/ajoloferia-1080c.appspot.com/o/users%2FDefalut.jpg?alt=media&token=67c6fa50-af8e-4b97-8ece-fd12e03db420&_gl=1*1q702e*_ga*MTk5MzI2ODM4MS4xNjk2NjE3MTkx*_ga_CW55HF8NVT*MTY5OTIwOTkyNi43LjEuMTY5OTIxMDc3NC41Ny4wLjA.",
    language_configured: "undefined",
    enabled: 1,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  });

  console.log(user)

  return user;
};

module.exports = {
  createUser,
};
