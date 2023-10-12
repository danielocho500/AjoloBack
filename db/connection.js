require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ajoloferia", "root", "mysql", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  ssl: true,
  port: "3306",
});

module.exports = {
  sequelize,
};
