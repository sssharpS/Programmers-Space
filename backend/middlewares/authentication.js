const jwt=require('jsonwebtoken');
const User=require('../models/user');
module.exports.auth=async(req,res,next)=>{
   
    const {refreshToken}=req.cookies;
      const token=jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN_SECRET);
      if(!token){
        return res.status(401).json({message:'Invalid Token'});
      }
    const user=await User.findOne({_id:token._id});     
    if(!user){
        return res.status(401).json({message:'Invalid Credentials'});
    }

   req.user=user;
   next();
}