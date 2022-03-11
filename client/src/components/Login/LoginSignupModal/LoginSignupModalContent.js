const LoginSignupModalContent = ({ children }) => {
  return (
    <div
      style={{
        flex: 1,
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
};

export default LoginSignupModalContent;
