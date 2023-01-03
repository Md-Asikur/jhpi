import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import spinnerImg from "../../assets/spinner.jpg";
import { FaCogs } from "react-icons/fa";
import { selectTeachers, STORE_TEACHERS } from "../../redux/slice/teacherSlice";
import TeacherFilter from "./productFilter/TeacherFilter";
import TeacherList from "./productList/TeacherList";

const TeacherAL = () => {
  const { data, isLoading } = useFetchCollection("teachers");
  const [showFilter, setShowFilter] = useState(false);
  const teachers = useSelector(selectTeachers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_TEACHERS({
       teachers: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        teachers: data,
      })
    );
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section>
      <h1 style={{ textAlign: "center", fontSize: "4rem", paddingBottom: "20px" }}>
        Our Teachers
      </h1>
      <div className={`container ${styles.product}`}>
        <aside
          className={showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}
        >
          {isLoading ? null : <TeacherFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading.."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <TeacherList teachers={teachers} />
          )}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherAL;
