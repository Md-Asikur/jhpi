import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../../redux/slice/authSlice";
import { useValue } from "../../context/ContextProvider";
const AdminOnlyRoute = ({ children }) => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  const userEmail = useSelector(selectEmail);

  if (currentUser?.role === "admin" || currentUser) {
    return children;
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied.</h2>
        <p>This page can only be view by an Admin user or Login User.</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Back To Home</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "test@gmail.com") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
