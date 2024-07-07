import React from "react";
import Card from "../../../../components/shared/card/Card";
import Button from "../../../../components/shared/button/Button";
import Styles from "./SetUpPhone.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../../../http/index";
import { setOtp } from "../../../../redux/authSlice";
import InputMask from "react-input-mask";
import {toast} from 'react-hot-toast'

const SetUpPhone = ({ step, setStep, nextStep }) => {
  const logo = "/images/phone.png";
  const title = "Enter your phone number";
  const btnText = "Next";

  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [errorShow,setErrorShow]=useState(false);

  async function handleRequest() {
    // replace non numeric characters
    let phoneNumber=phone.replace(/\D/g,'');
    // console.log(phoneNumber)
    if(phoneNumber.length!==10){
      toast.error('Invalid Phone Number',{
        position:'bottom-center',
      })
      setErrorShow(!errorShow);
      setPhone("");
      return ;
    }
    try{
    const { data } = await sendOtp({ phone });
    console.log(data);
    toast.success('Otp has been sent successfully', {
      position: 'bottom-center',
    });
    dispatch(setOtp(data));
    nextStep();
    }catch(err){
      toast.error('Something went wrong',{
        position:'bottom-center',
      })
      return ;
    }
  }

  return (
    <div>
      <Card image={logo} title={title}>
        <div className={Styles.imgWrapper}>
          <button
            className={`${Styles.btn} ${step === 1 ? Styles.active : ""}`}
            onClick={() => setStep(1)}
          >
            <img
              src="/images/phone_android.png"
              alt="Not loaded"
              className={Styles.img}
            />
          </button>
          <button
            className={`${Styles.btn} ${step === 2 ? Styles.active : ""}`}
            onClick={() => setStep(2)}
          >
            <img
              src="/images/Vector.png"
              alt="Not loaded"
              className={Styles.img}
            />
          </button>
        </div>
        <div className={Styles.phn}>
          <img
            src="/images/Emoji.png"
            alt="Not Loaded"
            className={Styles.imgStyle}
          />

          <InputMask
            mask="999-999-9999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={Styles.input}
            required  
          />
        </div>
       { errorShow && <p style={{color:'red',
          marginLeft:'50px',marginTop:'5px'
        }}>
          Invalid Phone Number
        </p>
      }
        <Button handleClick={handleRequest} text={btnText} />
        <p className={Styles.Para}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </Card>
    </div>
  );
};

export default SetUpPhone;
