import React from "react";
import styles from "./Button.module.css";
import { useNavigate } from "react-router-dom";

const Button = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div>
      <div className={styles.btnWrapper}>
        <button className={styles.btn} onClick={handleClick}>
          <span>Get your username</span>
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
