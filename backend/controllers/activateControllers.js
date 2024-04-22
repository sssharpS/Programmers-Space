const User=require('../models/user');

module.exports.activateUser=async(req,res)=>{
    
    const {img,name}=req.body;
    let user;
    try{
    user=await User.findOneAndUpdate(req.user._id,{avatar:img,name,isActivate:true},{new:true});
    // console.log(user);
    }catch(err){
        return res.staus(400).json({message:'Invalid Credentails'});
    }

  return res.json({user});

}