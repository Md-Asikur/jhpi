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

import { selectTeachers } from "../../../redux/slice/teacherSlice";

const categories = [
  { id: 1, name: "Civil" },
  { id: 2, name: "Electrical" },
  { id: 3, name: "Computer" },
  { id: 4, name: "Electronics" },
  { id: 5, name: "Environment" },
  { id: 6, name: "Civil-HEAD" },
  { id: 7, name: "Electrical-HEAD" },
  { id: 8, name: "Computer-HEAD" },
  { id: 9, name: "Electronics-HEAD" },
  { id: 10, name: "Environment-HEAD" },
  { id: 11, name: "Civil-TECH" },
  { id: 12, name: "Electrical-TECH" },
  { id: 13, name: "Computer-TECH" },
  { id: 14, name: "Electronics-TECH" },
  { id: 15, name: "Environment-TECH" },
  { id: 16, name: "Civil-NON-TECH" },
  { id: 17, name: "Electrical-NON-TECH" },
  { id: 18, name: "Computer-NON-TECH" },
  { id: 19, name: "Electronics-NON-TECH" },
  { id: 20, name: "Environment-NON-TECH" },
  { id: 21, name: "Civil-GEST" },
  { id: 22, name: "Electrical-GEST" },
  { id: 23, name: "Computer-GEST" },
  { id: 24, name: "Electronics-GEST" },
  { id: 25, name: "Environment-GEST" },
  { id: 26, name: "PRINCIPAL" },
  { id: 27, name: "SUB-PRINCIPAL" },
];

const initialState = {
  name: "",
 
  join:"",
 
  Email: "",
  Phone: "",
  imageURL: "",
  
  category: "",
  brand: "",
  desc: "",
};

const AddTeacher = () => {
  const { id } = useParams();
  const teachers = useSelector(selectTeachers);
  const teacherEdit = teachers.find((item) => item.id === id);
  console.log(teacherEdit);

  const [teacher, setTeacher] = useState(() => {
    const newState = detectForm(id, { ...initialState }, teacherEdit);
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
    setTeacher({ ...teacher, [name]: value });
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
          setTeacher({ ...teacher, imageURL: downloadURL });
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

  const addTeacher = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "teachers"), {
        name: teacher.name,

       
        join: teacher.join,

        
        Email: teacher.Email,
        Phone: teacher.Phone,
        imageURL: teacher.imageURL,

        category: teacher.category,
        brand: teacher.brand,
        desc: teacher.desc,

        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setTeacher({ ...initialState });

      toast.success("Teacher uploaded successfully.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/teacher/all-teachers");
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

  const editTeacher = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (teacher.imageURL !== teacherEdit.imageURL) {
      const storageRef = ref(storage, teacherEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "teachers", id), {
        name: teacher.name,
       
        join: teacher.join,

      
        Phone: teacher.Phone,
        imageURL: teacher.imageURL,

        category: teacher.category,
        brand: teacher.brand,
        desc: teacher.desc,

        createdAt: teacherEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Teacher Edited Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/teacher/all-teachers");
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
        <h2>{detectForm(id, "Add New Teacher", "Edit Teacher")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addTeacher, editTeacher)}>
            <label>Teacher Name:</label>
            <input
              type="text"
              placeholder="Teacher name"
              required
              name="name"
              value={teacher.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Teacher image:</label>
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
                placeholder="Teacher Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {teacher.imageURL === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder="Image URL"
                  name="imageURL"
                  value={teacher.imageURL}
                  disabled
                />
              )}
            </Card>

            {/* <label>Father's Name:</label>
            <input
              type="text"
              placeholder="father's name"
              required
              name="Father_name"
              value={product.Father_name}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Mother's Name:</label>
            <input
              type="text"
              placeholder="mother's name"
              required
              name="Mother_name"
              value={product.Mother_name}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Date Of Birth:</label>
            <input
              type="text"
              placeholder="birht date"
              required
              name="Date_of_birth"
              value={product.Date_of_birth}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Depertment:</label>
            <input
              type="text"
              placeholder="Depertment"
              required
              name="Depertment"
              value={product.Depertment}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Roll:</label>
            <input
              type="number"
              placeholder="roll"
              required
              name="Roll"
              value={product.Roll}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Registration:</label>
            <input
              type="number"
              placeholder="registration number"
              required
              name="Registration"
              value={product.Registration}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Semester:</label>
            <input
              type="text"
              placeholder="semester"
              required
              name="Semester"
              value={product.Semester}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Shift:</label>
            <input
              type="text"
              placeholder="shift"
              required
              name="Shift"
              value={product.Shift}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Session:</label>
            <input
              type="text"
              placeholder="session"
              required
              name="Session"
              value={product.Session}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Blood Group:</label>
            <input
              type="text"
              placeholder="blood"
              required
              name="Blood"
              value={product.Blood}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Present Address:</label>
            <input
              type="text"
              placeholder="Present Address"
              required
              name="PresentAddress"
              value={product.PresentAddress}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Parmanent Address:</label>
            <input
              type="text"
              placeholder="parmanent address"
              required
              name="ParmanentAddress"
              value={product.ParmanentAddress}
              onChange={(e) => handleInputChange(e)}
            /> */}
            <label>Email Address:</label>
            <input
              type="email"
              placeholder="email address"
              required
              name="Email"
              value={teacher.Email}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Mobile:</label>
            <input
              type="number"
              placeholder="mobile"
              required
              name="Phone"
              value={teacher.Phone}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Teacher Depertment/Category:</label>
            <select
              required
              name="category"
              value={teacher.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose teacher category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <label>Teacher keyword for search:</label>
            <input
              type="text"
              placeholder="Student keyword"
              required
              name="brand"
              value={teacher.brand}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Teacher Description</label>
            <textarea
              name="desc"
              required
              value={teacher.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            ></textarea>
            <label>Join Year</label>
            <input
              type="text"
              placeholder="Join Year"
              required
              name="join"
              value={teacher.join}
              onChange={(e) => handleInputChange(e)}
            />

            <button className="--btn --btn-primary">
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddTeacher;
