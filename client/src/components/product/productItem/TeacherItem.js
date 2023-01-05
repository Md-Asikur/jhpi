import React from "react";
import { BsEye } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from "../../../redux/slice/cartSlice";
import Card from "../../card/Card";
import styles from "./ProductItem.module.scss";

const TeacherItem = ({
  teacher,
  grid,
  id,
  name,
  price,
  desc,
  imageURL,
  Roll,
  Depertment,
  post
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/teachers-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          {/* <p>{`$${price}`}</p> */}
          <h4>{shortenText(name, 18)}</h4>
          <p>{post}</p>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 100)}</p>}

        <button
          className="--btn --btn-danger"
          onClick={() => navigate(`/teachers-details/${id}`)}
        >
          SEE MORE
        </button>
      </div>
    </Card>
  );
};

export default TeacherItem;
