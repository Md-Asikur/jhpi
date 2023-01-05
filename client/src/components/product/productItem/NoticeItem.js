import React from "react";

import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Card from "../../card/Card";
import styles from "./ProductItem.module.scss";

const NoticeItem = ({
  teacher,
  grid,
  id,
  name,
  price,
  desc,
  imageURL,
  Roll,
  Depertment,
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

  

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/notices-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          {/* <p>{`$${price}`}</p> */}
          {/* <p>{name}</p> */}
          <h4>{shortenText(name, 18)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 100)}</p>}

        <button
          className="--btn --btn-danger"
          onClick={() => navigate(`/notices-details/${id}`)}
        >
          SEE MORE
        </button>
      </div>
    </Card>
  );
};

export default NoticeItem;
