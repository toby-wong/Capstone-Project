import { Paper, Tab, Tabs } from "@mui/material";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import classes from "./Account.module.css";

import { Link, Route, Routes, useLocation } from "react-router-dom";
import AccountDetails from "./AccountDetails/AccountDetails";

const Account = (props) => {
  const location = useLocation();
  const activeTab = location.pathname.split("/").slice(2).join("/");

  return (
    <Paper className={classes.body}>
      <Tabs
        className={classes["navbar"]}
        value={activeTab}
        orientation="vertical"
      >
        <Tab
          className={classes.navbar__tab}
          component={Link}
          to="details"
          value="details"
          label="Account Details"
          icon={<ManageAccountsOutlinedIcon className={classes["tab-icon"]} />}
          iconPosition="start"
        />

        <Tab
          className={classes.navbar__tab}
          component={Link}
          to="history/consumer"
          value="history/consumer"
          label="Consumer History"
          icon={<ManageSearchOutlinedIcon className={classes["tab-icon"]} />}
          iconPosition="start"
        />
        <Tab
          className={classes.navbar__tab}
          component={Link}
          to="history/provider"
          value="history/provider"
          label="Provider History"
          icon={<FavoriteBorderOutlinedIcon className={classes["tab-icon"]} />}
          iconPosition="start"
        />

        <Tab
          className={classes.navbar__tab}
          component={Link}
          to="favourites"
          value="favourites"
          label="Favourites"
          icon={<LogoutOutlinedIcon className={classes["tab-icon"]} />}
          iconPosition="start"
        />
      </Tabs>
      <div className={classes.content}>
        <Routes>
          <Route path="details" element={<AccountDetails />} />
          <Route
            path="history/consumer"
            element={<div>Consumer History</div>}
          />
          <Route
            path="history/provider"
            element={<div>Provider History</div>}
          />
          <Route path="favourites" element={<div>Favourites</div>} />
        </Routes>
      </div>
    </Paper>
  );
};

export default Account;
