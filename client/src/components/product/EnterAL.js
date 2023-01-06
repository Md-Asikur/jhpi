import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";

import styles from "./Product.module.scss";

import spinnerImg from "../../assets/spinner.jpg";
import { FaCogs } from "react-icons/fa";
import {
  selectEntertainments,
  STORE_ENTERTAINMENTS,
  GET_PRICE_RANGE,
} from "../../redux/slice/EnterSlice";

import { Link } from "react-router-dom";
import { useValue } from "../../context/ContextProvider";

import { toast } from "react-toastify";
import EnterFilter from "./productFilter/EnterFilter";
import EnterList from "./productList/EnterList";


const EnterAL = () => {
  const { data, isLoading } = useFetchCollection("entertainments");
  const [showFilter, setShowFilter] = useState(false);
  const entertainments = useSelector(selectEntertainments);
  const dispatch = useDispatch();
  const {
    state: { currentUser },
  } = useValue();
  useEffect(() => {
    dispatch(
      STORE_ENTERTAINMENTS({
        entertainments: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        entertainments: data,
      })
    );
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
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
    <section>
      <h1 style={{ textAlign: "center", fontSize: "4rem", paddingBottom: "20px" }}>
        OUR ENTERTAINMENTS{" "}
      </h1>
      {(currentUser && currentUser?.role === "admin") || currentUser ? (
        <h1 style={{ textAlign: "center", fontSize: "2.2rem", padding: "10px 10px" }}>
          <Link
            to="/entertainment/add-entertainment/ADD"
            style={{ textAlign: "center", fontSize: "2.2rem" }}
          >
            Add New Entertainment
          </Link>
        </h1>
      ) : (
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", padding: "10px 10px" }}>
          <Link
            onClick={loginMessage}
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              color: "red",
              textDecoration: "none",
            }}
          >
            Add New Entertainment
          </Link>
        </h1>
      )}

      <div className={`container ${styles.product}`}>
        <aside
          className={showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}
        >
          {isLoading ? null : <EnterFilter />}
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
            <EnterList entertainments={entertainments} />
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

export default EnterAL;
