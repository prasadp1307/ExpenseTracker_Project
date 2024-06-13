const Users = require('../util/user'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Controller for user Registration
const signupUser = async (req, res) => {
    try {
        const name = req.body.name.trim();
        const email = req.body.email.trim();
        const password = req.body.password;
        console.log(`Sign up with: ${name} ${email} ${password}`);

        if (InvalidString(name) || InvalidString(email) || InvalidString(password)) {
            return res.status(400).json({ err: 'All fields are mandatory' });
        }

        const user = await Users.findAll({ where: { email: email } });
        if (user.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    throw err;
                }
                await Users.create({
                    name: name,
                    email: email,
                    password: hash
                });
                res.status(201).json({ message: "Successfully created a new user" });
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error submitting');
    }
};

// Controller for handling user login
const loginUser = async (req, res) => {
    try {
        const email = req.body.email.trim();
        const password = req.body.password; 
        console.log(`Login with: ${email} ${password}`);

        if (InvalidString(email) || InvalidString(password)) {
            return res.status(400).json({ success: false, message: 'All fields are mandatory' });
        }

        const user = await Users.findOne({ where: { email: email } });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    res.status(500).json({ success: false, message: "Something went wrong" });
                } else if (result) {
                    res.status(201).json({
                        success: true,
                        message: "Successfully logged in",
                        // token: generateToken(user.id, user.name, user.isPremiumUser)
                    });
                } else {
                    console.warn('Password mismatch');
                    res.status(401).json({ success: false, message: "Password is incorrect" });
                }
            });
        } else {
            console.warn('User not found');
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: err, success: false });
    }
};

function InvalidString(str) {
    return !str || str.trim().length === 0;
}

function generateToken(userId, userName, isPremiumUser) {
    return jwt.sign({ userId, userName, isPremiumUser }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
}

function InvalidString(str) {
    return !str || str.trim().length === 0;
}

// Token generation using JWT
function generateToken(userId, userName, isPremiumUser) {
    return jwt.sign({ userId, userName, isPremiumUser }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
}

module.exports = {
    signupUser,
    loginUser,
    generateToken
};
