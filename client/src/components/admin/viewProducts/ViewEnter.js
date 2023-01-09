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
import {
  selectEntertainments,
  STORE_ENTERTAINMENTS,
} from "../../../redux/slice/EnterSlice";
import { useValue } from "../../../context/ContextProvider";
import Main from "../../../pages copy/dashboard/main/Main";

const ViewEnter = ({ setSelectedLink, link }) => {
   useEffect(() => {
     setSelectedLink(link);
   }, []);
  const { data, isLoading } = useFetchCollection("entertainments");

  const entertainments = useSelector(selectEntertainments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_ENTERTAINMENTS({
        entertainments: data,
      })
    );
  }, [dispatch, data]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Entertainment!!!",
      "You are about to delete this Entertainment",
      "Delete",
      "Cancel",
      function okCb() {
        deleteEntertainment(id, imageURL);
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

  const deleteEntertainment = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "entertainments", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Entertainment deleted successfully.", {
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

  const filteredEntertainment = entertainments.filter(
    (entertainment) => entertainment.dbid === currentUser?.id
  );
  console.log(filteredEntertainment);
  return (
    <>
      {currentUser?.role === "admin" ? (
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            <h2>All Entertainment</h2>

            <h1
              style={{
                textAlign: "center",
                fontSize: "2.2rem",
                padding: "10px 10px",
              }}
            >
              <Link
                to="/entertainment/add-entertainment/ADD"
                style={{ textAlign: "center", fontSize: "2.2rem" }}
              >
                Add New Entertainment
              </Link>
            </h1>

            {entertainments.length === 0 ? (
              <p>No Entertainment found.</p>
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
                  {entertainments.map((notice, index) => {
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
                          <Link to={`/entertainments-details/${id}`}>
                            <FaEye size={18} color="green" />
                          </Link>
                          <Link to={`/entertainment/add-entertainment/${id}`}>
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
            <h2>All Entertainment Created By Me</h2>
            <h1
              style={{
                textAlign: "center",
                fontSize: "2.2rem",
                padding: "10px 10px",
              }}
            >
              <Link
                to="/entertainment/add-entertainment/ADD"
                style={{ textAlign: "center", fontSize: "2.2rem" }}
              >
                Add New Entertainment
              </Link>
            </h1>
            {filteredEntertainment.length === 0 ? (
              <p>No My Created Entertainment found.</p>
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
                  {filteredEntertainment.map((notice, index) => {
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
                          <Link to={`/entertainments-details/${id}`}>
                            <FaEye size={18} color="green" />
                          </Link>
                          <Link to={`/entertainment/add-entertainment/${id}`}>
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

export default ViewEnter;
