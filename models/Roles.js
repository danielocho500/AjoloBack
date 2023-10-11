const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Schedules = sequelize.define("schedules", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  normalized_name: {
    type: DataTypes.VARCHAR(100),
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

module.exports = Schedules;
