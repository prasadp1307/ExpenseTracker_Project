const Users = require('../util/user'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


function InvalidString(str){
    return str.length===0 || str === undefined;
}

const generateToken=(id, name)=>{
    return jwt.sign({userId:id, name: name },process.env.JSW_TOKEN_SECRETKEY);
}



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
        console.error(`Error: ${error.message}`, error);
        res.status(500).send('Error submitting');
    }
};

// Controller for handling user login
const loginUser = async(req,res,next)=>{
    try{
        const email= req.body.email;
        const password = req.body.password;
        console.log(`with: ${email} ${password}`)
        if(InvalidString(email) || InvalidString(password)){
            return res.status(400).json({success:false,message:'All the fields are mandatory'})
        }
        const user =await Users.findAll({where:{email:email}});
        if(user.length>0){
          bcrypt.compare(password,user[0].password,(err,result)=>{
            if(err){
              res.status(500).json({success:false,message:"Something Went Wrong"});
            }
            if(result==true){
              res.status(201).json({success:true,message:"Successfully loggedIn", token:generateToken(user[0].id, user[0].name)})
            }else{
              res.status(401).json({success:false,message:"Password is incorrect"})
            }
          });
        }
        else{
            res.status(404).json({success:false,message:"User not found"})
        }
        
    }catch(err){
        res.status(500).json({message:err,success:false})
        console.log(err);
    }
}



module.exports = {
    signupUser,
    loginUser,
    generateToken
};

