const crypto=require('crypto');
const tokenService = require("../services/token-services");
const OtpService = require("../services/otp-services");
const hashService = require("../services/hash-services");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

const User = require("../models/user");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const otpServices = require("../services/otp-services");

module.exports.sendOtp = (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ messge: "Enter Valid Phone Number" });
  }

  //server generates otp
  const otp = otpServices.generateOtp();

  //send this otp to phone for this use a third party service twillo
  //    twilio.messages.create({
  //     body:`Your OTP Number is ${otp}`,
  //     from:process.env.PHONE_NUMBER,
  //     to:'+918979662929'

  //    }).then(mess=>{
  //       console.log(mess);
  //    }).catch(err=>{
  //         return res.json({message:'something went wrong '});
  //    })

  //now server takes this otp and hash this using any alogorithm
  const { hash, expires } = hashService.generateHash(otp, phone);
  return res.json({ hash: `${hash}.${expires}`, phone, otp });
};

module.exports.sendOtpViaEmail = async (req, res) => {
  const { email } = req.body;

  //generate otp
  const otp = OtpService.generateOtp();

  //send the otp to the user
  try {
    await OtpService.sendOtpEmail(otp, email);
  } catch (err) {
    return res.json({ message: "try again" });
  }

   //generate hash
         const{hash,expires}= hashService.generateHash(otp,email);
         return res.json({hash:`${hash}.${expires}`,email,otp});
};

module.exports.verifyOtp = async (req, res) => {
  // console.log(req.body);
  const { otp, phone, hash,email} = req.body;

  if (!otp  || !hash || (!phone && !email)) {
    return res.status(400).json({ messgae: "Otp is Invalid" });
  }

  const [hashOtp, expires] = hash.split(".");

  if (Date.now() > +expires) {
    return res.status(500).json({ message: "Otp is Invalid" });
  }
  
    let data;
   if(phone){
       data = `${phone}.${otp}.${expires}`;
   }
  
   if(email){
      data=`${email}.${otp}.${expires}`;
   }

  if(!hashService.verifyHash(data,hashOtp)){
     return res.status(401).json({message:'Invalid Otp'});
  }
  //check if user already exists or not
  let user;
  try {
    if(phone){
    user = await User.findOne({ phone });
    }

    if(email){
      user=await User.findOne({email});
    }

    //server store the user in db
    if (!user) {
      if(phone){
      user = new User({ phone, isActivate: false });
      }
      if(email){
        user=new User({email,isActivate:false});
      }
      await user.save();
      //   console.log(user);
    }
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }

  // for authentication use jwt
  // generate token

  // const access_token = jwt.sign(
  //   { _id: user._id, isActivate: false },
  //   process.env.JWT_ACCESS_TOKEN_SECRET,
  //   { expiresIn: "1h" }
  // );

  const refresh_token = jwt.sign(
    { _id: user._id, isActivate: false },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: "4h" }
  );

  // we basically store refresh token in the db just because of escaping from accesing  attack and if access token expires in that we can refresh it from the server

  // const token= await new Token({
  //    token:refresh_token,
  //     user:user._id

  // }).save();

  res.cookie("refreshToken", refresh_token, {
    maxAge: 1000 * 60 * 60 * 4,
    httpOnly: true,
  });

  // res.cookie("accessToken",access_token,{
  //  maxAge:1000*60*60,
  //  httpOnly:true
  // });

  return res.json({ refresh_token, user });
};

module.exports.verifyToken = async (req, res) => {
  let user;
  try {
    const { refreshToken } = req.cookies;
    const token = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );
    if (!token) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    user = await User.findOne({ _id: token._id });
  } catch (err) {
    return res.status(500).json({ message: "Invalid Credentials" });
  }

  return res.json({ user });
};

module.exports.logOut = async (req, res) => {
  const { refreshToken } = req.cookies;
  res.clearCookie("refreshToken");
  return res.json({ user: null, isAuth: false });
};


module.exports.deleteAcc=async(req,res)=>{ 

    try{
       const user=await User.findOneAndDelete({_id:req.user._id});
        if(!user){
         return res.status(400).json({message:'Something Wrong'});
        }
        res.clearCookie();
        return res.json({message:'Account Deleted',user:null});

    }catch(err){
        return res.status(500).json({message:'something went wrong'});
    }
}
