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

import { selectProjects } from "../../../redux/slice/projectSlice";
import { useValue } from "../../../context/ContextProvider";

const categories = [
  { id: 1, name: "Civil" },
  { id: 2, name: "Electrical" },
  { id: 3, name: "Computer" },
  { id: 4, name: "Electronics" },
  { id: 5, name: "Environment-" },
  
  { id: 6, name: "OTHERS" },
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

const AddProject = () => {
  const { id } = useParams();
  const projects = useSelector(selectProjects);
  const ProjectEdit = projects.find((item) => item.id === id);
  const {
    state: { currentUser },
  } = useValue();

  const [project, setProject] = useState(() => {
    const newState = detectForm(id, { ...initialState }, ProjectEdit);
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
    setProject({ ...project, [name]: value });
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
          setProject({ ...project, imageURL: downloadURL });
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

  const addProject = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "projects"), {
        name: project.name,

        imageURL: project.imageURL,
        dbid: currentUser?.id,
        cretor: currentUser?.photoURL,
        cretorName: currentUser?.name,
        cretorEmail: currentUser?.email,
        category: project.category,
        brand: project.brand,
        desc: project.desc,

        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProject({ ...initialState });

      toast.success("Project uploaded successfully.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/dashboard/all-projects");
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

  const editProject = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (project.imageURL !== ProjectEdit.imageURL) {
      const storageRef = ref(storage, ProjectEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "projects", id), {
        name: project.name,

        imageURL: project.imageURL,
        dbid: currentUser?.id,
        cretor: currentUser?.photoURL,
        cretorName: currentUser?.name,
        cretorEmail:currentUser?.email,
        category: project.category,
        brand: project.brand,
        desc: project.desc,

        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Project Edited Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/dashboard/all-projects");
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
        <h2>{detectForm(id, "Add New Project", "Edit Project")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProject, editProject)}>
            <label>Project Name:</label>
            <input
              type="text"
              placeholder="Project name"
              required
              name="name"
              value={project.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Project image:</label>
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
                placeholder="Project Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {project.imageURL === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder="Image URL"
                  name="imageURL"
                  value={project.imageURL}
                  disabled
                />
              )}
            </Card>

            <label>Project Category:</label>
            <select
              required
              name="category"
              value={project.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose Project category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <label>Project Description</label>
            <textarea
              name="desc"
              required
              value={project.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            ></textarea>
            <label>Project keyword for search:</label>
            <input
              type="text"
              placeholder="Project keyword"
              required
              name="brand"
              value={project.brand}
              onChange={(e) => handleInputChange(e)}
            />

            <button className="--btn --btn-primary">
              {detectForm(id, "Save Project", "Edit Project")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProject;
