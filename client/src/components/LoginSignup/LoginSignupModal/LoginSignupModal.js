import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import ForgotPasswordForm from "../ForgotPassword/ForgotPasswordForm";
import LoginForm from "../Login/LoginForm";
import SignupForm from "../Signup/SignupForm";
import SignupSuccess from "../SignupSuccess/SignupSuccess";

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

  const modalCloseHandler = () => {
    onClose();
  };

  const backToLoginFormHandler = (e) => {
    navigate("/login");
  };

  return (
    <GeneralModal
      open={open}
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
              onClose={modalCloseHandler}
              onBack={backToLoginFormHandler}
            />
          }
        />
      </Routes>
    </GeneralModal>
  );
};

export default LoginSignupModal;
