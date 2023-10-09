const { v4: uuidv4 } = require('uuid');

const generateUID = () => {
    const uuid = uuidv4();
    return uuid;
};

module.exports = {
    generateUID,
};