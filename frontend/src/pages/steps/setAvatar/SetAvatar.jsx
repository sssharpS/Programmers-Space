import React from 'react';
import Card from '../../../components/shared/card/Card';
import {useSelector,useDispatch} from 'react-redux';
import Styles from './SetAvatar.module.css';
import { useState } from 'react';
import { useRef } from 'react';
import Button from '../../../components/shared/button/Button';
import { activateUser } from '../../../http';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../../../redux/authSlice';
import  {setAvatar} from '../../../redux/userSlice'

const SetAvatar = ({handleClick}) => {
  const image='/images/avatar.png';

 const {name}=useSelector((state)=>state.userSlice);
 const navigate=useNavigate();
 const dispatch=useDispatch();

  const title=`Okay ${name}!`;
  const btntext='Next';



  const [img,setImg]=useState('/images/avatar-img.png');
  const inputRef=useRef(null);


  const setFile=(e)=>{
    const file=e.target.files[0];
    //make url
    if(file){
      const url=URL.createObjectURL(file);
      console.log(url);
      setImg(url);
      dispatch(setAvatar({avatar:img}));
    }
  }
  const changeAvatar=()=>{
    inputRef.current.click();
  }
  
  const handleNext=async()=>{
      handleClick();
    try{  
      const {data}=await activateUser({name,img});
      dispatch(setAuth(data));
      navigate('/rooms');
    }catch(err){
      return ;
    }
      
    
  }

  return (
    <div>
      <Card image={image} title={title}>

        <div className={Styles.imgWrapper}>

        <span className={Styles.text}>How's this Photo?</span>
     <img src={img} alt='not Loaded' className={Styles.img}/>
       <button className={Styles.btn} onClick={changeAvatar}>Choose a different Photo</button>

       <div style={{display:'none'}}>
       <input type="file" ref={inputRef} onChange={setFile}></input>
       </div>
      
        </div>

        <Button text={btntext} handleClick={handleNext}></Button>
     
      </Card>
    </div>
  )
}

export default SetAvatar;
