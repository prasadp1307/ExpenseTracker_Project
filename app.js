const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signUp.html'));
});

app.post('/', (req, res) => {
    res.send('Form submitted successfully');
});

app.listen(4000, () => {
    console.log("Server running successfully on port 4000");
});
