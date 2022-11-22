import React from "react";
import SignupVerify from "../../components/SignupVerify";

function Signup() {
  return (
    <div
      className={`scrollbar h-screen w-full overflow-y-scroll bg-gray-200 `}
      data-test="outer-container-for-login-page"
    >
      {/* Login form to make authentication */}
      <div data-test="login-form">
        <SignupVerify />
      </div>
    </div>
  );
}

export default Signup;
