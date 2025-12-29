const express = require('express');
const profileRouter = express.Router();
const userAuth = require('../middleware/auth');
/// pofile to get the cookie 

profileRouter.get('/profile',userAuth, async(req,res)=>{
    try{

    const user = req.user;
    if(!user){
        throw new Error('User not found');
    }
    res.send(user);
    } catch(err){
        res.status(500).send('Error fetching profile'+ err.message);
    }
   
});

module.exports = profileRouter;