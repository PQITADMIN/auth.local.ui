import React, { useState } from "react";
import SnackBar from "./shared/SnackBar";
import logo from "../assets/image/logo.svg";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ToolTip from "@mui/material/Tooltip";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../components/shared/axios";
import leftDesign from "../assets/image/left.svg";
import rightDesign from "../assets/image/right.svg";
import Loader from "./shared/Loader";
import Footer from "./shared/Footer";
function ResetPasswordForm() {
  //* a variable to use useNavigate hook
  const navigate = useNavigate();
  const { user_email, token } = useParams();
  //* a variable to store error message
  const [alertMessage, setAlertMessage] = useState({ message: "", type: "" });
  //* a variable to render loader
  const [isLoading, setIsLoading] = useState(false);
  //* a variable to change visibility of password field
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValue: { password: "", confirm_password: "" },
  });
  //* a variable to check for password
  const password = watch("password");

  const onSubmit = handleSubmit(async (formData) => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        `/reset/${user_email}/${token}`,
        formData
      );
      if (result.status === 200) {
        if (result.data.status === "Password Reset Successfull") {
          setIsLoading(false);
          setAlertMessage({
            message: "Password Successfully Changed",
            type: "success",
          });
          setTimeout(() => {
            navigate("/");
          }, 3000);
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
        <div className=" h-12 w-12">
          <img src={logo} className="h-12 w-12" alt="logo" />
        </div>
        <p className="mx-3 -mt-3 text-3xl font-black text-indigo-600 lg:text-4xl">
          ValueStory
        </p>
      </div>
      <div
        className={`mx-auto w-80 max-w-lg rounded-lg bg-white p-5 shadow-xl sm:w-96 sm:p-10 sm:py-6`}
      >
        <form
          className="flex w-full flex-col items-start px-5"
          onSubmit={onSubmit}
        >
          <div className="mb-3 w-full sm:mb-3" data-test="password-div">
            <label
              className={`mb-1 block text-xs font-medium text-gray-900 sm:text-sm`}
              data-test="password-label"
            >
              New Password
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
          <div className="mb-3 w-full sm:mb-6" data-test="password-div">
            <label
              className={`mb-1 block text-xs font-medium text-gray-900 sm:text-sm`}
              data-test="password-label"
            >
              Confirm New Password
            </label>
            <div className="relative flex items-center">
              <input
                type={passwordVisibility ? "text" : "password"}
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  minLength: { value: 8, message: "Min length is 8" },
                  validate: (value) => value === password || "Pasword Mismatch",
                })}
                placeholder="••••••••"
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                autoComplete="off"
                className={`inputLight`}
                data-test="confirm_password_input"
              />
            </div>
            <p
              className="text-xs text-red-500 md:text-sm"
              data-test="confirm_password_error"
            >
              {errors?.confirm_password?.message}
            </p>
          </div>
          <button
            className={`buttonLight`}
            data-test="login-button"
            onClick={onSubmit}
          >
            Reset Password
          </button>
        </form>
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

export default ResetPasswordForm;
