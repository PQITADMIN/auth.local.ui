import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "./shared/Loader";
import SnackBar from "./shared/SnackBar";
import axios from "../components/shared/axios";
import leftDesign from "../assets/image/left.svg";
import rightDesign from "../assets/image/right.svg";
import logo from "../assets/image/logo.svg";
import Footer from "./shared/Footer";
function ForgotPassword() {
  //* a variable to use useNavigate hook
  const navigate = useNavigate();
  //* a variable to render loader
  const [isLoading, setIsLoading] = useState(false);
  //* a variable to store error message
  const [alertMessage, setAlertMessage] = useState({ message: "", type: "" });
  //* various constants to use in the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValue: { username: "", password: "" },
  });
  //* a function to handle form Submit
  const onSubmit = handleSubmit(async (formData) => {
    try {
      setIsLoading(true);

      const result = await axios.get(`/forgot_password/${formData.username}`);
      if (result.status === 200) {
        if (result.data.status === 200) {
          setIsLoading(false);
          navigate("/forgot_password_success", {
            state: {
              email: formData.username,
            },
          });
        } else {
          setIsLoading(false);
          setAlertMessage({
            message: result.data.message,
            type: "error",
          });
        }
      } else {
        setIsLoading(false);
        setAlertMessage({
          message: result.data.message,
          type: "error",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setAlertMessage({
        message: "Server Error",
        type: "error",
      });
    }
  });

  const renderLoading = () => {
    if (isLoading) {
      return (
        <div data-test="loader">
          <Loader />
        </div>
      );
    }
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      {alertMessage.message && (
        <div data-test="alert-message">
          <SnackBar message={alertMessage} setAlertMessage={setAlertMessage} />
        </div>
      )}
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
        <p className="text-2xl font-semibold">Forgot your Password?</p>
        <p className=" text-sm">
          Don't worry. Resetting your password is easy. Just tell us your
          registered email address.
        </p>
        <form onSubmit={onSubmit}>
          <input
            data-test="username-input"
            {...register("username", {
              required: "Email is required",
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "Invalid email",
              },
            })}
            type="email"
            placeholder="Ex. james@bond.com"
            autoComplete="off"
            className={`inputLight`}
          />
        </form>
        <p
          className="text-xs text-red-500 md:text-sm"
          data-test="username-error"
        >
          {errors?.username?.message}
        </p>
        <button className={`buttonLight`} onClick={onSubmit}>
          Send
        </button>
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
      {renderLoading()}
    </div>
  );
}

export default ForgotPassword;
