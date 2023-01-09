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
import { selectNotices, STORE_NOTICES } from "../../../redux/slice/noticeSlice";
import { useValue } from "../../../context/ContextProvider";

const ViewNotices = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  const { data, isLoading } = useFetchCollection("notices");
  const notices = useSelector(selectNotices);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_NOTICES({
        notices: data,
      })
    );
  }, [dispatch, data]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Notice!!!",
      "You are about to delete thisNotice",
      "Delete",
      "Cancel",
      function okCb() {
        deleteNotice(id, imageURL);
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

  const deleteNotice = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "notices", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Notice deleted successfully.", {
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

  const filteredNotice = notices.filter((notice) => notice.dbid === currentUser?.id);
  console.log(filteredNotice);
  return (
    <>
      {currentUser?.role === "admin" ? (
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            <h2 style={{ color: "whitesmoke" }}>All Notices</h2>
            <h1
              style={{
                textAlign: "center",
                fontSize: "2.2rem",
                padding: "10px 10px",
              }}
            >
              <Link
                to="/notice/add-notice/ADD"
                style={{ textAlign: "center", fontSize: "2.2rem" }}
              >
                Add New Notice
              </Link>
            </h1>
            {notices.length === 0 ? (
              <p>No Notice found.</p>
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
                  {notices.map((notice, index) => {
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
                          <Link to={`/notices-details/${id}`}>
                            <FaEye size={18} color="green" />
                          </Link>
                          <Link to={`/notice/add-notice/${id}`}>
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
            <h2 style={{ color: "whitesmoke" }}>All Notices Created By Me</h2>
            <h1
              style={{
                textAlign: "center",
                fontSize: "2.2rem",
                padding: "10px 10px",
              }}
            >
              <Link
                to="/Notice/add-Notice/ADD"
                style={{ textAlign: "center", fontSize: "2.2rem" }}
              >
                Add New Notice
              </Link>
            </h1>
            {filteredNotice.length === 0 ? (
              <p>No My Created Notice found.</p>
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
                  {filteredNotice.map((notice, index) => {
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
                          <Link to={`/notices-details/${id}`}>
                            <FaEye size={18} color="green" />
                          </Link>
                          <Link to={`/notice/add-notice/${id}`}>
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

export default ViewNotices;
