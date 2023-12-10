const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Shopcoins = sequelize.define("shopCoins", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uuid_client: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  uuid_employeer: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  id_payment_method: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_coupon: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_credit_card:{
    type: DataTypes.INTEGER,
    allowNull: true
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
