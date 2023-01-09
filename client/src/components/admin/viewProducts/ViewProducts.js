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
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { useValue } from "../../../context/ContextProvider";

const ViewProducts = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
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

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Product deleted successfully.", {
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
      });
    }
  };
  const {
    state: { currentUser },
  } = useValue();

  const filteredStudents = products.filter((student) => student.dbid === currentUser?.id);
  console.log(filteredStudents);
  return (
    <>
      {currentUser?.role === "admin" ? (
        <>
          {" "}
          {isLoading && <Loader />}
          <div className={styles.table}>
            <h2>All Students</h2>
            <h1
              style={{
                textAlign: "center",
                fontSize: "2.2rem",
                padding: "10px 10px",
              }}
            >
              <Link
                to="/admin/add-Student/ADD"
                style={{ textAlign: "center", fontSize: "2.2rem" }}
              >
                Add New Student
              </Link>
            </h1>
            {products.length === 0 ? (
              <p>No Student found.</p>
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
                  {products.map((product, index) => {
                    const { id, name, imageURL, category, cretor, cretorName } = product;
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
                          <Link to={`/student-details/${id}`}>
                            <FaEye size={18} color="green" />
                          </Link>
                          <Link to={`/admin/add-student/${id}`}>
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
            <h2>All Students Created By Me</h2>
            <h1
              style={{
                textAlign: "center",
                fontSize: "2.2rem",
                padding: "10px 10px",
              }}
            >
              <Link
                to="/admin/add-Student/ADD"
                style={{ textAlign: "center", fontSize: "2.2rem" }}
              >
                Add New Student
              </Link>
            </h1>
            {filteredStudents.length === 0 ? (
              <p>No My Created Student found.</p>
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
                  {filteredStudents.map((product, index) => {
                    const { id, name, imageURL, category, cretor, cretorName } = product;
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
                          <Link to={`/student-details/${id}`}>
                            <FaEye size={18} color="green" />
                          </Link>
                          <Link to={`/admin/add-student/${id}`}>
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

export default ViewProducts;
