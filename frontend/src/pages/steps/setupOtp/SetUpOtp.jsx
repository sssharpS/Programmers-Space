import React from 'react';
import Card from '../../../components/shared/card/Card';
import Button from '../../../components/shared/button/Button';
import styles from './SetUpOtp.module.css';
import { useState } from 'react';
import { verifyOtp } from '../../../http/index';
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { setAuth } from '../../../redux/authSlice';

const SetUpOtp = ({nextStep}) => {
  const image='/images/otp.png';
  const title="Enter the code we just texted you"
   const btnText='Next'


   const {phone,hash}=useSelector((state)=>state.authSlice.otp);

   const [otp,setOtp]=useState('');
   const navigate=useNavigate();
   const dispatch=useDispatch();


   const handleSubmit=async()=>{

    if(!otp || !phone || !hash){
      return ;
    }
    try{
     const {data}=await verifyOtp({otp,phone,hash});
     console.log(data);
     if(data){
         dispatch(setAuth(data));
     } 
    navigate('/activate');
    }catch(err){
      return ;
    }

   }



  return (
    <div>
       <Card image={image} title={title}>

        <div className={styles.otp}>
            <input type='text' className={styles.input} onChange={(e)=>setOtp(e.target.value)} value={otp}/>
            <input type='text'className={styles.input}/>
            <input type='text' className={styles.input}/>
            <input type='text' className={styles.input}/>
        </div>
        <p className={styles.para}>Didn’t receive? Tap to resend</p>
        
        <Button handleClick={handleSubmit} text={btnText}/>

       




       </Card>
    </div>
  )
}

export default SetUpOtp;
