import React from "react";
import LoginForm from "../../components/LoginForm";

function Login() {
  return (
    <div
      className={`scrollbar h-screen w-full overflow-y-scroll bg-gray-200 `}
      data-test="outer-container-for-login-page"
    >
      {/* Login form to make authentication */}
      <div data-test="login-form">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
