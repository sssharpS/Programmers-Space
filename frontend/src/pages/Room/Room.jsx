import React from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';

const Room = () => {
        const {clients}=useWebRTC();
  return (
    <div>
      {clients.map((client)=>{
        return (
             <div key={client.id}>
             <audio controls autoPlay></audio>
             <span>{client.name}</span>
             </div>    
        )
      })}
    </div>
  )
}

export default Room;
