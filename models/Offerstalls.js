const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Offerstalls = sequelize.define("offerstalls", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_stall: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_ticket: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  enabled: {
    type: DataTypes.TINYINT(1),
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

module.exports = Offerstalls;
