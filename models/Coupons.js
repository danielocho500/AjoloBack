const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Coupons = sequelize.define("coupons", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_coupon_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  code_coupon: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  minimun_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  value_coupon: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expiration_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  uses_per_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_uses: {
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

module.exports = Coupons;
