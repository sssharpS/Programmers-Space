import React from "react";
import Card from "../../../../components/shared/card/Card";
import Button from "../../../../components/shared/button/Button";
import Styles from "./SetUpPhone.module.css";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import { sendOtp } from "../../../../http/index";
import {setOtp} from '../../../../redux/authSlice'; 

const SetUpPhone = ({step,setStep,nextStep}) => {
  const logo = "/images/phone.png";
  const title = "Enter your phone number";
  const btnText='Next';
 
const dispatch=useDispatch();
  const [phone,setPhone]=useState('');


  async function handleRequest(){
         if(!phone){
          return ;
         }
        const {data}=await sendOtp({phone});
         console.log(data);
         dispatch(setOtp(data));
         nextStep();
      
  }

  return (
    <div>
      <Card image={logo} title={title}>
      <div className={Styles.imgWrapper}>
        <button className={`${Styles.btn} ${step===1?Styles.active:''}`} onClick={()=>setStep(1)} ><img src='/images/phone_android.png' alt='Not loaded' className={Styles.img}/></button>
        <button className={`${Styles.btn} ${step===2?Styles.active:''}`} onClick={()=>setStep(2)} ><img src='/images/Vector.png' alt='Not loaded' className={Styles.img}/></button>
     </div>
        <div className={Styles.phn}>
          <img
            src="/images/Emoji.png"
            alt="Not Loaded"
            className={Styles.imgStyle}
          />
          <input
            type="text"
            className={Styles.input}
            placeholder="+91 9123344555"
          value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        </div>

        <Button handleClick={handleRequest} text={btnText}/>
        <p className={Styles.Para}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </Card>
    </div>
  );
};

export default SetUpPhone;
