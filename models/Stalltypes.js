const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Stalltypes = sequelize.define("stalltypes", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  normalized_name: {
    type: DataTypes.VARCHAR(100),
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

module.exports = Stalltypes;
