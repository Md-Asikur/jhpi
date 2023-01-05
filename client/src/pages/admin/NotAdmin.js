import React from "react";
import { Route, Routes } from "react-router-dom";


import AddNotice from "../../components/admin/addProduct/AddNotice";

import NoticeNavbar from "../../components/admin/navbar/NoticeNavbar";


import ViewNotice from "../../components/admin/viewProducts/ViewNotice";

import NoticeHome from "../home/NoticeHome";
import styles from "./Admin.module.scss";

const NoticeAdmin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <NoticeNavbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<NoticeHome />} />
          <Route path="all-notices" element={<ViewNotice />} />
          <Route path="add-notice/:id" element={<AddNotice/>} />
         
        </Routes>
      </div>
    </div>
  );
};

export default NoticeAdmin;
