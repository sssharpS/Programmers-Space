const crypto = require("crypto");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

const User = require("../models/user");
const Token=require('../models/token');
const jwt = require("jsonwebtoken");


module.exports.sendOtp = (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ messge: "Enter Valid Phone Number" });
  }
  //server generates otp
  const otp = crypto.randomInt(1000, 9999);

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

  // for generating secret
  //    const secret=crypto.randomBytes(64).toString('hex');

  const tl = 1000 * 60 * 2; //2minute
  const expires = Date.now() + tl;
  const data = `${phone}.${otp}.${expires}`;

  const hash = crypto
    .createHmac("sha256", process.env.SECRET)
    .update(data)
    .digest("hex");

  return res.json({ hash: `${hash}.${expires}`, phone, otp });

  return res.send("done");
};

module.exports.verifyOtp = async (req, res) => {
  // console.log(req.body);
  const { otp, phone, hash } = req.body;
  if (!otp || !phone || !hash) {
    return res.status(400).json({ messgae: "Otp is Invalid" });
  }

  const [hashOtp, expires] = hash.split(".");

  if (Date.now() > +expires) {
    return res.status(500).json({ message: "Otp is Invalid" });
  }

  const data = `${phone}.${otp}.${expires}`;

  const hash1 = crypto
    .createHmac("sha256", process.env.SECRET)
    .update(data)
    .digest("hex");

  if (hashOtp != hash1) {
    return res.json({ message: "Otp is Invalid" });
  }

  //check if user already exists or not
  let user;
  try {
    user = await User.findOne({ phone });

    //server store the user in db
    if (!user) {
      user = new User({ phone, isActivate: false });
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

  return res.json({refresh_token,user});
};

module.exports.verifyToken=async(req,res)=>{
    let user;
    try{
    const {refreshToken}=req.cookies;
    const token=jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN_SECRET);
    if(!token){
       return res.status(401).json({message:'Invalid Credentials'})
    }
   
     user=await User.findOne({_id:token._id});

    }catch(err){
      return res.status(500).json({message:'Invalid Credentials'});
    }

    return res.json({user});

}


module.exports.logOut=async(req,res)=>{
  
  const {refreshToken}=req.cookies;
   res.clearCookie('refreshToken');
   return res.json({user:null,isAuth:false});
}