const { sequelize } = require('./connection');

const verifyConnection = async () => {
    try {
        await sequelize.authenticate();
        return true;
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
      }
};

module.exports = {
    verifyConnection,
};