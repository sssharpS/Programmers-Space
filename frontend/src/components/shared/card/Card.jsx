import React from "react";
import styles from "./Card.module.css";


const Card = ({title,image,children}) => {
    
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          {/* use short circuit */}
          {image && <img
            src={image}
            alt="Not loaded"
            style={{ height: "30px " }}
          ></img>}
          {title && <span style={{marginLeft:'10px'}}>{title}</span>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Card;
