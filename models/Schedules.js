const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Schedules = sequelize.define("schedules", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_stall: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_week_day: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
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
