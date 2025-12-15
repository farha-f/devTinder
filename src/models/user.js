const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:30
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,
        max:100
    },
    gender:{
        type:String,
        validate(value){
            if(!['female','other','male'].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    },
    photo:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    about:{
        type:String,
        default:"hey there! I am using DevTinder"
    },
    skill:{
        type:[String],
    }
});
const User= mongoose.model('User',userSchema);
module.exports= User;