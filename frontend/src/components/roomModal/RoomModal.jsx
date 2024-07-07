import React from 'react';
import styles from './RoomModal.module.css';
import { useState } from 'react';
import { createRoom } from '../../http';
import { useNavigate } from 'react-router-dom';


const RoomModal = ({handleCancel}) => {


  const [topic,setTopic]=useState('');
  const [type,setType]=useState('open');

  const navigate=useNavigate();


  const handleClick=async()=>{

     try{
     const {data}= await createRoom({topic,type});
     console.log(data);
     const room=data.room;
     handleCancel();
     navigate(`/rooms/${room._id}`);
     
       
     }catch(err){
      console.log(err.message);
      return ;
     }

  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalWrapper}>
        <div className={styles.closeWrap}>
        <button>
            <img src='/images/close.png' alt='Not loaded' onClick={handleCancel}/>
        </button>
        </div>
        
        <span className={styles.txt}>Enter the topic to be discussed</span>
        
        <div>
            <input type='text'  className={styles.inp} onChange={(e)=>setTopic(e.target.value)} value={topic}/>
        </div>
        <span className={styles.txt}>Room Type</span>
        <div className={styles.roomTypeWrapper}>
          
            <button className={`${styles.imgBox} ${type==='open'?styles.active:''}`} onClick={()=>setType('open')}>
             <img src='/images/globe.png' alt='Not loaded'/>
             <span>Open</span>
            </button>
            <button className={`${styles.imgBox} ${type==='social'?styles.active:''}`} onClick={()=>setType('social')}>
              <img src='/images/Users.png' alt='Not loaded'/>
              <span>Social</span>
            </button>
            <button className={`${styles.imgBox} ${type==='close'?styles.active:''}`} onClick={()=>setType('close')}>
              <img src='/images/lock.png' alt='Not loaded'/>
              <span>Closed</span>
            </button>
        </div>
        <div className={styles.txtWrap}>
        <span className={styles.txt} style={{fontSize:'18px'}}>
          Start a room, open to everyone
        </span>
        </div> 
         <button className={styles.btn} onClick={handleClick}>
            <img src='/images/jou.png' alt='Not done'/>
            <span className={styles.btnTxt}>Let's Start</span>
         </button>
      </div>
    </div>
  )
}

export default RoomModal;