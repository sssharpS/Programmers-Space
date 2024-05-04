import {useState,useEffect} from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { setAvatar } from "../redux/userSlice";
import { setUsername } from "../redux/userSlice";

export function useVerifyToken(){
    const [loading,setLoading]=useState(true);
    const dispatch=useDispatch();
  
    //for refreshing the states a request basically proceeds on the server side
     useEffect(()=>{
      (async()=>{
      try{
      const {data}=await axios.get(`${process.env.REACT_APP_BASE_ADDRESS}/api/verify-token`,{
        withCredentials:true
      });
        dispatch(setAuth(data));
        dispatch(setAvatar(data.user));
        dispatch(setUsername(data.user));
         setLoading(false);
      }catch(err){
        // console.log(err);  
        setLoading(false);
      }
    })()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


     return {loading};
}

