import React from 'react';
import styles from './Rooms.module.css'; 
import RoomList from '../../components/roomList/RoomList';
import RoomModal from '../../components/roomModal/RoomModal';
import { useState } from 'react';

const Rooms = () => {
  const [isShow,setIsShow]=useState(false);
  
  const handleCancel=()=>{
    setIsShow(false);
  }
  return (
    <div className='container'>
      <div>
      <div className={styles.Wrapper}>
        <span style={{fontWeight:'bold',fontSize:'18px',borderBottom:'2px solid blue'}}>All Voice Rooms</span>
        <div className={styles.search}>
          <img src='/images/search.png' alt='Not loaded' style={{marginLeft:'8px'}}/>
          <input type='text' />
        </div>
        <div>
          <button className={styles.btn} onClick={()=>setIsShow(true)}>
            <img src='/images/room.png' alt='not loaded' />
            <span>Start a room</span>
          </button>
        </div>
      </div>
      </div>
      <RoomList />
     { isShow && <RoomModal handleCancel={handleCancel}/>}
    </div>
  )
}

export default Rooms;
