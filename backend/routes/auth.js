const express = require('express');
const router=express.Router();
const authController=require('../controllers/authControllers');



//create endpoints - request for server generating otp
router.post('/api/send-otp',authController.sendOtp);

router.post('/api/verify-otp',authController.verifyOtp);



module.exports=router;