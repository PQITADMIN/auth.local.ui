import React from "react";

function Footer() {
  return (
    <div className="space-y-1">
      <div
        className="mx-auto flex w-max space-x-3 text-xs md:space-x-5"
        data-test="nav-links"
      >
        <p
          className={`cursor-pointer font-bold text-indigo-500  hover:text-indigo-600`}
          //   onClick={() => navigate("/forgot_password")}
          data-test="forgot-password-link"
        >
          Legal
        </p>
        <p
          className={`cursor-pointer font-bold text-indigo-500  hover:text-indigo-600`}
          //   onClick={() => navigate("/privacy_policy")}
          data-test="privacy-policy-link"
        >
          Privacy
        </p>
        <p
          className={`cursor-pointer font-bold text-indigo-500  hover:text-indigo-600`}
          //   onClick={() => navigate("/privacy_policy")}
          data-test="privacy-policy-link"
        >
          Cookies
        </p>
      </div>
      <div className="mx-auto flex w-max text-xs font-bold text-indigo-500">
        © 2019-2022 PharmaQuant Insights Pvt. Ltd. All rights reserved
      </div>
    </div>
  );
}

export default Footer;
