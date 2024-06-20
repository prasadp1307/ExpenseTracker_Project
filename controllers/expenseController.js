const Expense = require('../models/expense');
const User = require('../util/user');
const sequelize = require('../database/db');


function InvalidString(str){
    return str.length===0 || str === undefined;
}


exports.getExpenses = async (req, res, next) => {
    try {
        console.log("Fetching expenses for user ID:", req.user.id);
        const expenses = await Expense.findAll({ where: { userId: req.user.id } });
        console.log("Expenses found:", expenses);
        res.status(200).json(expenses);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};


exports.addExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        let { expenseamount, description, category } = req.body;
        expenseamount = String(expenseamount).trim();
        description = description.trim();
        category = category.trim();

        if (InvalidString(expenseamount) || InvalidString(description) || InvalidString(category)) {
            return res.status(400).json({ message: 'All fields are mandatory' });
        }
        console.log("Add Exp",expenseamount,description,category)
        const expense = await Expense.create({
            expenseamount,
            description,
            category,
            userId: req.user.id
        }, { transaction: t });

        // Update total expense for the user
        req.user.totalExpense += Number(expenseamount);
        await req.user.save({ transaction: t });

        await t.commit();
        res.status(201).json({ newExpense: expense });
    } catch (err) {
        await t.rollback();
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};



exports.deleteExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const expenseId = req.params.id;
        // const neweexpense = await Expenses.findByPk(expenseId, { transaction: t });
        const expense = await req.user.removeExpense(expenseId, { transaction: t });

        req.user.totalExpense -= expense.expenseamount;
        await req.user.save({ transaction: t });

        await t.commit();
        res.json('SUCCESS');
    }
    catch (err) {
        await t.rollback();
        console.log(err);
    }
};

