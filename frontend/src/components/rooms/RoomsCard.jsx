import React from 'react';
import styles from './RoomsCard.module.css';
import { useNavigate } from 'react-router-dom';

const RoomsCard = ({room}) => {

  const navigate=useNavigate();
  const handleClick=()=>{
    navigate(`/rooms/${room._id}`);
  }
  return (
    <div className={styles.roomsWrapper} onClick={handleClick}>
      <div className={styles.heading}>
      <span>{room.topic}</span>
      </div>
      <div className={styles.wrapper}>
      <div className={styles.avatarWrapper}>
        {room.speakers.map((speaker)=>{
            return <img src={speaker.avatar} alt='Not Loaded' key={speaker.id} className={styles.imgStyle}/>
        })}
      </div>
      <div>
        {room.speakers.map((speaker)=>{
           return (
            <div key={speaker.id} className={styles.nameWrapper}>
              <span className={styles.spkrs}>{speaker.name}</span>
              <img src='/images/message.png' alt='Not loaded'/>
            </div>
           )
        })}
      </div>
      </div>
      <div className={styles.contWrapper}>
        <span style={{margin:'8px'}}>{room.totalPeople}</span>
        <img src='/images/count.png' alt='not Loaded'/>
      </div>
    </div>
  )
}

export default RoomsCard;

