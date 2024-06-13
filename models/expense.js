const Sequelize = require('sequelize');
const sequelize = require('../database/db');


const Expense = sequelize.define('expense',
    {
        id:{
            type:Sequelize.INTEGER,
            unique:true,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        expenseamount:{
            type: Sequelize.INTEGER,
            allowNull:false
        },
        descr:{
            type: Sequelize.STRING,
            allowNull:false
        },
        category:{
            type: Sequelize.STRING,
            allowNull:false
        }
    }
);

module.exports = Expense;

