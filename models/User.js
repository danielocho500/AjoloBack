const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const User = sequelize.define('user', {
    uuid: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    ps: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    user_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    coins: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    language_configured: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    enabled: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
    },
});

module.exports = User;