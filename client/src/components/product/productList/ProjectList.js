

import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";

import { useDispatch, useSelector } from "react-redux";

import { FILTER_BY_SEARCH, selectFilteredProjects, SORT_PROJECTS } from "../../../redux/slice/filterScProjects";
import NoticeItem from "../productItem/NoticeItem";
import NoticePagination from "../../pagination/NoticePagination";
import ProjectItem from "../productItem/ProjectItem";
import ProjectPagination from "../../pagination/ProjectPagination";

const ProjectList = ({ projects }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredProjects = useSelector(selectFilteredProjects);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(9);
  // Get Current Products
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProject = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PROJECTS({ projects, sort }));
  }, [dispatch, projects, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ projects, search }));
  }, [dispatch, projects, search]);

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)} />

          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>{filteredProjects.length}</b> Project found.
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
        {projects.length === 0 ? (
          <p>No Project found.</p>
        ) : (
          <>
            {currentProject.map((project) => {
              return (
                <div key={project.id}>
                  <ProjectItem {...project} grid={grid} project={project} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <ProjectPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        projectsPerPage={projectsPerPage}
        totalProjects={filteredProjects.length}
      />
    </div>
  );
};

export default ProjectList;
