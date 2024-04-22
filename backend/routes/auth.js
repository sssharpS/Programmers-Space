const express = require('express');
const router=express.Router();
const authController=require('../controllers/authControllers');
const authentication=require('../middlewares/authentication');
const activateController=require('../controllers/activateControllers');



//create endpoints - request for server generating otp
router.post('/api/send-otp',authController.sendOtp);

router.post('/api/verify-otp',authController.verifyOtp);

router.post('/api/activate-user',authentication.auth,activateController.activateUser);

router.get('/api/verify-token',authController.verifyToken);
router.post('/api/logout',authentication.auth,authController.logOut);


module.exports=router;