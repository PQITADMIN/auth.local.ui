import React from "react";
import Avatar from "@mui/material/Avatar";
import axios from "./shared/axios";
import { useNavigate } from "react-router-dom";
function CompanyCard({ data, token, setAlertMessage, setIsLoading }) {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const handleCreateToken = async () => {
    setIsLoading(true);
    const result = await axios.post("/create_token", {
      username: email,
      company: data.company_name,
      token: token,
    });
    if (result.status === 200) {
      if (result.data.status) {
        setIsLoading(false);
        setAlertMessage({
          message: result.data.message,
          type: "error",
        });
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      } else {
        const d = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        let domainQa = "domain=valuestory.io";
        // let domain = "domain=localhost";
        document.cookie = `data=${JSON.stringify(
          result.data
        )};${expires};${domainQa}`;
        window.open(`http://${data.domain}`, "_self");
        // window.open(`http://localhost:3001`, "_self");
        setIsLoading(false);
        // navigate("/", { replace: true });
      }
    } else {
      setIsLoading(false);
      setAlertMessage({
        message: result.data.message,
        type: "error",
      });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    }
  };
  return (
    <div className="m-2 mt-5 flex w-80 transform cursor-pointer items-center space-x-4 rounded-md bg-white p-3 shadow-lg transition duration-200 ease-out hover:scale-105 hover:bg-gray-100 sm:min-w-[450px]">
      <Avatar sx={{ bgcolor: "#4f46e5" }}>
        {data.company_name.slice(0, 1)}
      </Avatar>
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-sm">{data.company_name}</h1>
          {/* <img src={logo} alt="" className="w-52 h-12" /> */}
          <p className="text-sm text-gray-500">{data.domain}</p>
        </div>
        <button
          className="absolute right-2 rounded-md border border-gray-300 py-1 px-2 sm:right-4"
          onClick={(e) => {
            handleCreateToken();
          }}
        >
          Open
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;
