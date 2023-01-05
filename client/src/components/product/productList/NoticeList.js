import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";

import { useDispatch, useSelector } from "react-redux";


import {
 selectFilteredNotices,
 
  FILTER_BY_SEARCH,
  SORT_NOTICES,
} from "../../../redux/slice/filterSliceNotice";
import NoticeItem from "../productItem/NoticeItem";
import NoticePagination from "../../pagination/NoticePagination";


const NoticeList = ({ notices }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredNotices = useSelector(selectFilteredNotices);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [noticesPerPage, setNoticesPerPage] = useState(9);
  // Get Current Products
  const indexOfLastNotice = currentPage *noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotice = filteredNotices.slice(indexOfFirstNotice, indexOfLastNotice);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_NOTICES({ notices, sort }));
  }, [dispatch, notices, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ notices, search }));
  }, [dispatch, notices, search]);

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)} />

          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>{filteredNotices.length}</b> Notice found.
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
        {notices.length === 0 ? (
          <p>No Notice found.</p>
        ) : (
          <>
            {currentNotice.map((notice) => {
              return (
                <div key={notice.id}>
                  <NoticeItem {...notice} grid={grid} notice={notice} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <NoticePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        noticesPerPage={noticesPerPage}
         totalNotices={filteredNotices.length}
      />
    </div>
  );
};

export default NoticeList;
