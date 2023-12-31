//const mongoose = require('mongoose');
import { Schema ,model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    fullName :{
        type: String,
        required :[true,"name is required"],
        minLength: [3, "name must be at least 3 character"],
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
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
},
    {
        timestamps:true
    }
);
userSchema.pre('save', async function(){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10)
})
userSchema.methods = {
    comparePassword : async function(plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password);
    },
    generateJWTToken : function(){
        return jwt.sign(
            { id : this_id , role: this.role , email: this.email, subscription: this.subscription},
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        );
    }
}
const User = model(User, userSchema);
export default User;