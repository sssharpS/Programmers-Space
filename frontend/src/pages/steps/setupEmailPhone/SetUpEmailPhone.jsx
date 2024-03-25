import React from 'react';
import { useState } from 'react';
import SetUpPhone from './Phone/SetUpPhone';
import SetUpEmail from './Email/SetUpEmail';

const SetUpEmailPhone = (props) => {
  // mapping which page to be shown Email or Phone By default It is shown Phone Page
  const steps={
    1:SetUpPhone,
    2:SetUpEmail
  }

  
 
  const [step,setStep]=useState(1);
   const Component=steps[step];

 
  return (
    <div>
      {<Component nextStep={props.nextStep} step={step} setStep={setStep}/>}
    </div>
  )
}

export default SetUpEmailPhone;
