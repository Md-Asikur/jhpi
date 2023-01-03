import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Lock, Menu } from "@mui/icons-material";

import logo1 from "../../components1/img/slack.png";
import { useValue } from "../../context/ContextProvider";
import UserIcons from "../../com_1/components/user/UserIcons";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2 className="text-white">
        JH<span className="text-orange">PI</span>.
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  const [showMenu, setShowMenu] = useState(false);

  const [scrollPage, setScrollPage] = useState(false);
 

  const navigate = useNavigate();

  

  const fixNavbar = () => {
    if (window.scrollY > 90) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavbar);

 

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  

  return (
    <>
      <header className={scrollPage ? `${styles.fixed}` : null}>
        <div className={styles.header}>
          <h1 style={{ color: "white", cursor: "pointer" }} onClick={() => navigate("/")}>
            JH<span style={{ color: "coral" }}>PI</span>
          </h1>

          <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>

            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                {currentUser && currentUser?.role === "admin" ? (
                  <Link to="/admin/home">Admin</Link>
                ) : (
                  ""
                )}

                {/* <Link to="/admin/home">
                  <button className="--btn --btn-primary">Admin</button>
                </Link> */}
              </li>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={activeLink}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/teachers" className={activeLink}>
                  Teachers
                </NavLink>
              </li>
              <li>
                <NavLink to="/Students" className={activeLink}>
                  Students
                </NavLink>
              </li>
              <li>
                <NavLink to="/notices" className={activeLink}>
                  Notices
                </NavLink>
              </li>
              <li>
                <NavLink to="/gallery" className={activeLink}>
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink to="/principal" className={activeLink}>
                  Principal Info
                </NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <ShowOnLogout>
                  {!currentUser ? (
                    <a
                      color="inherit"
                      startIcon={<Lock />}
                      onClick={() => dispatch({ type: "OPEN_LOGIN" })}
                    >
                      Login
                    </a>
                  ) : (
                    <UserIcons />
                  )}
                </ShowOnLogout>
                <ShowOnLogin>
                  <a href="#home" style={{ color: "#ff7722" }}>
                    <FaUserCircle size={16} />
                    Hi,
                  </a>
                </ShowOnLogin>
                <ShowOnLogin>
                  <NavLink to="/order-history" className={activeLink}>
                    My Orders
                  </NavLink>
                </ShowOnLogin>
                <ShowOnLogin></ShowOnLogin>
              </span>
            </div>
          </nav>

          <div className={styles["menu-icon"]}>
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
