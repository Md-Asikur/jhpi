import styles from "./ProductDetails.module.scss";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import spinnerImg from "../../../assets/spinner.jpg";
import Product from "../Product";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";
import ReviewProducts from "../../reviewProducts/ReviewProducts";
import { useValue } from "../../../context/ContextProvider";
import Notiflix from "notiflix";
import { FaTrashAlt } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);
console.log(filteredReviews)
  
   const {
   
     state: { currentUser },
   } = useValue();
  const active = currentUser?.active 
  console.log(active)

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Delete Review!!!",
      "You are about to delete this review",
      "Delete",
      "Cancel",
      function okCb() {
        deleteReview(id);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };
 const deleteReview = async (id) => {
   try {
     await deleteDoc(doc(db, "reviews", id));

  
     toast.success("Review deleted successfully.", {
       position: "bottom-center",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,

       theme: "dark",
     });
   } catch (error) {
     toast.error(error.message, {
       position: "bottom-center",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,

       theme: "light",
     });
   }
 };
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Student Details</h2>
        <div>
          <Link to="/students">&larr; Back To All</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content} id="details">
                <h3>
                  {" "}
                  <b>Student Name </b> :{product.name}
                </h3>
                <h3>
                  {" "}
                  <b>Father's Name </b> :{product.Father_name}
                </h3>
                <h3>
                  {" "}
                  <b>Mother's Name </b> :{product.Mother_name}
                </h3>
                <h3>
                  {" "}
                  <b>Present Address </b> :{product.PresentAddress}
                </h3>
                <h3>
                  {" "}
                  <b>Parmanent Address </b> :{product.ParmanentAddress}
                </h3>
                {/* <p className={styles.price}>{`$${product.price}`}</p> */}
                <h3>
                  {" "}
                  <b>Roll </b> :{product.Roll}
                </h3>
                <h3>
                  {" "}
                  <b>Registration </b> :{product.Registration}
                </h3>
                <h3>
                  {" "}
                  <b>Semester </b> :{product.Semester}
                </h3>
                <h3>
                  {" "}
                  <b>Shift </b> :{product.Shift}
                </h3>
                <h3>
                  {" "}
                  <b>Date Of Birth </b> :{product.Date_of_birth}
                </h3>
                <h3>
                  {" "}
                  <b>Blood </b> :{product.Blood}
                </h3>
                <h3>
                  {" "}
                  <b>Email </b> :{product.Email}
                </h3>
                <h3>
                  {" "}
                  <b>Phone </b> :{product.Phone}
                </h3>
                <h3>
                  {" "}
                  <b>Description </b> :{product.desc}
                </h3>
                {/* <p>
                  <b>SKU</b> {product.id}
                </p> */}
                <h3>
                  <b>Tag </b>: {product.brand}
                </h3>
                <h3>
                  <b>Join Date On College </b>: {product.join}
                </h3>

                {/* <div className={styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button className="--btn" onClick={() => decreaseCart(product)}>
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button className="--btn" onClick={() => addToCart(product)}>
                        +
                      </button>
                    </>
                  )}
                </div>
                <button className="--btn --btn-danger" onClick={() => addToCart(product)}>
                  ADD TO CART
                </button> */}
              </div>
            </div>
          </>
        )}
        <ReviewProducts />
        <Card cardClass={styles.card}>
          <h3>Comment</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no Comment for this student yet.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const {
                    rate,
                    review,
                    reviewDate,
                    name,
                    email,
                    dbid,
                    photoURL,
                    id,
                    role,
                  } = item;
                  return (
                    <div key={index} className={styles.review} id="review">
                      <StarsRating value={rate} />
                      <br />
                      <span className="text-3xl">{review}</span>
                      <br />
                      <br />
                      <span className="text-2xl">
                        <b>Name: {name}</b>
                      </span>
                      <br />
                      <span className="text-2xl">
                        <b>Email: {email}</b>
                      </span>
                      <br />
                      <span className="text-2xl">
                        <b>Role: {role}</b>
                      </span>
                      <br />

                      <span className="text-2xl">
                        <b>Date: {reviewDate}</b>
                      </span>
                      <span>
                        <img src={photoURL} className="w-20 h-20 rounded" />
                      </span>
                      {currentUser?.role === "admin" ? (
                        <>
                          <Link onClick={() => confirmDelete(id)} style={{color:"red",textDecoration:"none"}}>DELETE REVIEW</Link>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
