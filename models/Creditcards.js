const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Creditcards = sequelize.define("creditcards", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  card_number: {
    type: DataTypes.VARCHAR(20),
    allowNull: false,
  },
  card_holder: {
    type: DataTypes.VARCHAR(100),
    allowNull: false,
  },
  card_expiration_month: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  card_expiration_year: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  normalized_name: {
    type: DataTypes.VARCHAR(100),
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

module.exports = Creditcards;
