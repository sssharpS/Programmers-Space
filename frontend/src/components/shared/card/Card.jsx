import React from "react";
import styles from "./Card.module.css";


const Card = ({children}) => {
    
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <img
            src="/images/logo.png"
            alt="Not loaded"
            style={{ height: "30px " }}
          ></img>
          <span style={{marginLeft:'10px'}}>Welcome To ProgrammersSpace!</span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Card;
