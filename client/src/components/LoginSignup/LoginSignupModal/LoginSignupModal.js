import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import ForgotPasswordForm from "../ForgotPassword/ForgotPasswordForm";
import ForgotPasswordFormSuccess from "../ForgotPassword/ForgotPasswordFormSuccess";
import LoginForm from "../Login/LoginForm";
import ResetPasswordForm from "../ResetPassword/ResetPasswordForm";
import SignupForm from "../Signup/SignupForm";
import SignupSuccess from "../Signup/SignupSuccess";

const LoginSignupModal = ({ open, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const signupClickHandler = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const forgotPasswordClickHandler = (e) => {
    e.preventDefault();
    navigate("/forgotPassword");
  };

  const signupFormSubmitHandler = () => {
    navigate("/signupSuccess");
  };

  const forgotPasswordFormSubmitHandler = () => {
    navigate("/passwordResetEmailSent");
  };

  const resetPasswordFormSubmitHandler = () => {
    navigate("/resetPasswordSuccess");
  };

  const modalCloseHandler = () => {
    onClose();
  };

  const backToLoginFormHandler = (e) => {
    navigate("/login");
  };

  return (
    <GeneralModal
      open={open || location.pathname.includes("api/password/reset/confirm")}
      onClose={modalCloseHandler}
      height={location.pathname === "/signup" ? "580px" : "500px"}
      width={location.pathname === "/signup" ? "900px" : "500px"}
      flexDirection="column"
    >
      <Routes>
        <Route
          path="login"
          element={
            <LoginForm
              onClose={onClose}
              onClickSignup={signupClickHandler}
              onClickForgotPassword={forgotPasswordClickHandler}
            />
          }
        />
        <Route
          path="signup"
          element={
            <SignupForm
              onSubmit={signupFormSubmitHandler}
              onClose={modalCloseHandler}
            />
          }
        />
        <Route
          path="signupSuccess"
          element={<SignupSuccess onClose={modalCloseHandler} />}
        />
        <Route
          path="forgotPassword"
          element={
            <ForgotPasswordForm
              onSubmit={forgotPasswordFormSubmitHandler}
              onClose={modalCloseHandler}
              onBack={backToLoginFormHandler}
            />
          }
        />
        <Route
          path="passwordResetEmailSent"
          element={<ForgotPasswordFormSuccess onClose={modalCloseHandler} />}
        />
        <Route
          path="api/password/reset/confirm/:uid/:token"
          element={
            <ResetPasswordForm
              onSubmit={resetPasswordFormSubmitHandler}
              onClose={modalCloseHandler}
            />
          }
        />
      </Routes>
    </GeneralModal>
  );
};

export default LoginSignupModal;
