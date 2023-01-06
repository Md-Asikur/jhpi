import React from "react";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";


import AddNotice from "../../components/admin/addProduct/AddNotice";

import NoticeNavbar from "../../components/admin/navbar/NoticeNavbar";


import ViewNotice from "../../components/admin/viewProducts/ViewNotice";
import { useValue } from "../../context/ContextProvider";

import NoticeHome from "../home/NoticeHome";
import styles from "./Admin.module.scss";

const NoticeAdmin = () => {
  const {
    state: { currentUser },
  } = useValue();
 
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <NoticeNavbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<NoticeHome />} />
          {(currentUser && currentUser?.role === "admin" ||currentUser) ? (
            <Route path="all-notices" element={<ViewNotice />} />
          ) :""}
          <Route path="add-notice/:id" element={<AddNotice />} />
        </Routes>
      </div>
    </div>
  );
};

export default NoticeAdmin;
