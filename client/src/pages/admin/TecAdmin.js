import React from "react";
import { Route, Routes } from "react-router-dom";

import AddTeacher from "../../components/admin/addProduct/AddTeacher";

import TeacherNavbar from "../../components/admin/navbar/TecherNav";
import Orders from "../../components/admin/orders/Orders";

import ViewTeachers from "../../components/admin/viewProducts/ViewTeacher";
import Home from "../home/Home";
import styles from "./Admin.module.scss";

const TecAdmin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <TeacherNavbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="teacher/all-teachers" element={<ViewTeachers />} />
          <Route path="teacher/add-teacher/:id" element={<AddTeacher />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default TecAdmin;
