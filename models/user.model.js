//const mongoose = require('mongoose');
const { Schema , model } = require('mongoose')
const userSchema = new Schema({
    fullname :{
        type: String,
        required :[true,"name is required"],
        minLength: [3, "name must be greater than 3 character"],
        maxLength :[30,"name must be less than 30 characters"],
        lowercase:true,
        trim:true
    },
    email : {
        type: String,
        required : [true,"email is required"],
        unique:true,
        lowercase:true,
        trim:true

    },
    password :{
        type: String,
        required :[true,"password is required"],
        minLength:[8, "password must be atleast 8 characters"],
        select:false
    },
    role:{
        type:String,
        enum:['USER', 'ADMIN'],
        default:'USER'
    },
    avatar: {
       public_id:{
        type:String
       },
       secure_url:{
         type:String
       }
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
},
    {
        timestamps:true
    }
);
const User = model(User, userSchema);
module.exports=User;