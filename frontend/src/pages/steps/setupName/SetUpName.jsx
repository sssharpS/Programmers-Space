import React from 'react';
import Card from '../../../components/shared/card/Card';
import styles from './SetUpName.module.css';
import Button from '../../../components/shared/button/Button';
import { useState } from 'react';
import {setUsername} from '../../../redux/userSlice';
import { useDispatch } from 'react-redux';

const SetUpName = ({handleClick}) => {
   const image='/images/name.png';
   const title="What's your full name?";
   const btntext='Next';
 

   const [name,setName]=useState('');

   const dispatch=useDispatch();

   const clickHandle=()=>{
       if(!name){
        return ;
       }
       dispatch(setUsername({name}));
       handleClick();
   }


  return (
    <div>
      <Card image={image} title={title}>
        
         <div className={styles.name}>
         <input type='text' className={styles.input} placeholder='Your Name' onChange={(e)=>setName(e.target.value)} value={name}/>
         </div>
        <p className={styles.para}>People use real names at codershouse :) </p>

        <Button text={btntext} handleClick={clickHandle}/>

      </Card>
    </div>
  )
}

export default SetUpName;
