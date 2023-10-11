const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Qrcodes = sequelize.define("qrcodes", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.VARCHAR(100),
    allowNull: false,
  },
  code_qr: {
    type: DataTypes.VARCHAR(29),
    allowNull: false,
  },
  expiration_time: {
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

module.exports = Qrcodes;
