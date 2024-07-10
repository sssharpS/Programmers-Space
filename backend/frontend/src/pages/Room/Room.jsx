import React from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useParams,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Room.module.css';

const Room = () => {
   const {id:roomId}=useParams();
const {user}= useSelector((state)=>state.authSlice);
const navigate=useNavigate();

    //custom hook
    const {clients,provideRef}=useWebRTC(roomId,user);

     return (
    <div>
      <div className={styles.header}>
        <div className={styles.back}>
          <button style={{background:'none',cursor:'pointer'}} onClick={()=>navigate('/rooms')}>
          <img src="/images/back.png" alt="not Loaded" style={{height:'40px',width:'40px'}}/>
          </button>
          <p style={{fontSize:'1.3rem',fontWeight:'bolder',
            borderBottom:'2px solid blue'
          }}>All Voice Rooms</p>
        </div>
      </div>
      <div className={styles.speakers}>
          <div className={styles.topic}>
            <p>Artificial</p>
            <button className={styles.btnleave}>
              <img src='/images/Leave.png' alt='not done'/>
              <span>Leave Quitely</span>
            </button>
          </div>
          <div className={styles.clients}>
            <div className={styles.clientsWrap}>
          {clients.map((client)=>{
        return (
             <div key={client._id} className={styles.clientContainer}>
              <img src={client.avatar} alt="notdone" />

              <audio ref={(instance)=>provideRef(instance,user._id)}></audio>
             <span>{client.name}</span>
              
              <button className={styles.micbtn}>
              <img src='/images/mic_off.png' alt='not loaded' style={{height:'25px',width:'25px'}}/>
              </button>
             
             </div>    
        )
      })}
          </div>
          </div>
      </div>
    </div>
  )
}

export default Room;
