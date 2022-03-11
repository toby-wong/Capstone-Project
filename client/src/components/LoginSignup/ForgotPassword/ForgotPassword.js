import LoginSignupModalHeader from "../LoginSignupModal/LoginSignupModalHeader";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPassword = ({ onClose, onBack }) => {
  return (
    <>
      <LoginSignupModalHeader
        title="Forget Password"
        onBack={onBack}
        onClose={onClose}
      />
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPassword;
