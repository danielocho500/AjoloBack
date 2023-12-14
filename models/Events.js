const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Events = sequelize.define("events", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  cost: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  dateEvent: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(255),
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

module.exports = Events;
