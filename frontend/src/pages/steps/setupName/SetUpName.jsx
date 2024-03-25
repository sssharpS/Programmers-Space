import React from 'react';
import Card from '../../../components/shared/card/Card';
import styles from './SetUpName.module.css';
import Button from '../../../components/shared/button/Button';

const SetUpName = () => {
   const image='/images/name.png';
   const title="What's your full name?";
   const btntext='Next';


  return (
    <div>
      <Card image={image} title={title}>
        
         <div className={styles.name}>
         <input type='text' className={styles.input} placeholder='Your Name'/>
         </div>
        <p className={styles.para}>People use real names at codershouse :) </p>

        <Button text={btntext}/>

      </Card>
    </div>
  )
}

export default SetUpName;
