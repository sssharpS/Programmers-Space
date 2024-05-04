import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { logOut } from "../../../http";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../redux/authSlice";

const Navbar = () => {
  // inline css takes an object

  const imgStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const { isAuth, user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const { name, avatar } = useSelector((state) => state.userSlice);

  const logedOut = async () => {
    const { data } = await logOut();
    dispatch(setAuth(data));
  };

  return (
    <nav className={`${styles.navbar} container ${styles.wrapper}`}>
      <div>
        <Link style={imgStyle} to="/">
          <img
            src="/images/logo.png"
            alt="Not loaded"
            style={{ height: "40px " }}
          />
          <span style={{ marginLeft: "15px" }}>ProgrammersSpace</span>
        </Link>
      </div>
      <div className={styles.rightWrapper}>
      {isAuth && user.isActivate && (
        <div className={styles.wrapper}>
          <span style={{fontWeight:'bold',fontSize:'20px'}}>{name}</span>
          <img src={!avatar?'/images/avatar-img.png':avatar} alt="Not loaded" className={styles.img} />
        </div>
      )}
      <div>
        {isAuth && <button onClick={logedOut} className={styles.btn}><img src='/images/logout.png' alt='Not loaded'/></button>}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
