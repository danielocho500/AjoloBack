const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Reviewstalls = sequelize.define("reviewStalls", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
  },
  id_stall: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  uuid: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  points: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  enabled: {
    type: DataTypes.BOOLEAN,
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

module.exports = Reviewstalls;
