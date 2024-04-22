import React from 'react';
import {Link} from 'react-router-dom'; 
import styles from './Navbar.module.css';
import { useSelector } from 'react-redux';
import { logOut } from '../../../http';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../redux/authSlice';

const Navbar = () => {
   // inline css takes an object

   const imgStyle={
        color:'white',
        textDecoration:'none',
        fontWeight:'bold',
        fontSize:'22px',
        display:'flex',
        alignItems:'center',
   }
   
   const {isAuth}=useSelector((state)=>state.authSlice);
   const dispatch=useDispatch();

   const logedOut=async()=>{
      const {data}=await logOut();
      dispatch(setAuth(data));   

   }


  return (
    <nav className={`${styles.navbar} container ${styles.wrapper}`}>
        <div>
        <Link style={imgStyle} to='/'>
         <img src='/images/logo.png' alt='Not loaded' style={{height:'40px '}}/>
         <span style={{marginLeft:'15px'}}>ProgrammersSpace</span>
       </Link>
        </div>
       <div>
       {isAuth && <button onClick={logedOut} className={styles.btn}>Logout</button>}
       </div>
     
    </nav>
  )
}

export default Navbar;
