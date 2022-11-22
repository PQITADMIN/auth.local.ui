import React from "react";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";
function ForgotPassword() {
  return (
    <div
      className={`scrollbar h-screen w-full overflow-y-scroll bg-gray-200 `}
      data-test="outer-container-for-login-page"
    >
      {/* Login form to make authentication */}
      <div data-test="login-form">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}

export default ForgotPassword;
