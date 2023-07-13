import AppError from "../utils/appError";
import User from "../models/user.model";

const cookieOptions = {
    secure: true,
    maxAge: 7*24*60*60*1000 , //7days
    httpOnly : true
}
//////////////////REGISTRATION/////////////////////////////////////////////
const registerUser =  async(req,res) =>{
   const {fullName, email,password} =req.body;
   if(!fullName || !email || !password){
        return next(new AppError("All fields are required" ,400));
   } 
   const userExists = await User.findOne({email})
   if(userExists){
    return next(new AppError("Email already exists" ,400));
   }
   const user =  await User.create({
     fullName,
     email,
     password,
     avatar:{
        public_id: email,
        //secure_url:
     }
   });
   if(!user){
    return next(new AppError('User registration failed, please try again ' ,400));
   }
   //TODO: upload user picture
   await user.save();

// TODO set jwt token in cookie

   user.password=undefined;
   res.status(200).json({
     success:   true,
     message:  "user registered successfully",
     user
   })
}
/////////////////////////////LOGIN//////////////////////////////////////////////
const loginUser = async (req,res) =>{
  const {email , password}= req.body;
  if( !email || !password){
    return next(new AppError("All fields are required" ,400));
  }
  const user = await User.findOne({email})
  .select('+password');
  if(!user || user.comparePassword(password)){  //TODO
    return next(new AppError('Email or Password do not match',400))
  }
  const  token = await user.generateJWTToken();
  user.password = undefined;
  res.cookie('token' , token , cookieOptions );
  res.status(200).json({
    success:   true,
    message:  "user registered successfully",
    user
  });
} 
//////////////////////////LOGOUT////////////////////////////////////////
const  logoutUser = (req,res) =>{
    res.cookie( 'token' ,null , {
    secure:true,
    maxAge:0,
    httpOnly:true
  })
  res.status(200).json({
    success:true,
    message:'user logged out successfully!'
  })
}
const getProfile = async (req,res) =>{
    const userID = User.findByID(req.user.id);
    res.status(200).json({
         success:true,
         message: 'User details',
         user
    })
}

exports = {
    registerUser,
    loginUser,
    logoutUser,
    getProfile
}