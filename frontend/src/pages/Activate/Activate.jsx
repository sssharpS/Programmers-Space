import React from 'react';
import { useState } from 'react';
import SetUpName from '../steps/setupName/SetUpName';
import SetAvatar from '../steps/setAvatar/SetAvatar';
// import SetUsername from '../steps/setUsername/SetUsername';
import Loading from '../steps/activationProgress/Loading';

const Activate = () => {

//Activation will take multiple Steps so we have to map all theses steps

const steps={
    1:SetUpName,
    2:SetAvatar,
    3:Loading,
    // 3:SetUsername,
    // 4:Progress

}

const handleClick=()=>{
    setStep(step+1);
}

const [step,setStep]=useState(1);

const Component=steps[step];

  return (
    <> 
      {<Component handleClick={handleClick}/>}
    </>
  )
}

export default Activate;
