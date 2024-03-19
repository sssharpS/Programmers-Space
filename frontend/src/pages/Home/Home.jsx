import React from 'react';
import Card from '../../components/shared/card/Card';
import Button from '../../components/shared/button/Button';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Card>
      <p className={styles.para}>
          We’re working hard to get ProgrammersSpace ready for everyone! While we
          wrap up the finishing youches, we’re adding people gradually to make
          sure nothing breaks :)
        </p>
       <Button/>
       <div className={styles.signIn}>
         <span>Have an invite text?</span>
         <Link to='/Login'  className={styles.signinlink}>Sign in</Link>
         
       </div>
      </Card>
    </div>
  )
}

export default Home;
