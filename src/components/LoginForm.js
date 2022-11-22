import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loader from "./shared/Loader";
import SnackBar from "./shared/SnackBar";
import ToolTip from "@mui/material/Tooltip";
// import { VALUE_STORY } from "../config";
import axios from "../components/shared/axios";
import leftDesign from "../assets/image/left.svg";
import rightDesign from "../assets/image/right.svg";
import logo from "../assets/image/logo.svg";
import Footer from "./shared/Footer";
/**@file LoginForm.js hold the form for the login page. */

/*
 * @function LoginForm is a functional component that renders the login form.
 */
function LoginForm() {
  //* a variable to use useNavigate hook
  const navigate = useNavigate();
  //* a variable to change visibility of password field
  const [passwordVisibility, setPasswordVisibility] = useState(false);
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
      const result = await axios.post("/login", formData);
      if (result.status === 200) {
        if (!result.data.status) {
          setIsLoading(false);
          localStorage.setItem("email", formData.username);
          navigate("/select_company", {
            state: {
              token: result.data.token,
              companies: result.data.company,
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

      <div
        className="flex flex-row items-center p-5 pb-3 pt-0"
        initial={{ opacity: 1, scale: 1, y: 150 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 4,
          delay: 0,
          type: "spring",
          stiffness: 20,
        }}
      >
        <div className="h-12 w-12">
          <img src={logo} className="h-12 w-12" alt="logo" />
        </div>
        <p
          className="mx-3 -mt-3 text-3xl font-black text-indigo-600 lg:text-4xl"
          exit={{ ease: "backOut" }}
        >
          ValueStory
        </p>
      </div>

      <div className="flex flex-col items-center justify-center overflow-x-hidden">
        <div
          className={`mx-auto w-80 max-w-lg rounded-lg bg-white p-5 shadow-xl sm:w-96 sm:p-10 sm:py-6`}
        >
          <h1
            className={`mb-4 text-left text-xl font-semibold `}
            data-test="login-text"
          >
            Log In
          </h1>
          <form
            data-test="login-form-div"
            className="flex w-full flex-col items-start"
            onSubmit={onSubmit}
          >
            <div className="mb-2 w-full sm:mb-3" data-test="username-div">
              <label
                className={`mb-1 block text-xs font-medium text-gray-900 sm:text-sm`}
                data-test="username-label"
              >
                Your Email
              </label>
              <input
                data-test="username-input"
                autoFocus={true}
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
              <p
                className="text-xs text-red-500 md:text-sm"
                data-test="username-error"
              >
                {errors?.username?.message}
              </p>
            </div>
            <div className="mb-3 w-full sm:mb-6" data-test="password-div">
              <label
                className={`mb-1 block text-xs font-medium text-gray-900 sm:text-sm`}
                data-test="password-label"
              >
                Your Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Min length is 8" },
                  })}
                  placeholder="••••••••"
                  autoComplete="off"
                  className={`inputLight`}
                  data-test="password-input"
                />
                <div
                  className="absolute right-5"
                  data-test="password-visible-icon"
                >
                  {passwordVisibility ? (
                    <ToolTip title="Hide Password">
                      <div
                        data-test="password-hidden"
                        onClick={() => {
                          setPasswordVisibility(false);
                        }}
                      >
                        <VisibilityOff className="cursor-pointer text-gray-500 hover:text-black" />
                      </div>
                    </ToolTip>
                  ) : (
                    <ToolTip title="Show Password">
                      <div
                        data-test="password-shown"
                        onClick={() => {
                          setPasswordVisibility(true);
                        }}
                      >
                        <Visibility className="cursor-pointer text-gray-500 hover:text-black" />
                      </div>
                    </ToolTip>
                  )}
                </div>
              </div>
              <p
                className="text-xs text-red-500 md:text-sm"
                data-test="password-error"
              >
                {errors?.password?.message}
              </p>
            </div>
            <button
              className={`buttonLight`}
              data-test="login-button"
              onClick={onSubmit}
            >
              Login
            </button>
          </form>
        </div>
        <div
          className="mt-5 flex w-max space-x-3 text-xs md:space-x-5"
          data-test="nav-links"
        >
          <p
            className={`cursor-pointer font-bold text-indigo-500 underline hover:text-indigo-600`}
            onClick={() => navigate("/forgot_password")}
            data-test="forgot-password-link"
          >
            Forgot password
          </p>
          <p
            className={`cursor-pointer font-bold text-indigo-500 underline hover:text-indigo-600`}
            onClick={() => navigate("/privacy_policy")}
            data-test="privacy-policy-link"
          >
            Privacy & Policy
          </p>
        </div>
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

export default LoginForm;
