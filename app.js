const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();

const sequelize = require('./database/db');
const Users = require('./util/user')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signUp.html'));
});

app.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await Users.create({ name, email, password });
        res.send('Form submitted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error submitting form');
    }
});

sequelize.sync()
.then((res)=>{
    app.listen(4000);
})
.catch((err)=>{
    console.log(err);
})


