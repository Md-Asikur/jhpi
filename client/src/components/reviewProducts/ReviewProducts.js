import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import { selectProducts } from "../../redux/slice/productSlice";
import Card from "../card/Card";
import styles from "./ReviewProducts.module.scss";
import StarsRating from "react-star-rate";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImg from "../../assets/spinner.jpg";
import { useValue } from "../../context/ContextProvider";

const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("products", id);
  const products = useSelector(selectProducts);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);
 const {
   dispatch,
   state: {
     currentUser,
    
   },
 } = useValue();
  const name = currentUser?.name;
  const photoURL = currentUser?.photoURL;
 
  const dbid = currentUser?.id;
  const email = currentUser?.email;
   const role = currentUser?.role;
  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID,
      name,
      email,
      dbid,
      photoURL,
     
      role,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };
   
    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

        theme: "light",
      });
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

        theme: "dark",
      });
    }
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
      <div className={`container ${styles.review}`}>
        <h2>Review Student</h2>
        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p className="text-3xl">
              <b>Student Name:</b> {product.name}
            </p>
            <img src={product.imageURL} alt={product.name} style={{ width: "100px" }} />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            {currentUser && currentUser ? (
              <button type="submit" className="--btn --btn-primary">
                Submit Review
              </button>
            ) : (
              <Link
                onClick={() => dispatch({ type: "OPEN_LOGIN" })}
                className="--btn --btn-danger"
                style={{ zIndex: "9999999", textDecoration: "none", hover: "none" }}
              >
                PLESE LOGIN AND CONTINUE!
              </Link>
            )}
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducts;
