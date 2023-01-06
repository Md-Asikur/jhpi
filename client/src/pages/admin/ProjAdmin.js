import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProject from "../../components/admin/addProduct/AddProject";
import ProjectNav from "../../components/admin/navbar/ProjectNav";

import ViewProject from "../../components/admin/viewProducts/ViewProject";
import { useValue } from "../../context/ContextProvider";
import Home from "../home/Home";
import styles from "./Admin.module.scss";

const ProjAdmin = () => {
  const {
    state: { currentUser },
  } = useValue();
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
       <ProjectNav/>
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          {(currentUser && currentUser?.role === "admin") || currentUser ? (
            <Route path="all-projects" element={<ViewProject />} />
          ) : (
            ""
          )}
          <Route path="add-project/:id" element={<AddProject />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default ProjAdmin;
