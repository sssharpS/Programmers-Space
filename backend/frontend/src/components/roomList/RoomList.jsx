import React, { useEffect } from 'react';
import { useState } from 'react';
import RoomsCard from '../rooms/RoomsCard';
import Styles from './RoomList.module.css';
import {fectchRooms} from '../../http/index';

const RoomList = () => {

//     const roomsData = [
//     {
//         id: 1,
//         topic: 'Which framework best for frontend ?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/avatar-img.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/avatar-img.png',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 3,
//         topic: 'What’s new in machine learning?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/avatar-img.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/avatar-img.png',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 4,
//         topic: 'Why people use stack overflow?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/avatar-img.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/avatar-img.png',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 5,
//         topic: 'Artificial inteligence is the future?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/avatar-img.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/avatar-img.png',
//             },
//         ],
//         totalPeople: 40,
//     },
// ];


    const [rooms,setRooms]=useState([]);


   useEffect(()=>{
      async function fetchData(){
       const {data}=await fectchRooms();
         setRooms(data.rooms);
       }
     fetchData();
    },[]);

  

  return (
    <div className={Styles.Wrapper}>
      {rooms.map((room)=>{
        return (<RoomsCard key={room._id} room={room}/>)
      })}
    </div>
  )
}


export default RoomList;
