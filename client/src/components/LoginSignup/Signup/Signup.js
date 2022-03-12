import LoginSignupModalHeader from "../LoginSignupModal/LoginSignupModalHeader";
import SignupForm from "./SignupForm";

import * as config from "../../../config";

const Signup = ({ onClose }) => {
  const signupFormSubmitHandler = async (formData) => {
    const response = await fetch(`${config.SERVER_URL}/api/auth/register/`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };
  return (
    <>
      <LoginSignupModalHeader title="Sign up" onClose={onClose} />
      <SignupForm onSubmit={signupFormSubmitHandler} onClose={onClose} />
    </>
  );
};

export default Signup;
