const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Tickets = sequelize.define("tickets", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  uuid_client: {
    type: DataTypes.VARCHAR(100),
    allowNull: false,
  },
  uuid_employeer: {
    type: DataTypes.VARCHAR(100),
    allowNull: false,
  },
  cost: {
    type: DataTypes.INTEGER,
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

module.exports = Tickets;
