import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CompanyCard from "../../components/CompanyCard";
import Loader from "../../components/shared/Loader";
import SnackBar from "../../components/shared/SnackBar";
import logo from "../../assets/image/logo.svg";
import CheckAuth from "../../components/shared/CheckAuth";
import Footer from "../../components/shared/Footer";
function SelectCompanies() {
  const location = useLocation();
  //* a variable to store error message
  const [alertMessage, setAlertMessage] = useState({ message: "", type: "" });
  //* a variable to render loader
  const [isLoading, setIsLoading] = useState(false);

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
    <div
      className={`scrollbar flex h-screen w-full flex-col items-center justify-center overflow-y-scroll bg-gray-200 `}
      data-test="outer-container-for-login-page"
    >
      {alertMessage.message && (
        <div data-test="alert-message">
          <SnackBar message={alertMessage} setAlertMessage={setAlertMessage} />
        </div>
      )}
      <CheckAuth data={location} />
      <div className="flex flex-row items-center justify-center p-5 pb-3 pt-0">
        <div className="h-12 w-12">
          <img src={logo} className="h-12 w-12" alt="logo" />
        </div>
        <p className="mx-3 -mt-3 text-3xl font-black text-indigo-600 lg:text-4xl">
          ValueStory
        </p>
      </div>
      <h1 className="text-3xl font-semibold sm:text-6xl">
        Select Your Company
      </h1>
      {/* Login form to make authentication */}
      <div className="scrollbar h-96 w-full overflow-y-scroll">
        <div
          data-test="login-form"
          className="flex w-full flex-col items-center"
        >
          {location?.state?.companies?.map((company, index) => (
            <CompanyCard
              key={index}
              data={company}
              token={location.state.token}
              setAlertMessage={setAlertMessage}
              setIsLoading={setIsLoading}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0">
        <Footer />
      </div>
      {renderLoading()}
    </div>
  );
}

export default SelectCompanies;
