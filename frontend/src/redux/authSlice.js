import {createSlice} from '@reduxjs/toolkit';


//create state
const initialState={
    isAuth:false,
    user:null,
    otp:{
      phone:'',
      hash:''
    }
}

const authSlice=createSlice({
    name:'authReducer',
    initialState,
    reducers:{
      setAuth:(state,action)=>{ 
       const {user}=action.payload;
      //  console.log(user);
        if(user==null){
          state.isAuth=false;
          state.user=user;
        }
        else{
         state.isAuth=true;
         state.user=user;
        }
      },
       setOtp:(state,action)=>{
        
        const {phone,hash}=action.payload;
        state.otp.phone=phone;
        state.otp.hash=hash;
        
       },
    }

});

export const  {setAuth,setOtp}=authSlice.actions;

export default authSlice.reducer;





