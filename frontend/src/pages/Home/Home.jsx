import React from 'react';
import Card from '../../components/shared/card/Card';
import Button from '../../components/shared/button/Button';
import styles from './Home.module.css';
// import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const logo='/images/logo.png';
  const title='Welcome to ProgrammersSpace!';
  const btntext="Let's Begin";

  const navigate=useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/authenticate");
  };

  return (
    <div>
      <Card image={logo} title={title}>
      <p className={styles.para}>
          We’re working hard to get ProgrammersSpace ready for everyone! While we
          wrap up the finishing youches, we’re adding people gradually to make
          sure nothing breaks :)
        </p>
       <Button handleClick={handleClick} text={btntext}/>
       <div className={styles.signIn}>
         <span>Have an invite text</span>
         {/* <Link to='/Login'  className={styles.signinlink}>Sign in</Link> */}
         
       </div>
      </Card>
    </div>
  )
}

export default Home;
