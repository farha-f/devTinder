const express = require('express');
const app = express();
const connectDb = require('./config/database');
const User = require('./models/user');
const validateSignUpData = require('./utils/validator');
const bcrypt = require('bcrypt');
app.use(express.json());
// adding the data 
app.post('/signup', async (req, res) => {
    
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
// filtering the data from postman via email
app.get('/user', async (req, res) => {
    const userEmail = req.body.email;
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).send("User not found");}
        if (user.length === 0) {
            return res.status(404).send("User not found");
        }
        else {
            res.send(user);
        }

    }
    catch (err) {
        res.status(500).send("Error signing up user" + err.message);
    }
});
// login  the user via postman
app.post('/login', async(req,res)=>{
    try{
        const {email, password}= req.body;
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            res.send("User logged in successfully");
        }
        else{
            throw new Error('Invalid credentials');
        }
    } catch(err){
        res.status(500).send('Error logging in user'+err)
    }
});
// fetching all the users in postman
app.get('/feed', async (req, res)=>{
    try {
        const users=await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(500).send("Error fetching users"+ err.message);
    }

})
//delete the user from database
app.delete('/del', async(req, res)=>{
    const _id=req.body._id;
    try{
        const deletedUser= await User.findByIdAndDelete({_id});
        res.send("User deleted successfully");
    }
    catch(err){
        res.status(500).send("Error deleting user"+ err.message);
    }
})

app.patch('/update', async(req, res)=>{
const _id=req.body._id;
const data=req.body;
const skill=req.body.skill;

try{
    const isAllowedToUpdate=['_id','firstName','lastName','age','photo','about','skill'];
    const keysToBeUpdated= Object.keys(data).every((key)=>{
    return isAllowedToUpdate.includes(key);
});
if(!keysToBeUpdated){
    throw new Error('Invalid updates!');
}
if(skill.length>5){
    throw new Error('skills should not exceed!');
}

    await User.findByIdAndUpdate({_id:_id}, data);
    res.send("user updated succesfully");
}
catch(err){
    res.status(500).send('Error updating user'+ err.message);
}
});
connectDb().then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
    .catch((err) => {
        console.log("Database connection failed", err);
    });


//const newUser = new User(userObj);
