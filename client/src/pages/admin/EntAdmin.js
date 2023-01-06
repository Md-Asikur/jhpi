import React from "react";
import { Route, Routes } from "react-router-dom";
import AddEnter from "../../components/admin/addProduct/AddEnterT";
import EnterNav from "../../components/admin/navbar/EnterNav";


import ViewEnter from "../../components/admin/viewProducts/ViewEnter";

import { useValue } from "../../context/ContextProvider";
import Home from "../home/Home";
import styles from "./Admin.module.scss";

const EntAdmin = () => {
  const {
    state: { currentUser },
  } = useValue();
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
       <EnterNav/>
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          {(currentUser && currentUser?.role === "admin") || currentUser ? (
            <Route path="all-entertainments" element={<ViewEnter />} />
          ) : (
            ""
          )}
          <Route path="add-entertainment/:id" element={<AddEnter />} />
         
        </Routes>
      </div>
    </div>
  );
};

export default EntAdmin;
