const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalExpense: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'userdata',
    timestamps: false
});

module.exports = Users;
