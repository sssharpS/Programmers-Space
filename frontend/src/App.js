import './App.css';
import React from 'react';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import Navbar from './components/shared/navigation/Navbar';
import Home from './pages/Home/Home';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';
import { useVerifyToken } from './hooks/useVerifyToken';
import Room from './pages/Room/Room';
import { Toaster } from 'react-hot-toast';
import Profile from './pages/Profile/Profile';



  

function App() {
  
  const {loading}=useVerifyToken();


  return loading?<></>:(
    <div>
      <Toaster />
        <Router>
           <Navbar />
          <Routes>
             <Route exact path='/' element={<GuestRoute><Home/></GuestRoute>} />
             <Route path='/authenticate' element={<GuestRoute><Authenticate /></GuestRoute>}/>
             <Route path='/activate' element={<SemiProtectedRoute><Activate/></SemiProtectedRoute>}/>
             <Route path='/rooms' element={<ProtectedRoute><Rooms/></ProtectedRoute>}/>
             <Route path='/rooms/:id' element={<ProtectedRoute><Room /></ProtectedRoute>}/>
             <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </Router>
    </div>
  );
}

const GuestRoute=({children})=>{
  const {isAuth}=useSelector((state)=>state.authSlice);
  return (
      !isAuth?children:<Navigate to='/activate' replace/>
  )
}

const SemiProtectedRoute=({children})=>{
    const {isAuth,user}=useSelector((state)=>state.authSlice);
    return (
      !isAuth?<Navigate to='/' replace/>:isAuth && !user.isActivate?children
      :<Navigate to='/rooms' replace/>
    )
  
}

const ProtectedRoute=({children})=>{
    const {isAuth,user}=useSelector((state)=>state.authSlice);
    return (
       !isAuth?<Navigate to='/' replace/>:isAuth && !user.isActivate?<Navigate to='/activate' replace/>:children
    )
}

export default App;

