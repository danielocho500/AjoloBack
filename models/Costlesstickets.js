const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Costlesstickets = sequelize.define("costlesstickets", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_offer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cost_per_person: {
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

module.exports = Costlesstickets;
