const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Tickets = sequelize.define("tickets", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
  },
  uuid_client: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  uuid_employeer: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
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

module.exports = Tickets;
