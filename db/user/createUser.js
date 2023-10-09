const { encryptString } = require('../../helpers/encrypt');
const { generateUID } = require('../../helpers/generateUuid');
const User = require('../../models/User');

const createUser = async (password, email, username) => {
    const hashedPass = await encryptString(password);
    const uuid = await generateUID();

    const user = await User.create({
        uuid,
        email,
        ps: hashedPass,
        user_name: username,
        coins: 0,
        image_url: '',
        language_configured: '',
        enabled: 1
    });

    return user;
};

module.exports = {
    createUser,
};