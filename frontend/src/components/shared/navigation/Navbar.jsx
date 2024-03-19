import React from 'react';
import {Link} from 'react-router-dom'; 
import styles from './Navbar.module.css';

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
   
  return (
    <nav className={`${styles.navbar} container`}>

        <Link style={imgStyle}>
         <img src='/images/logo.png' alt='Not loaded' style={{height:'40px '}}/>
         <span style={{marginLeft:'15px'}}>ProgrammersSpace</span>
       </Link>
    </nav>
  )
}

export default Navbar;
