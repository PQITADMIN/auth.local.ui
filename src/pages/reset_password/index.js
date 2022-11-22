import React from "react";
import ResetPasswordForm from "../../components/ResetPasswordForm";

function ResetPassword() {
  return (
    <div
      className={`scrollbar h-screen w-full overflow-y-scroll bg-gray-200 `}
      data-test="outer-container-for-login-page"
    >
      <ResetPasswordForm />
      
    </div>
  );
}

export default ResetPassword;
