const path=require('path');
const User=require('../models/user');

module.exports.activateUser=async(req,res)=>{
    
    let {img,name}=req.body;
     let rem='blob:http://localhost:3000/'
      if(img.startsWith(rem)){
         img=img.substring(rem.length);
      }
      img=`/assets/${img}`;
    let user;
    try{
    user=await User.findOneAndUpdate(req.user._id,{avatar:img,name,isActivate:true},{new:true});
    // console.log(user);
    }catch(err){
        return res.staus(400).json({message:'Invalid Credentails'});
    }

  return res.json({user});

}