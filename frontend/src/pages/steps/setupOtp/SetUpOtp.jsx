import React from "react";
import Card from "../../../components/shared/card/Card";
import Button from "../../../components/shared/button/Button";
import styles from "./SetUpOtp.module.css";
import { useState } from "react";
import { verifyOtp } from "../../../http/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../../redux/authSlice";
import OtpInput from "react-otp-input";
import { sendOtp } from "../../../http/index";
import { sendOtpViaEmail } from "../../../http/index";
import { toastifyErrorMessage,toastifySuccessMessage } from "../../../toast";


const SetUpOtp = ({ nextStep }) => {
  const image = "/images/otp.png";
  const title = "Enter the code we just texted you";
  const btnText = "Next";

  const { phone, hash,email} = useSelector((state) => state.authSlice.otp);

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!otp || !hash || (!phone && !email)) {
      return;
    }
    try {
      const { data } = await verifyOtp({ otp, phone, hash ,email});
      console.log(data);
      if (data) {
        dispatch(setAuth(data));
      }
      navigate("/activate");
    } catch (err) {
      return;
    }
  };

  const handleClick=async()=>{
    let finData;
      try{
        if(email){
     const {data}=await sendOtpViaEmail({email});
        finData=data;
        }
       if(phone){
        const {data}=await sendOtp({phone});
        finData=data;
       }
       console.log(finData);
       dispatch(setAuth(finData));
        toastifySuccessMessage('Resend Otp');
      }catch(err){
        toastifyErrorMessage('Something-went wrong');
      }
      return ;

  }

  return (
    <div>
      <Card image={image} title={title}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderInput={(props) => <input {...props} />}
          containerStyle={styles.container}
          inputStyle={styles.input}
        />
        <p className={styles.para} onClick={handleClick}>Didn’t receive? Tap to resend</p>

        <Button handleClick={handleSubmit} text={btnText} />
      </Card>
    </div>
  );
};

export default SetUpOtp;
