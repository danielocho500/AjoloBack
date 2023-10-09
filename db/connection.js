require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    ssl: true,
    port: process.env.DB_PORT,
},
);

module.exports = {
    sequelize
};