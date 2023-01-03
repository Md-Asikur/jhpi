import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
  SORT_PRODUCTS,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagination/Pagination";
import { selectFilteredTeachers, SORT_TEACHERS } from "../../../redux/slice/tecSlice";
import TeacherItem from "../productItem/TeacherItem";
import TecPagination from "../../pagination/TecPagination";

const TeacherList = ({ teachers }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredTeachers = useSelector(selectFilteredTeachers);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage, setTeachersPerPage] = useState(9);
  // Get Current Products
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeacher = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_TEACHERS({teachers, sort }));
  }, [dispatch,teachers, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({teachers, search }));
  }, [dispatch,teachers, search]);

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)} />

          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>{filteredTeachers.length}</b> Teachers found.
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
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {teachers.lenght === 0 ? (
          <p>No Teacher found.</p>
        ) : (
          <>
            {currentTeacher.map((teacher) => {
              return (
                <div key={teacher.id}>
                  <TeacherItem {...teacher} grid={grid} teacher={teacher} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <TecPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        teachersPerPage={teachersPerPage}
        totalTeachers={filteredTeachers.length}
      />
    </div>
  );
};

export default TeacherList;
