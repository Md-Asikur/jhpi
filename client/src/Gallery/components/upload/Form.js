import { Add } from "@mui/icons-material";
import { Fab, Input } from "@mui/material";
import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useValue } from "../../../context/ContextProvider";
import { toast } from "react-toastify";



const Form = ({ setFiles }) => {
    const Navigate=useNavigate()
   const {
     dispatch,
     state: {
       currentUser,
     
     },
   } = useValue();
 const fileRef = useRef();
  const handleClick = () => {
    if (!currentUser) {
      return toast.error("Plese Login And Continue")
    }

    fileRef.current.click();
  };

  const handleChange = (e) => {
    setFiles([...e.target.files]);
    fileRef.current.value = null;
  };
  return (
    <form>
      <Input
        type="file"
        inputProps={{ multiple: true }}
        sx={{ display: "none" }}
        inputRef={fileRef}
        onChange={handleChange}
      />
      <Fab color="primary" aria-label="add" onClick={handleClick}>
        <Add fontSize="large" />
      </Fab>
      {/* {currentUser?.role === "admin" ? (
        <Fab color="primary" aria-label="add" onClick={handleClick}>
          <Add fontSize="large" />
        </Fab>
      ) : (
        ""
      )} */}
    </form>
  );
};

export default Form;
