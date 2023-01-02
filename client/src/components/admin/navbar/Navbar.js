import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import styles from "./Navbar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { useValue } from "../../../context/ContextProvider";
import { Avatar, Badge, Box, IconButton, Tooltip } from "@mui/material";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const userName = useSelector(selectUserName);
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <Avatar src={currentUser?.photoURL} style={{width:"100px",height:"120px",backgroundPosition:"center"}} alt={currentUser?.name}>
          {currentUser?.name?.charAt(0).toUpperCase()}
        </Avatar>
       
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
