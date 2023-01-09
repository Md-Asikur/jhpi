import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import styles from "./ViewProducts.module.scss";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";

import useFetchCollection from "../../../customHooks/useFetchCollection";
import { selectProjects, STORE_PROJECTS } from "../../../redux/slice/projectSlice";
import { useValue } from "../../../context/ContextProvider";

const ViewProject = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  const { data, isLoading } = useFetchCollection("projects");
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PROJECTS({
        projects: data,
      })
    );
  }, [dispatch, data]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Projects!!!",
      "You are about to delete this Projects",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProject(id, imageURL);
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

  const deleteProject = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "projects", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Project deleted successfully.", {
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

        theme: "dark",
      });
    }
  };
  const {
    state: { currentUser },
  } = useValue();

  const filteredProject = projects.filter((project) => project.dbid === currentUser?.id);
  console.log(filteredProject);
  return (
    <>
      {currentUser?.role === "admin" ? (
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            <h2>All Project</h2>
            <h1
              style={{
                textAlign: "center",
                fontSize: "2.2rem",
                padding: "10px 10px",
              }}
            >
              <Link
                to="/Project/add-Project/ADD"
                style={{ textAlign: "center", fontSize: "2.2rem" }}
              >
                Add New Project
              </Link>
            </h1>
            {projects.length === 0 ? (
              <p>No Project found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Creator</th>
                    <th>Creator_Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((notice, index) => {
                    const { id, name, imageURL, category, cretor, cretorName } = notice;
                    return (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>
                          <img src={imageURL} alt={name} style={{ width: "100px" }} />
                        </td>
                        <td>{name}</td>
                        <td>{category}</td>
                        <td>
                          <img src={cretor} alt={cretorName} style={{ width: "60px" }} />
                        </td>
                        <td>{cretorName}</td>
                        <td className={styles.icons}>
                          <Link to={`/projects-details/${id}`}>
                            <FaEye size={18} color="green" />
                          </Link>
                          <Link to={`/project/add-project/${id}`}>
                            <FaEdit size={20} color="green" />
                          </Link>
                          &nbsp;
                          <FaTrashAlt
                            size={18}
                            color="red"
                            onClick={() => confirmDelete(id, imageURL)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      ) : (
        <>
          {" "}
          {isLoading && <Loader />}
          <div className={styles.table}>
            <h2>All Project Created By Me</h2>
            <h1
              style={{
                textAlign: "center",
                fontSize: "2.2rem",
                padding: "10px 10px",
              }}
            >
              <Link
                to="/Project/add-Project/ADD"
                style={{ textAlign: "center", fontSize: "2.2rem" }}
              >
                Add New Project
              </Link>
            </h1>
            {filteredProject.length === 0 ? (
              <p>No My Created Project found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Creator</th>
                    <th>Creator_Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProject.map((notice, index) => {
                    const { id, name, imageURL, category, cretor, cretorName } = notice;
                    return (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>
                          <img src={imageURL} alt={name} style={{ width: "100px" }} />
                        </td>
                        <td>{name}</td>
                        <td>{category}</td>
                        <td>
                          <img src={cretor} alt={cretorName} style={{ width: "60px" }} />
                        </td>
                        <td>{cretorName}</td>
                        <td className={styles.icons}>
                          <Link to={`/projects-details/${id}`}>
                            <FaEye size={18} color="green" />
                          </Link>
                          <Link to={`/project/add-project/${id}`}>
                            <FaEdit size={20} color="green" />
                          </Link>
                          &nbsp;
                          <FaTrashAlt
                            size={18}
                            color="red"
                            onClick={() => confirmDelete(id, imageURL)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ViewProject;
