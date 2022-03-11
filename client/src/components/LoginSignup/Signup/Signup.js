import LoginSignupModalHeader from "../LoginSignupModal/LoginSignupModalHeader";
import SignupForm from "./SignupForm";

const Signup = ({ onClose }) => {
  return (
    <>
      <LoginSignupModalHeader title="Sign up" onClose={onClose} />
      <SignupForm onSubmit={() => {}} onClose={onClose} />
    </>
  );
};

export default Signup;
