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

import { selectEntertainments } from "../../../redux/slice/EnterSlice";
import { useValue } from "../../../context/ContextProvider";

const categories = [
  { id: 1, name: "Sporting Events" },
  { id: 2, name: "Tv Shows" },
  { id: 3, name: "Books" },
  { id: 4, name: "Fairs" },
  { id: 5, name: "Festivals" },
  { id: 6, name: "Games" },
  { id: 7, name: "Music" },
  { id: 8, name: "Movies" },
  { id: 9, name: "Comedy Clubs" },
  { id: 10, name: "Circus" },
  { id: 11, name: "Concerts" },
  { id: 12, name: "Travel" },
  { id: 13, name: "Study Tour" },
  { id: 14, name: "Road Trips" },
  { id: 15, name: "Writing" },
  { id: 16, name: "Others" },
];

const initialState = {
  name: "",

  imageURL: "",

  category: "",
  brand: "",
  desc: "",

  dbid: "",
  cretor: "",
  cretorName: "",
  cretorEmail: "",
};

const AddEnter = () => {
  const { id } = useParams();
  const entertainments = useSelector(selectEntertainments);
  const EnterEdit = entertainments.find((item) => item.id === id);
  const {
    state: { currentUser },
  } = useValue();

  const [entertainment, setEnter] = useState(() => {
    const newState = detectForm(id, { ...initialState }, EnterEdit);
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
    setEnter({ ...entertainment, [name]: value });
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
          setEnter({ ...entertainment, imageURL: downloadURL });
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

  const addTEnter = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "entertainments"), {
        name: entertainment.name,

        imageURL: entertainment.imageURL,
        dbid: currentUser?.id,
        cretor: currentUser?.photoURL,
        cretorName: currentUser?.name,
        cretorEmail: currentUser?.email,
        category: entertainment.category,
        brand: entertainment.brand,
        desc: entertainment.desc,

        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setEnter({ ...initialState });

      toast.success("Entertainment uploaded successfully.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/dashboard/all-entertainments");
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

  const editEnter = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (entertainment.imageURL !== EnterEdit.imageURL) {
      const storageRef = ref(storage, EnterEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "entertainments", id), {
        name: entertainment.name,

        imageURL: entertainment.imageURL,
        dbid: currentUser?.id,
        cretor: currentUser?.photoURL,
        cretorName: currentUser?.name,
        cretorEmail: currentUser?.email,
        category: entertainment.category,
        brand: entertainment.brand,
        desc: entertainment.desc,

        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Entertainment Edited Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/dashboard/all-entertainments");
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
      <div className={styles.enter}>
        <h2>{detectForm(id, "Add New Entertainment", "Edit Entertainment")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addTEnter, editEnter)}>
            <label>Entertainment Name:</label>
            <input
              type="text"
              placeholder="Entertainment name"
              required
              name="name"
              value={entertainment.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Entertainment image:</label>
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
                placeholder="Entertainment Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {entertainment.imageURL === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder="Image URL"
                  name="imageURL"
                  value={entertainment.imageURL}
                  disabled
                />
              )}
            </Card>

            <label>Entertainment Category:</label>
            <select
              required
              name="category"
              value={entertainment.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose entertainment category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <label>Entertainment Description</label>
            <textarea
              name="desc"
              required
              value={entertainment.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            ></textarea>
            <label>Entertainment keyword for search:</label>
            <input
              type="text"
              placeholder="Entertainment keyword"
              required
              name="brand"
              value={entertainment.brand}
              onChange={(e) => handleInputChange(e)}
            />

            <button className="--btn --btn-primary">
              {detectForm(id, "Save Entertainment", "Edit Entertainment")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddEnter;
