const express = require('express');
const app = express();
const connectDb = require('./config/database');
const User = require('./models/user');
app.post('/signup', async (req,res)=>{
    const user= new User({
        firstName:"John",
        lastName:"Doe",
        email:"xyz@gmail.com",
        password:"abcd1234",
        age:25,
        gender:"male"
    });
    try{
await user.save();
    res.send("User signed up successfully");
    }
    catch(err){
        res.status(500).send("Error signing up user" + err.message);
    }
    
});
connectDb().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
})
.catch((err)=>{
    console.log("Database connection failed", err);
});


//const newUser = new User(userObj);
