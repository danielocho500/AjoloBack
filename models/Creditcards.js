const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Creditcards = sequelize.define("creditCards", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  uuid_client:{
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  card_number: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  card_holder: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  card_expiration_month: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  card_expiration_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  normalized_name: {
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

module.exports = Creditcards;
