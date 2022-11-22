import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "./axios";
const CheckAuth = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (data.state === null) {
      // alert("User not logged in ");
      navigate("/login_error");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div></div>;
};

export default CheckAuth;
