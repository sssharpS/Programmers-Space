import {io} from 'socket.io-client';

const socketInit=()=>{
    const options={
        forceNew:true,
        reconnectionAttempts: 'Infinity',
        timeout:10000,
        transports:['websocket'],
        
    }
    return io(process.env.REACT_APP_BASE_ADDRESS,options);
}


export default socketInit;