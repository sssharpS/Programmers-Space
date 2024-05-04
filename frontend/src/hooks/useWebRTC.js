
import { useStateWithCallback } from "./useStateWithCallback"
export const useWebRTC=()=>{
   
    const user=[
        {id:1,name:'Shubham'},
        {id:2,name:'Akhil'}
    ]
   
    const [clients,setClients]=useStateWithCallback(user);

    setClients();
    return {clients};
}