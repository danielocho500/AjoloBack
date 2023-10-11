const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Userstalls = sequelize.define("userstalls", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_stall: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  uuid: {
    type: DataTypes.VARCHAR(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Userstalls;
