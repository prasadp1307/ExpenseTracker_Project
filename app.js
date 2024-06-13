const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const path = require('path');
const cors = require('cors');

// Routes Require
const sequelize = require('./database/db');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

// DataBase Tables
const User = require('./util/user');
const Expense = require('./models/expense');

// Using Package to read Request
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/user',userRoutes);

app.use('/',expenseRoutes)


app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views','login.html'));
});

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


    
