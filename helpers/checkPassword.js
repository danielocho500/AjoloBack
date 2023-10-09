const bcrypt = require('bcrypt');

const checkPassword = async (pass, hash) => new Promise((res) => {
    bcrypt.compare(pass, hash, (err, result) => {
        res(result);
    });
});

module.exports = {
    checkPassword,
};