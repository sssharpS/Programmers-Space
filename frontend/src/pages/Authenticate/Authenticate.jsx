import React from 'react';
 import { useState } from 'react';
 import SetUpEmailPhone from '../steps/setupEmailPhone/SetUpEmailPhone';
 import SetUpOtp from '../steps/setupOtp/SetUpOtp';
//  import SetUpName from '../steps/setupName/SetUpName';




const Authenticate = () => {

    //do mapping which page to be shown during authentication
    const steps={
      1:SetUpEmailPhone,
      2:SetUpOtp,
      // 3:SetUpName
  };

  const nextStep=(e)=>{
      // e.preventDefault();
     setStep(step+1);
  }

 const [step,setStep]=useState(1);
 const Component=steps[step];

 
  return (
    <div>
      {<Component nextStep={nextStep}/>}
    </div>
  )
}

export default Authenticate;
