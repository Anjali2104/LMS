const registerUser =  async(req,res) =>{
   const {fullname, email,password} =req.body;
   if(!fullname || !email || !password){

   }
}
const loginUser = (req,res) =>{

}
const  logoutUser = (req,res) =>{

}
const getUser = (req,res) =>{

}
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser
}