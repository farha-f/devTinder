const express = require('express');
const profileRouter = express.Router();
const userAuth = require('../middleware/auth');
const { validateEditProfileData } = require('../utils/validator');
/// pofile to get the cookie 

profileRouter.get('/profile/view',userAuth, async(req,res)=>{
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
profileRouter.patch('/profile/edit', userAuth, async(req, res)=>{
    try{ 
        if(!validateEditProfileData(req)){
            throw new Error ("Invalid edit fields");
        }
        
        const loggedInUser =req.user;
       
        Object.keys(req.body).forEach((key)=> (loggedInUser[key]=req.body[key]));
        await loggedInUser.save();
        //res.status(200).send("Profile edited successfully");
        res.json({
            message: `Profile of ${loggedInUser.firstName} edited successfully`,
            data: loggedInUser,
        })
    }
    catch(err){
        res.status(400).send("Error editing profile:"+ err.message);
    }
})

module.exports = profileRouter;