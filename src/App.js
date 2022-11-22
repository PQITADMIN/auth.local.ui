import Login from "./pages/login";
import Companies from "./pages/companies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/forgot_password";
import PrivacyPolicy from "./pages/privacy_policy";
import NotFound from "./pages/not_found";
import LoginError from "./pages/login_error";
import ForgotPasswordSuccess from "./components/ForgotPasswordSuccess";
import ResetPassword from "./pages/reset_password";
import SignupVerify from "./pages/signup_verify";

function App() {
  return (
    /**  * BrowserRouter is used to enable routing in the browser
     * It stores the current location in the browser's address bar using clean URLs and navigates using the browser's built-in history stack.
     */
    <BrowserRouter>
      {/* //* It is a context provider that supplies routing information to the rest
   //* of the app */}
      <Routes>
        {/* //* Default route or Login Route */}
        <Route path="/" element={<Login />} />
        <Route path="/select_company" element={<Companies />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />

        <Route
          path="/forgot_password_success"
          element={<ForgotPasswordSuccess />}
        />
        <Route
          path="/verify-forgot-password/:user_email/:token"
          element={<ResetPassword />}
        />
        <Route
          path="/verify-invite/:user_email/:token"
          element={<SignupVerify />}
        />
        <Route path="/privacy_policy" element={<PrivacyPolicy />} />
        <Route path="/login_error" element={<LoginError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
