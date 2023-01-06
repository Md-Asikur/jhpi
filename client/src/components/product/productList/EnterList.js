import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";

import { useDispatch, useSelector } from "react-redux";

import { FILTER_BY_SEARCH, selectFilteredEntertainment, SORT_ENTERTAINMENT } from "../../../redux/slice/filterScEnter";

import EnterItem from "../productItem/EnterItem";
import EnterPagination from "../../pagination/EnterPagination";

const EnterList = ({ entertainments }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredEntertainments = useSelector(selectFilteredEntertainment);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [entertainmentsPerPage, setEntertainmentsPerPage] = useState(9);
  // Get Current Products
  const indexOfLastEntertainment = currentPage * entertainmentsPerPage;
  const indexOfFirstEntertainment = indexOfLastEntertainment - entertainmentsPerPage;
  const currentEntertainment = filteredEntertainments.slice(indexOfFirstEntertainment, indexOfLastEntertainment);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_ENTERTAINMENT({ entertainments, sort }));
  }, [dispatch, entertainments, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ entertainments, search }));
  }, [dispatch, entertainments, search]);

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)} />

          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>{filteredEntertainments.length}</b> Entertainments found.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>

            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {entertainments.length === 0 ? (
          <p>No Entertainment found.</p>
        ) : (
          <>
            {currentEntertainment.map((entertainment) => {
              return (
                <div key={entertainment.id}>
                  <EnterItem {...entertainment} grid={grid} entertainment={entertainment} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <EnterPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        entertainmentsPerPage={entertainmentsPerPage}
        totalEntertainments={filteredEntertainments.length}
      />
    </div>
  );
};

export default EnterList;
