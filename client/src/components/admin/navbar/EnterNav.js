import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import styles from "./Navbar.module.scss";

import { useValue } from "../../../context/ContextProvider";
import { Avatar } from "@mui/material";
import { toast } from "react-toastify";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const EnterNav = () => {
  const userName = useSelector(selectUserName);
  const {
    state: { currentUser },
  } = useValue();
  const loginMessage = () => {
    toast.warning("🦄THIS ACTION ONLY PERFORM BY ADMIN!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,

      theme: "dark",
    });
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <Avatar
          src={currentUser?.photoURL}
          style={{
            width: "40px",
            height: "40px",
            backgroundPosition: "center",
            borderRadius: "50%",
          }}
          alt={currentUser?.name}
        >
          {currentUser?.name?.charAt(0).toUpperCase()}
        </Avatar>

        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          {(currentUser && currentUser?.role === "admin") || currentUser ? (
            <li>
              <NavLink to="/dashboard/all-entertainments" className={activeLink}>
                All Entertainments
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink onClick={loginMessage} className={activeLink}>
                All Entertainment
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/entertainment/add-entertainment/ADD" className={activeLink}>
              Add Entertainment
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default EnterNav;
