const path = require("path");
const User = require("../models/user");
const Jimp=require('jimp');

module.exports.activateUser = async (req, res) => {
  let { img, name } = req.body;
  if (!img || !name) {
    return res.status(401).json({ message: "fields are empty" });
  }

 

  // base64 image string so convert this into the buffer
  const image=img.replace(/data:image\/\w+;base64,/, '');

  const buffer = Buffer.from(
    image,
    "base64"
  );
 

  const imagePath=`${Date.now()}-${Math.round(
    Math.random()*1e9
  )}.png`;


  // for resizing the image which we basically store on the server side we basically use Jimp package we basically use this image  as an avatar on the frontend so we basically store this image on the server according to that ratio
   try{

    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Invalid buffer provided');
    }

  const jimpResp=await Jimp.read(buffer);
  // console.log(jimResp);
   await jimpResp.resize(150,Jimp.AUTO)
  .writeAsync(path.resolve(__dirname,`../assets/${imagePath}`));

   }catch(err){
    console.log(err);
    return  res.status(500).json({message:'could not process the image'});
   }



  let user;
  try {
    user = await User.findOneAndUpdate(
      req.user._id,
      { avatar:`${process.env.BASE_ADDRESS}/assets/${imagePath}`, name, isActivate: true },
      { new: true }
    );
    //  console.log(user);
  } catch (err) {
   return res.staus(400).json({ message: "Invalid Credentails" });
  }

  return res.json({ user });
};
