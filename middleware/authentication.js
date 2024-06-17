const jwt = require('jsonwebtoken');
const User = require('../util/user');
require('dotenv').config();

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    // console.log("Token------->>>>",token);
    const userDetails = jwt.verify(token, process.env.JSW_TOKEN_SECRETKEY);
    // console.log(userDetails.userId);
   
    const user = await User.findByPk(userDetails.userId);
    req.user = user;
    if(!user){
      return res.status(401).json({ message: 'User not found' });
    }
    console.log("Authenticated User:", req.user);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};
