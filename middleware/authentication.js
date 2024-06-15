const jwt = require('jsonwebtoken');
const User = require('../util/user');
require('dotenv').config

exports.authenticate = async(req, res, next) => {
    try {
        const token = req.header('Authorization');
        console.log(token);
        const userDetails = jwt.verify(token, process.env.JWT_TOKEN_SECRETKEY);
        console.log(userDetails);
        const user = await Users.findByPk(userDetails.userID)
        req.user = user;
        console.log(req.user);
        next();
    }
    catch(err) {
        console.log(err);
    }
}