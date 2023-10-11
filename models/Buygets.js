const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Buygets = sequelize.define("buygets", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_offer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount_buyed: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  amount_getted: {
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

module.exports = Buygets;
