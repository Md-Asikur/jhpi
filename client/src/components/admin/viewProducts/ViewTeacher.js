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
import { selectTeachers, STORE_TEACHERS } from "../../../redux/slice/teacherSlice";
import { useValue } from "../../../context/ContextProvider";
const ViewTeachers = () => {
  const { data, isLoading } = useFetchCollection("teachers");
  const teachers = useSelector(selectTeachers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_TEACHERS({
       teachers: data,
      })
    );
  }, [dispatch, data]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Teacher!!!",
      "You are about to delete this Teacher",
      "Delete",
      "Cancel",
      function okCb() {
        deleteTeacher(id, imageURL);
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

  const deleteTeacher = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "teachers", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Teacher deleted successfully.", {
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

const filteredTeacher = teachers.filter((teacher) => teacher.dbid === currentUser?.id);
console.log(filteredTeacher);
  return (
    <>
      {currentUser?.role === "admin" ? (
        <>
          {" "}
          {isLoading && <Loader />}
          <div className={styles.table}>
            <h2>All Teachers</h2>

            {teachers.length === 0 ? (
              <p>No Teacher found.</p>
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
                  {teachers.map((teacher, index) => {
                    const { id, name, imageURL, category, cretor, cretorName } = teacher;
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
                          <Link to={`/teachers-details/${id}`}>
                            <FaEye size={18} color="green" />
                          </Link>
                          <Link to={`/teacher/add-teacher/${id}`}>
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
            <h2>All Teachers Created By Me</h2>

            {filteredTeacher.length === 0 ? (
              <p>No My Created Teacher found.</p>
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
                  {filteredTeacher.map((teacher, index) => {
                    const { id, name, imageURL, category, cretor, cretorName } = teacher;
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
                          <Link to={`/teachers-details/${id}`}>
                            <FaEye size={18} color="green" />
                          </Link>
                          <Link to={`/teacher/add-teacher/${id}`}>
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

export default ViewTeachers;
