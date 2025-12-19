var validator = require('validator');

const validateSignUpData =(req)=>{
    const{ firstName, lastName, email, password}= req.body;
    if(!firstName || !lastName){
        throw new Error("First Name and Last Name are required");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not Valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong");
    }

}
module.exports= validateSignUpData;