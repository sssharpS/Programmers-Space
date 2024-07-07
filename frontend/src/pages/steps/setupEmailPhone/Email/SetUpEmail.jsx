import React from 'react';
import { useState } from 'react';
import Card from '../../../../components/shared/card/Card';
import Button from '../../../../components/shared/button/Button';
import Styles from './SetUpEmail.module.css';
import { sendOtpViaEmail } from '../../../../http';
import { useDispatch } from 'react-redux';
import { setOtp } from '../../../../redux/authSlice';
import { toastifySuccessMessage,toastifyErrorMessage } from '../../../../toast';

const SetUpEmail = ({step,setStep,nextStep}) => {
  const logo = "/images/email.png";
  const title = "Enter your email id";
  const btnText='Next';

  const [email,setEmail]=useState('');
  const [showPopup,setShowPopup]=useState(false);
  const dispatch=useDispatch();

  const validateEmail = (email) => {
    //regex for validating the email format
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
 


  async function handleRequest(){
       if(!validateEmail(email)){
          setShowPopup(true);
          setEmail("");
          toastifyErrorMessage('Invalid Email');
          return ;
       }
         try{
           const {data}=await sendOtpViaEmail({email});
           console.log(data);
           dispatch(setOtp(data));
           toastifySuccessMessage('Otp has been sent successfully');
           nextStep(); 
         }catch(err){
           toastifyErrorMessage('Something went wrong');
          return ;
         }
    
  }

  return (
    <div>
      <Card image={logo} title={title}>
      <div className={Styles.imgWrapper}>
        <button className={`${Styles.btn} ${step===1?Styles.active:''}`} onClick={()=>setStep(1)}><img src='/images/phone_android.png' alt='Not loaded' className={Styles.img}/></button>
        <button className={`${Styles.btn} ${step===2?Styles.active:''}`} onClick={()=>setStep(2)}><img src='/images/Vector.png' alt='Not loaded'  className={Styles.img}/></button>
     </div>
        <div className={Styles.phn}>
          <input
            type="email"
            className={Styles.input}
            placeholder="xyz@gmail.com"
          value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
         {showPopup && <p style={{
            color:'red',
             marginLeft:'45px',
            marginTop:'10px',
          }}>
            Invalid Email
          </p>}
        <Button handleClick={handleRequest} text={btnText}/>
        <p className={Styles.Para}>
          By entering your email id, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </Card>
    </div>
  )
}

export default SetUpEmail;
