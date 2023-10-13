const jwt = require('jsonwebtoken');

const getUidByToken = (token) => jwt.decode(token).uid;

module.exports = {
    getUidByToken,
};