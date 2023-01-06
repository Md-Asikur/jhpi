import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import styles from "./Navbar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { useValue } from "../../../context/ContextProvider";
import { Avatar, Badge, Box, IconButton, Tooltip } from "@mui/material";
import { toast } from "react-toastify";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const userName = useSelector(selectUserName);
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
   const loginMessage = () => {
     toast.warning("🦄PLESE LOGIN AND CONTINUE!", {
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
              <NavLink to="/admin/all-students" className={activeLink}>
                All Students
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink onClick={loginMessage} className={activeLink}>
                All Students
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/admin/add-student/ADD" className={activeLink}>
              Add Student
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
