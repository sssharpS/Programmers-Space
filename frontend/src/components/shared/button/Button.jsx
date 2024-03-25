import React from "react";
import styles from "./Button.module.css";


const Button = ({handleClick,text}) => {



  return (
    <div>
      <div className={styles.btnWrapper}>
        <button className={styles.btn} onClick={handleClick}>
          <span>{text}</span>
          <img
            src="/images/arrow_forward.png"
            alt="not load"
            className={styles.arrow}
          ></img>
        </button>
      </div>
    </div>
  );
};

export default Button;
