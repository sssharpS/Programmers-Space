const crypto=require('crypto');
class hashService{
   
    generateHash(otp,phone){
         // for generating secret
       //    const secret=crypto.randomBytes(64).toString('hex');
        const tl = 1000 * 60 * 2; //2minute
        const expires = Date.now() + tl;
        const data = `${phone}.${otp}.${expires}`;
      
        //using createHmac algo of crypto
        const hash = crypto
          .createHmac("sha256", process.env.SECRET)
          .update(data)
          .digest("hex");
        return {hash,expires};
    }


    verifyHash(data,hashOtp){
      const hash1 = crypto
      .createHmac("sha256", process.env.SECRET)
      .update(data)
      .digest("hex");
  
    if (hashOtp != hash1) {
      return false;
    }
    return true;
  
    }
}

module.exports=new hashService();
