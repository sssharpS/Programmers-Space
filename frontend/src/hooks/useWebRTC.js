 /* eslint-disable react-hooks/exhaustive-deps */
import freeIceServers from 'freeice';
import { useCallback, useEffect, useRef } from 'react';
// import { useNavigate} from 'react-router-dom';

import socketInit from '../socket';
import {ACTIONS} from '../actions';
import { useStateWithCallback } from './useStateWithCallback';

export const useWebRTC = (roomId, user) => {
 
  //  there will be multiple clients or users in the room so we need a list for storing all of them
    const [clients,setClients]=useStateWithCallback([]);

    // we need to mapping the audio elements which audio element basically refers to which client
    const audioElements=useRef({});// store all the audio Elements
    const peerConnections=useRef({}); //store all the peers(connections)
    const localMediaStream=useRef(null);
    const socket=useRef(null);
    



 const provideRef=(instance,userId)=>{
    // mapping which audio element basically refers to which user
    audioElements.current[userId]=instance;  // instance of that audio element
    // console.log(audioElements.current);
  }
      
  //add Client or user
       const addNewClient=useCallback((newClient,cb)=>{
          //check if find client are already added or not
       const lookingFor=clients.find((client)=>client._id===newClient._id);
       if(lookingFor===undefined){
        // add newClient
        setClients((existingState)=>[...existingState,newClient]
       ,cb);
       }
    
    },[clients,setClients]);


    //socket initialisation
  useEffect(()=>{
    socket.current=socketInit();

  },[]);

       //capture media
  //    useEffect(()=>{
  //     const startCapture=async()=>{
  //          //browser object
  //          localMediaStream.current=await navigator.mediaDevices.getUserMedia({
  //              audio:true,
  //          })
  //     };
  //     startCapture().then(()=>{
  //        addNewClient(user,()=>{
  //          const localElement=audioElements.current[user._id];
  //          if(localElement){
  //              localElement.volume=0;
  //              localElement.srcObject=localMediaStream.current;
  //          }
  
           
  //  //we will basically emit an event for joining the Room 
  //  // socket emit join socket.io
  //  socket.current.emit(ACTIONS.JOIN,{roomId,user});
  
  //        });
  //     });
  
   
  //   return ()=>{
  //     socket.current.off(ACTIONS.JOIN);
  //   }
  
  //  },
  //    // eslint-disable-next-line
  //  []);

 
  //       useEffect(()=>{
        
  //     const handleAddPeer=async({
  //       peerId,createOffer,user:remoteUser, //create alias
  //     })=>{
        
  //       //create connection if already connected then give warning
  //       //connection reference basically stores object and check peerId already exists in connection reference
  //       if(peerId in peerConnections.current){
  //         return console.warn(`your are already connected with ${peerId} (${user.name})`
  //         );
  //       }

  //       // if not connected then establish a connection
  //        peerConnections.current[peerId]=new RTCPeerConnection({
  //          iceServers:freeice(),
  //        });

  //        const currentConnections=peerConnections.current[peerId];
  //        //Handle new ice candidate
  //        currentConnections.onicecandidate=(event)=>{

  //         //as soon as iceCandidates are being received ,we have to send the iceCandidate to this peerId
  //            socket.current.emit(ACTIONS.RELAY_ICE,{
  //             peerId,
  //             iceCandidate:event.candidate,

  //            });
  //        }

  //        // handle on track on this connection
  //        currentConnections.ontrack=async({
  //         //we have receiving streams Array (destructuring)
  //         streams:[remoteStream],
  //        })=>{
  //         console.log(remoteStream);
  //          await addNewClient(remoteUser,async()=>{
  //           //check if audio element corresponding to this user already exists or not
  //             if(audioElements.current[remoteUser._id]){
  //                audioElements.current[remoteUser._id].srcObject=remoteStream;
  //             }
  //             else{
  //               //if not in every one second it will be checked audio element is rendered at the UI.
  //                 let settled=false;
  //               let interval=setInterval(()=>{
  //                 if(audioElements.current[remoteUser._id]){
  //                   audioElements.current[remoteUser._id].srcObject=remoteStream;
  //                   settled=true;
  //                 }
  //                 if(settled){
  //                   clearInterval(interval);
  //                 }
  //               },1000);
  //             }
  //          })
            
  //        }

  //              // Add local track to remote connections
  //      //fetch all the tracks to the localMediaStream(itself stream) and send all these tracks to the other clients(connected)
  //      localMediaStream.current.getTracks().forEach(async(track)=>{
  //            await currentConnections.addTrack(
  //             track,
  //             localMediaStream.current
  //            );

  //      });


  //             // create offer
  //      if(createOffer){
  //       //create offer for all other clients(connectd clients)
  //         const offer= await currentConnections.createOffer();

  //         //set as a local description
  //          await currentConnections.setLocalDescription(offer);

  //         //send offer to another clients(for signaling we use websockets this is the median so first request goes to server )
  //         socket.current.emit(ACTIONS.RELAY_SDP,{
  //           peerId,
  //           sessionDescription:offer,
  //         });
  //      }

  //     }
 

  //    // listen the add-peer event from ws
  //      socket.current.on(ACTIONS.ADD_PEER,handleAddPeer);

  //      //due to memory leak(more) we basically create cleaning function 
  //      return ()=>{
  //         socket.current.off(ACTIONS.ADD_PEER);
  //      }
  //   },
  //   // eslint-disable-next-line
  //   []);



   // HANDLE USER MEDIA CAPTURE
   useEffect(() => {
    (async function () {
      try {
        // GET USER AUDIO DEVICE
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        // ADD THE USER TO CURRENT USERS LIST
        // THEN GET THE LOCAL MEDIA STREAM OF THE USER AND SET THE VOLUME TO "0" SO IT DOESN'T ECHO AND THEN EMIT "JOIN" EVENT
        addNewClient(user, () => {
          const localElement = audioElements.current[user._id];
          if (localElement) {
            localElement.volume = 0;
            localElement.srcObject = localMediaStream.current;
          }
          console.log('second');
          socket.current.emit(ACTIONS.JOIN, { user, roomId });
        });
      } catch (error) {
        // toastifyErrorMessage('Permission denied.');
      }
    })();

    return () => {
      localMediaStream.current.getTracks().forEach((track) => track.stop());
       socket.current.emit(ACTIONS.LEAVE, { roomId });
    };
  }, []);

  // LISTENING FOR ADD_PEER EVENT. IT WILL BE EMITTED WHEN NEW PEER JOINS THE ROOM.
  useEffect(() => {
    const handleAddPeer = async ({ peerId, createOffer, remoteUser }) => {
      // FIRST INITIALIZE A PEER CONNECTION WITH THE CURRENT "SOCKET ID" AND ADD IT TO THE PEER CONNECTIONS LIST.
      if (!peerConnections.current[peerId]) {
        peerConnections.current[peerId] = new RTCPeerConnection({
          iceServers: freeIceServers(),
        });
      }

      const currentPeerConnection = peerConnections.current[peerId];
      // HANDLE NEW ICE CANDIDATE.
      console.log("third");
        //evnet listener
      currentPeerConnection.onicecandidate = (e) => {
        console.log(e.candidate);
        socket.current.emit(ACTIONS.RELAY_ICE, {
          peerId,
          icecandidate: e.candidate,
        });
      };

      // HANDLE "ontrack" WHEN USER STARTS STREAMING
      currentPeerConnection.ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(remoteUser, () => {
          if (audioElements.current[remoteUser._id]) {
            audioElements.current[remoteUser._id].srcObject = remoteStream;
          } else {
            let settled = false;

            const settledInterval = setInterval(() => {
              if (audioElements.current[remoteUser._id]) {
                audioElements.current[remoteUser._id].srcObject = remoteStream;
                settled = true;
              }
              if (settled) clearInterval(settledInterval);
            }, 1000);
            if (settled) clearInterval(settledInterval);
          }
        });
      };

      // ADD LOCAL TRACK TO PEER CONNECTION SO THAT OTHER CAN LISTEN TO THE CURRENT PEER
      localMediaStream.current.getTracks().forEach(async (track) => {
        await currentPeerConnection.addTrack(track, localMediaStream.current);
      });

      // CREATE OFFER
      if (createOffer) {
        // CREATE AN OFFER AND SEND OFFER TO THE OTHER CLIENTS
        const offer = await currentPeerConnection.createOffer();
        await currentPeerConnection.setLocalDescription(offer);
        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
    };

    socket.current.on(ACTIONS.ADD_PEER, handleAddPeer);
    return () => {
      socket.current.off(ACTIONS.ADD_PEER, handleAddPeer);
    };
  }, []);


  
// handle ice Candidate
  useEffect(()=>{
    socket.current.on(ACTIONS.ICE_CANDIDATE,({peerId,iceCandidate})=>{
        if(iceCandidate){
         const connections=peerConnections.current[peerId];
        connections?.addIceCandidate(iceCandidate);
        }
    });

    return ()=>{
      socket.current.off(ACTIONS.ICE_CANDIDATE);
    }
  },[]);

//handle session-description
useEffect(()=>{
    const setRemoteMedia=async(
      {peerId,
      sessionDescription:remoteSessionDescription})=>{
        const connections=peerConnections.current[peerId]
      connections?.setRemoteDescription(new RTCSessionDescription(remoteSessionDescription));

    //if session-description is offer then create an answer
       if(remoteSessionDescription.type==='offer'){
          // const connection=connections.current[peerId];
          
          const answer=await connections?.createAnswer();
          connections.setLocalDescription(answer);

          socket.current.emit(ACTIONS.RELAY_SDP,{
            peerId,
            sessionDescription:answer,
          });

       }
    }
   socket.current.on(ACTIONS.SESSION_DESCRIPTION,setRemoteMedia);
   return ()=>{
     socket.current.off(ACTIONS.SESSION_DESCRIPTION);
   };
},
[]);
  

useEffect(() => {
  window.addEventListener('unload', function () {
      alert('leaving');
      socket.current.emit(ACTIONS.LEAVE, { roomId });
  });
}, []);

useEffect(() => {
  const handleRemovePeer = ({ peerId, userId }) => {
      console.log('leaving', peerId, userId);

      if (peerConnections.current[peerId]) {
          peerConnections.current[peerId].close();
      }

      delete peerConnections.current[peerId];
      delete audioElements.current[peerId];

      setClients((list) => list.filter((c) => c._id !== userId));
  };

  socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

  return () => {
      socket.current.off(ACTIONS.REMOVE_PEER);
      socket.current.disconnect();
  };
}, []);

  return { clients, provideRef};
 };




  //   // WASTED MY 18 HOURS
  //   // HANDLE REMOVE CLIENT
  //   const handleRemovePeer = async ({ peerId, userId }) => {
  //     if (userId !== user.id && peerId !== socket.current.id) {
  //       await peerConnections.current[peerId].close();
  //       delete peerConnections.current[peerId];
  //       delete audioElements.current[userId];
  //       setClients((prev) => prev.filter((client) => client.id !== userId));
  //     } else {
  //       setClients((prev) => prev.filter((client) => client.id !== userId));
  //       Object.values(peerConnections.current).forEach(
  //         async (connection) => await connection.close()
  //       );
  //       navigate('/rooms');
  //     }
    
  //   // if(peerConnections.current[peerId]){
  //   //            peerConnections.current[peerId].close();
  //   //           }
  //   //         delete peerConnections.current[peerId];
  //   //         delete audioElements.current[peerId];
  //   //         setClients(list=> list.filter(client => client.id!==userId));
  //   //         navigate('/rooms');
  //   // };
  //   }
  //   socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
  //   return () => {
  //     socket.current.off(ACTIONS.REMOVE_PEER, handleRemovePeer);
  //     socket.current.disconnect();
  //   };
  // }, []);