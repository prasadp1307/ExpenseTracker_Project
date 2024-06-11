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

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ where: { email } });
        if (user && user.password === password) {
            res.send('Login Successful');
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during login');
    }
});

sequelize.sync()
.then((res)=>{
    app.listen(4000);
})
.catch((err)=>{
    console.log(err);
})


