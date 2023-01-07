import styles from "./ProductDetails.module.scss";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import spinnerImg from "../../../assets/spinner.jpg";

import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";

import { useValue } from "../../../context/ContextProvider";
import Notiflix from "notiflix";
import ReviewNotices from "../../reviewProducts/ReviewNotice";
import ReviewProjects from "../../reviewProducts/ReviewProject";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  const { document } = useFetchDocument("projects", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.projectID === id);

  const {
    state: { currentUser },
  } = useValue();

  useEffect(() => {
    setProject(document);
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
      });
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>project Details</h2>
        <div>
          <Link to="/projects">&larr; Back To All</Link>
        </div>
        {project === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={project.imageURL} alt={project.name} />
              </div>
              <div className={styles.content} id="details">
                <h3>
                  {" "}
                  <b>Project Name </b> :{project.name}
                </h3>

                <h3>
                  {" "}
                  <b>Description </b> :{project.desc}
                </h3>
                {/* <p>
                  <b>SKU</b> {teacher.id}
                </p> */}

              

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
        <ReviewProjects />
        <Card cardClass={styles.card}>
          <h3>Comment</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no Comment for this Project yet.</p>
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
                      {currentUser?.role === "admin" || dbid === currentUser?.id ? (
                        <>
                          <Link
                            onClick={() => confirmDelete(id)}
                            style={{ color: "red", textDecoration: "none" }}
                          >
                            DELETE REVIEW
                          </Link>
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

export default ProjectDetails;
