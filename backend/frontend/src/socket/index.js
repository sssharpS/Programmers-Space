import {io} from 'socket.io-client';

const socketInit=()=>{
    const options={
        forceNew:true,
        reconnectionAttempts: 'Infinity',
        timeout:10000,
        transports:['websocket'],
        
    }
    return io(`${window.location.origin}`,options);
}


export default socketInit;