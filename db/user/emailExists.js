const User = require('../../models/User');

const emailExists = async (email) => {
    const user = await User.findOne({ where: { email } });

    return !(user);
};

module.exports = {
    emailExists,
};