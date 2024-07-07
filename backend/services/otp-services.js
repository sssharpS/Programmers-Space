const crypto = require("crypto");
const nodemailer=require('nodemailer');
class OtpService{
  
    generateOtp(){
        //using crypto module(buil-in module of nodejs) we basically generate otp
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }
    sendOtpPhone(){

    }

    async sendOtpEmail(otp,email){
    // Create a nodemailer transporter using Mailtrap
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'angie11@ethereal.email',
            pass: 'NAqgPY5pM4aRWpGJ21'
        }
    });

    // Email content
    let mailOptions = {
        from: 'angie11@ethereal.email', // Dummy sender email
        to: email,
        subject: 'OTP for Verification',
        text: `Your OTP is: ${otp}. This OTP is valid for 2 minutes.`
    };

    // Send email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return ;
    } catch (error) {
        console.error('Error occurred:', error);
        throw new Error('Failed to send OTP. Please try again later.');
    }
}

}

module.exports=new OtpService();