const express = require('express');
const app = express();
const connectDb = require('./config/database');
const User = require('./models/user');
app.use(express.json());
app.post('/signup', async (req,res)=>{
    console.log(req.body);
    const user= new User(req.body);
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
