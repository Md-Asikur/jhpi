import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import styles from "./AddProduct.module.scss";

import { selectNotices } from "../../../redux/slice/noticeSlice";

const categories = [

  { id: 1, name: "Result" },
  { id: 2, name: "Class Routine" },
  { id: 3, name: "Exam Routine" },
  { id: 4, name: "Rate Of Passing" },

  { id: 5, name: "Civil-1st-shift" },
  { id: 6, name: "Electrical-1st-shift" },
  { id: 7, name: "Computer-1st-shift" },
  { id: 8, name: "Electronics-1st-shift" },
  { id: 9, name: "Environment-1st-shift" },
  { id: 10, name: "Civil-2nd-shift" },
  { id: 11, name: "Electrical-2nd-shift" },
  { id: 12, name: "Computer-2nd-shift" },
  { id: 13, name: "Electronics-2nd-shift" },
  { id: 14, name: "Environment-2nd-shift" },
];

const initialState = {
  name: "",

  date:"",
  imageURL: "",

  category: "",
  brand: "",
  desc: ""
  
};

const AddNotice = () => {
  const { id } = useParams();
  const notices = useSelector(selectNotices);
  const noticeEdit = notices.find((item) => item.id === id);
 

  const [notice, setNotice] = useState(() => {
    const newState = detectForm(id, { ...initialState }, noticeEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNotice({ ...notice, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);

    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setNotice({ ...notice, imageURL: downloadURL });
          toast.success("Image uploaded successfully.", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
      }
    );
  };

  const addNotice = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "notices"), {
        name: notice.name,

        date: notice.date,

      
        imageURL: notice.imageURL,

        category: notice.category,
        brand: notice.brand,
        desc: notice.desc,
      
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setNotice({ ...initialState });

      toast.success("Notice uploaded successfully.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/notice/all-notices");
    } catch (error) {
      setIsLoading(false);
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

  const editNotice = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (notice.imageURL !== noticeEdit.imageURL) {
      const storageRef = ref(storage, noticeEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "notices", id), {
        name: notice.name,

        date: notice.date,

        imageURL: notice.imageURL,

        category: notice.category,
        brand: notice.brand,
        desc: notice.desc,

        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Notice Edited Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/notice/all-notices");
    } catch (error) {
      setIsLoading(false);
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

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Add New Notice", "Edit Notice")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addNotice, editNotice)}>
            <label>Notice Name:</label>
            <input
              type="text"
              placeholder="Notice name"
              required
              name="name"
              value={notice.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Notice image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="Notice Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {notice.imageURL === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder="Image URL"
                  name="imageURL"
                  value={notice.imageURL}
                  disabled
                />
              )}
            </Card>

           
            <label>Notice Category:</label>
            <select
              required
              name="category"
              value={notice.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose notice category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            

            <label>Notice Description</label>
            <textarea
              name="desc"
              required
              value={notice.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            ></textarea>
            <label>Notice keyword for search:</label>
            <input
              type="text"
              placeholder="Notice keyword"
              required
              name="brand"
              value={notice.brand}
              onChange={(e) => handleInputChange(e)}
            />
          
            <label>Notice Date</label>
            <input
              type="text"
              placeholder="notice date"
              required
              name="date"
              value={notice.date}
              onChange={(e) => handleInputChange(e)}
            />

            <button className="--btn --btn-primary">
              {detectForm(id, "Save Notice", "Edit Notice")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddNotice;
