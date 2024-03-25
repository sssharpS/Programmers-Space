import React from 'react';
import { useState } from 'react';
import Card from '../../../../components/shared/card/Card';
import Button from '../../../../components/shared/button/Button';
import Styles from './SetUpEmail.module.css';

const SetUpEmail = ({step,setStep,nextStep}) => {
  const logo = "/images/email.png";
  const title = "Enter your email id";
  const btnText='Next';

  const [email,setEmail]=useState('');


  function handleRequest(){
         
      
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
            type="text"
            className={Styles.input}
            placeholder="xyz@gmail.com"
          value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>

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
