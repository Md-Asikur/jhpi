import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterScProjects";
import { selectProjects,selectMaxPrice } from "../../../redux/slice/projectSlice";

import styles from "./ProductFilter.module.scss";

const ProjectFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);
  const projects = useSelector(selectProjects);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allCategories = ["All", ...new Set(projects.map((project) => project.category))];
  const allBrands = ["All", ...new Set(projects.map((project) => project.brand))];
  // console.log(allBrands);

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ projects, brand }));
  }, [dispatch, projects, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ projects, price }));
  }, [dispatch, projects, price]);

  const filterProjects = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ projects, category: cat }));
  };

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterProjects(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
        {/* <h4>Price</h4>
        <p>{`$${price}`}</p>
        <div className={styles.price}>
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div> */}
        <br />
        <button className="--btn --btn-danger" onClick={clearFilters}>
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default ProjectFilter;
