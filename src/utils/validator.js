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
const validateEditProfileData =(req)=>{
    const allowedEditFields=['firstName', 'lastName', 'email','age', 'photo', 'about', 'skill', 'gender'];
    const isEditAllowed = Object.keys(req.body).every((field)=> allowedEditFields.includes(field));
    return isEditAllowed;
}
module.exports= {validateSignUpData, validateEditProfileData};