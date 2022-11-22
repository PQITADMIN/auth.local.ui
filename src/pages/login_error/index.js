import React from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
function LoginError() {
  const navigate = useNavigate();
  return (
    <div
      className={`scrollbar flex h-screen w-full items-center justify-center overflow-y-scroll bg-gray-300 `}
      data-test="outer-container-for-login-page"
      onClick={() => {
        navigate("/");
      }}
    >
      {/* Login error dialog*/}
      <div
        data-test="login-form"
        className="h-2/6 max-h-[350px] w-3/5 max-w-[650px] overflow-hidden rounded-xl bg-white shadow-2xl"
      >
       
        <div className="flex h-1/2 flex-col items-center justify-center bg-red-400">
          <CancelOutlinedIcon
            className="text-white"
            sx={{
              fontSize: "3rem",
            }}
          />
        </div>
        <div className="flex h-1/2 flex-col items-center justify-center">
          <h1 className="text-center text-lg font-bold sm:text-2xl">
            {" "}
            SORRY :(
          </h1>
          <h1 className="px-3 text-center text-sm sm:px-0 sm:text-base">
            Seems you haven't logged in. Please try again.
          </h1>
          <div
            className="m-3 flex cursor-pointer flex-row items-center justify-center space-x-2 rounded-full bg-red-500 px-3 py-1 text-white hover:opacity-80"
            onClick={() => {
              navigate("/");
            }}
          >
            <CloseIcon
              className="text-white"
              sx={{
                fontSize: "1.5rem",
              }}
            />
            <p className="text-center text-sm sm:text-base">Close</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginError;
