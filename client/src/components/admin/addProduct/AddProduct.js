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
import { selectProducts } from "../../../redux/slice/productSlice";
import { useValue } from "../../../context/ContextProvider";

const categories = [
  { id: 1, name: "Civil" },
  { id: 2, name: "Electrical" },
  { id: 3, name: "Computer" },
  { id: 4, name: "Electronics" },
  { id: 5, name: "Environment" }
  
];

const initialState = {
  name: "",
  Father_name: "",
  Mother_name: "",
  Date_of_birth: "",
  Shift: "",
  Semester: "",
  Roll: "",
  Registretion: "",
  Session: "",
  PresentAddress: "",
  ParmanentAddress: "",
  join: "",
  Roll: "",
  Blood: "",
  Depertment: "",
  Email: "",
  Phone: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
  dbid: "",
  cretor:"",
  cretorName:"",
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  const {
    state: { currentUser },
  } = useValue();

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
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
    setProduct({ ...product, [name]: value });
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
          setProduct({ ...product, imageURL: downloadURL });
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

  const addProduct = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,

        Father_name: product.Father_name,
        Mother_name: product.Mother_name,
        Date_of_birth: product.Date_of_birth,
        Shift: product.Shift,
        Semester: product.Semester,
        Roll: product.Roll,
        Registration: product.Registration,
        Session: product.Session,
        PresentAddress: product.PresentAddress,
        ParmanentAddress: product.ParmanentAddress,
        join: product.join,

        Blood: product.Blood,
        Depertment: product.Depertment,
        Email: product.Email,
        Phone: product.Phone,
        imageURL: product.imageURL,
        dbid: currentUser?.id,
        cretor: currentUser?.photoURL,
        cretorName: currentUser?.name,
        category: product.category,
        brand: product.brand,
        desc: product.desc,

        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      toast.success("Product uploaded successfully.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/admin/all-students");
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

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        Father_name: product.Father_name,
        Mother_name: product.Mother_name,
        Date_of_birth: product.Date_of_birth,
        Shift: product.Shift,
        Semester: product.Semester,
        Roll: Number(product.Roll),
        Registration: Number(product.Registration),
        Session: product.Session,
        PresentAddress: product.PresentAddress,
        ParmanentAddress: product.ParmanentAddress,
        join: product.join,

        Blood: product.Blood,
        Depertment: product.Depertment,
        Email: product.Email,
        Phone: product.Phone,
        imageURL: product.imageURL,

        category: product.category,
        brand: product.brand,
        desc: product.desc,
        dbid: currentUser?.id,
        cretor: currentUser?.photoURL,
        cretorName: currentUser?.name,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product Edited Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/admin/all-students");
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
        <h2>{detectForm(id, "Add New Student", "Edit Student")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Student Name:</label>
            <input
              type="text"
              placeholder="Student name"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Student image:</label>
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
                placeholder="Student Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder="Image URL"
                  name="imageURL"
                  value={product.imageURL}
                  disabled
                />
              )}
            </Card>

            <label>Father's Name:</label>
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
            />
            <label>Email Address:</label>
            <input
              type="email"
              placeholder="email address"
              required
              name="Email"
              value={product.Email}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Mobile:</label>
            <input
              type="number"
              placeholder="mobile"
              required
              name="Phone"
              value={product.Phone}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Student Depertment/Category:</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose student category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <label>Student keyword for search:</label>
            <input
              type="text"
              placeholder="Student keyword"
              required
              name="brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Student Description</label>
            <textarea
              name="desc"
              required
              value={product.desc}
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
              value={product.join}
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

export default AddProduct;
