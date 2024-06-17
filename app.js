// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Routes Require
const sequelize = require('./database/db');

const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const purchaseRoutes = require('./routes/purchaseRoues')


// DataBase Tables
const User = require('./util/user');
const Expense = require('./models/expense');
const Orders = require('./models/orders');

// Using Package to read Request
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({extended: false}));
const axios = require('axios');

// Routes
app.use('/user', userRoutes);
app.use('/expenses', expenseRoutes);
app.use('/purchase',purchaseRoutes)


app.use(express.static(path.join(__dirname, 'views')));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/',  (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send({ message: 'Internal Server Error' });
    next();
});

// Associations
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Orders);
Orders.belongsTo(User);

// Server & Database Start
sequelize.sync()
    .then(() => {
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    })
    .catch((err) => {
        console.error('Error syncing with the database', err);
    });
