const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const validateSignUpData = require('../utils/validator');
const bcrypt = require('bcrypt');

// this API is for signup the user via postman(adding the data to the database)
authRouter.post('/signup', async (req, res) => {
    try {
        validateSignUpData(req);
    console.log(req.body);
    const {firstName, lastName, email, password}= req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
        firstName,
        lastName,
        email,
        password: passwordHash
    });
        await user.save();
        res.send("User signed up successfully");
    }
    catch (err) {
        res.status(500).send("Error :" + err.message);
    }

});
// login  the user via postman
authRouter.post('/login', async(req,res)=>{
    try{
        const {email, password}= req.body;
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){


            // create JWT token here
            //const token = await jwt.sign({_id: user._id}, 'DEV@7900TINDER',{expiresIn: '1h'});
            const token = await user.getJWT();
            console.log("Generated Token:", token);
            //  add token to cookie and send back to browser
            res.cookie('token', token);
            res.send("User logged in successfully");
        }
        else{
            throw new Error('Invalid credentials');
        }
    } catch(err){
        res.status(500).send('Error logging in user'+err)
    }
});
module.exports = authRouter;