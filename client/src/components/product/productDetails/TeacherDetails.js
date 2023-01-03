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
import ReviewTeachers from "../../reviewProducts/ReviewTeacher";

const TeacherDetails = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  const { document } = useFetchDocument("teachers", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.teacherID === id);
  console.log(filteredReviews);

  const {
    state: { currentUser },
  } = useValue();
  const active = currentUser?.active;
  console.log(active);

  useEffect(() => {
    setTeacher(document);
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

      toast.success("Review deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        {teacher === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={teacher.imageURL} alt={teacher.name} />
              </div>
              <div className={styles.content} id="details">
                <h3>
                  {" "}
                  <b>Teacher Name </b> :{teacher.name}
                </h3>
               
                <h3>
                  {" "}
                  <b>Email </b> :{teacher.Email}
                </h3>
                <h3>
                  {" "}
                  <b>Phone </b> :{teacher.Phone}
                </h3>
                <h3>
                  {" "}
                  <b>Description </b> :{teacher.desc}
                </h3>
                {/* <p>
                  <b>SKU</b> {teacher.id}
                </p> */}
                <h3>
                  <b>Tag </b>: {teacher.brand}
                </h3>
                <h3>
                  <b>Join Date On College </b>: {teacher.join}
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
        <ReviewTeachers />
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
                      <span className="text-2xl">
                        <b>Id: {id}</b>
                      </span>
                      <br />
                      <span className="text-2xl">
                        <b> Date: {reviewDate}</b>
                      </span>
                      <br />
                      <span className="text-2xl">
                        <b>By: {name}</b>
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

                      <span>
                        <img src={photoURL} className="w-40 h-30" />
                      </span>
                      {currentUser?.role === "admin" ? (
                        <FaTrashAlt
                          size={22}
                          color="red"
                          onClick={() => confirmDelete(id)}
                        />
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

export default TeacherDetails;
