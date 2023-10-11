const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Shopcoins = sequelize.define("shopcoins", {
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
  id_payment_method: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_credit_card: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_coupon: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cost: {
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

module.exports = Shopcoins;
