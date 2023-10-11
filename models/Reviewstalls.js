const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Reviewstalls = sequelize.define("reviewstalls", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_stall: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  uuid: {
    type: DataTypes.VARCHAR(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.VARCHAR(255),
    allowNull: false,
  },
  points: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.VARCHAR(255),
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

module.exports = Reviewstalls;
