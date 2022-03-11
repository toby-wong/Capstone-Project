const LoginSignupModalForm = ({ children, onSubmit }) => {
  return (
    <form
      style={{ flex: 1, display: "flex", flexDirection: "column" }}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default LoginSignupModalForm;
