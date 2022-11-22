import React from "react";
import { useLocation } from "react-router-dom";
import CheckAuth from "./shared/CheckAuth";
import logo from "../assets/image/logo.svg";
import leftDesign from "../assets/image/left.svg";
import rightDesign from "../assets/image/right.svg";
import Footer from "./shared/Footer";
function ForgotPasswordSuccess() {
  const location = useLocation();

  return (
    <div className="scrollbar relative flex h-screen w-full flex-col items-center justify-center overflow-y-scroll bg-gray-200 ">
      <CheckAuth data={location} />
      <div className="flex flex-row items-center p-5 pb-3 pt-0">
        <div className="h-12 w-12">
          <img src={logo} className="h-12 w-12" alt="logo" />
        </div>
        <p className="mx-3 -mt-3 text-3xl font-black text-indigo-600 lg:text-4xl">
          ValueStory
        </p>
      </div>
      <div
        className={`mx-auto w-80 max-w-lg space-y-3 rounded-lg bg-white p-5 shadow-xl sm:w-96 sm:p-10 sm:py-6 `}
      >
        <h1 className="text-2xl font-semibold">Reset Your Password</h1>
        <p className="text-base">
          We sent a reset password email to{" "}
          <span className="font-semibold">{location?.state?.email}</span>.
          <br />
          Please click the reset password link to set your new password.
          <br />
        </p>
        <p className="text-base">Haven't you receive the email yet?</p>
        <p>
          Please check your spam folder, or{" "}
          <a
            href="/forgot_password"
            className="text-indigo-600 underline hover:text-indigo-500"
          >
            try again
          </a>
        </p>
      </div>
      <div className="absolute bottom-0 left-0 hidden sm:inline-flex">
        <img
          src={leftDesign}
          alt="leftDesign"
          className="h-60 w-60 lg:h-80 lg:w-80 xl:h-96 xl:w-96"
        />
      </div>
      <div className="absolute  right-0 bottom-0 hidden md:inline-flex">
        <img
          src={rightDesign}
          alt="rightDesign"
          className="h-60 w-60 lg:h-80 lg:w-80 xl:h-96 xl:w-96"
        />
      </div>
      <div className="absolute bottom-0">
        <Footer />
      </div>
    </div>
  );
}

export default ForgotPasswordSuccess;
