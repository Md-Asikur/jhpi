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
import { Link } from "react-router-dom";
import { useValue } from "../../context/ContextProvider";
import { toast } from "react-toastify";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const [showFilter, setShowFilter] = useState(false);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
const {
  state: { currentUser },
} = useValue();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
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
        Our Students
      </h1>
      {(currentUser && currentUser?.role === "admin") || currentUser ? (
        <h1 style={{ textAlign: "center", fontSize: "2.2rem", padding: "10px 10px" }}>
          <Link
            to="/admin/add-student/ADD"
            style={{ textAlign: "center", fontSize: "2.5rem" }}
          >
            Add New Student
          </Link>
        </h1>
      ) : (
        <h1 style={{ textAlign: "center", fontSize: "2.2rem", padding: "10px 10px" }}>
          <Link
            onClick={loginMessage}
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              color: "red",
              textDecoration: "none",
            }}
          >
            Add New Student
          </Link>
        </h1>
      )}
      <div className={`container ${styles.product}`}>
        <aside
          className={showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}
        >
          {isLoading ? null : <ProductFilter />}
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
            <ProductList products={products} />
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

export default Product;
