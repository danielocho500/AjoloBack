const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Qrcodes = sequelize.define("qrCodes", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  uuid: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  code_qr: {
    type: DataTypes.STRING(29),
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
