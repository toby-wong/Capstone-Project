import Navbar from "../Navbar/Navbar";
import classes from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={classes.root}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
