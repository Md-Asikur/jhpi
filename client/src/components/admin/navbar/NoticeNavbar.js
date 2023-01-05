import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import styles from "./Navbar.module.scss";

import { useValue } from "../../../context/ContextProvider";
import { Avatar } from "@mui/material";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const NoticeNavbar = () => {
  const userName = useSelector(selectUserName);
  const {
    state: { currentUser },
   
  } = useValue();
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <Avatar
          src={currentUser?.photoURL}
          style={{ width: "100px", height: "120px", backgroundPosition: "center" }}
          alt={currentUser?.name}
        >
          {currentUser?.name?.charAt(0).toUpperCase()}
        </Avatar>

        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
         
          <li>
            <NavLink to="/notice/all-notices" className={activeLink}>
              All Notice
            </NavLink>
          </li>
          <li>
            <NavLink to="/notice/add-notice/ADD" className={activeLink}>
              Add Notice
            </NavLink>
          </li>
         
        </ul>
      </nav>
    </div>
  );
};

export default NoticeNavbar;
