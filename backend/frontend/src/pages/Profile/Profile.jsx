import React from 'react';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useRef ,useState} from 'react';
import Button from '../../components/shared/button/Button';
import {activateUser} from '../../http/index';
import {setAvatar} from '../../redux/userSlice';
import { deleteAccount } from '../../http/index';
import {setAuth} from '../../redux/authSlice';

const Profile = () => {

  const inputRef=useRef(null);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const {user}=useSelector((state)=>state.authSlice);
  if(!user.avatar){
    user.avater='';
  }
  
  const [img,setImg]=useState(user.avatar);


  const selectFiles=(e)=>{

    const file=e.target.files[0];
    if(file){
      const reader=new FileReader(); // this is a buil-in class of js
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setImg(reader.result);
      }
    }
    return ;
  }

  const clickForInput=()=>{
     inputRef.current.click();
  }

  const saveChanges=async(name,img)=>{
    if(!name || !img){
      return ;
    }
    try{
     const {data}=await activateUser({name,img});
      console.log(data);
      dispatch(setAvatar(data.user));

    }catch(err){
       return ;
    }
  }

  const deleteA=async()=>{
    
      try{
        const {data}=await deleteAccount();
        console.log(data);
        dispatch(setAuth(data));
        
      }catch(err){
        console.log(err);
        return ;
      }
  }

  return (
    <div>
      <div className={styles.profile}>
        <div className={styles.header}>
          <button className={styles.imgWrapper} onClick={()=>navigate('/rooms')}>
          <img src='/images/back.png' alt='not Loaded' />
          </button>
          <p className={styles.para}>Account Settings</p>
          </div>
          <div className={styles.info}>
          <p style={{marginTop:'18px',fontSize:'1.2rem'}}>
            Profile Picture
          </p>
          <div className={styles.profileWrapper}>
            <img src={img} alt='profile' className={styles.profileImg}/>
          </div>
          </div>
          <div className={styles.editContainer}>
            <button style={{background:'none',cursor:'pointer'}} onClick={clickForInput}><img src='/images/Edit.png' alt='not loaded'/></button>
            <span>Edit</span>
          </div>
          <input type='file'style={{display:'none'}} ref={inputRef} onChange={selectFiles}/>
          <p style={{marginTop:'20px',fontSize:'1.3rem',fontWeight:'bolder'}}>
            Personal Information
          </p>
          <div  className={styles.personalInfo}>
            <div className={styles.person}>
              <span style={{marginLeft:'10px'}}>{user.name}</span>
            </div>
            <div className={styles.person}>
            <span style={{marginLeft:'10px'}}>{user.phone?user.phone:user.email}</span>
            </div>
          </div>
          <div className={styles.savebtn}>
            <Button text='Save Changes' handleClick={()=>saveChanges(user.name,img)}/>
          </div>
          <div className={styles.deleteInfo}>
            <p style={{color:'red'}}>Danger Zone</p>
            <span>Once you delete your account,there is no going back.Please be certain.</span>
          </div>
          <div className={styles.deletebtn}>
          <Button text='Delete Your Account' handleClick={deleteA}/>
          </div>
      </div>
    </div>
  )
}

export default Profile;
