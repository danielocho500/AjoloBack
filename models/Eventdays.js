const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Eventdays = sequelize.define("eventdays", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_stall: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  event_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  event_hour: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duration_minutes: {
    type: DataTypes.FLOAT,
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

module.exports = Eventdays;
