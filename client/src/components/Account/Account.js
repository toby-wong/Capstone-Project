import { Paper, Tab, Tabs } from "@mui/material";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

import classes from "./Account.module.css";

import { Link, Route, Routes, useLocation } from "react-router-dom";

import AccountModal from "./AccountModal/AccountModal";
import AccountDetails from "./AccountDetails/AccountDetails";
import ProviderHistory from "./ProviderHistory/ProviderHistory";
import MyCars from "./MyCars/MyCars";
import { AccountModalContextProvider } from "../../contexts/account-modal-context";
import { AccountSubModalContextProvider } from "../../contexts/account-submodal-context";

const Account = (props) => {
  const location = useLocation();
  const activeTab = location.pathname.split("/").slice(2).join("/");

  return (
    <AccountModalContextProvider>
      <Paper className={classes.body}>
        <AccountSubModalContextProvider>
          <AccountModal />
        </AccountSubModalContextProvider>
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
            icon={
              <ManageAccountsOutlinedIcon className={classes["tab-icon"]} />
            }
            iconPosition="start"
          />

          <Tab
            className={classes.navbar__tab}
            component={Link}
            to="history/provider"
            value="history/provider"
            label="Provider History"
            icon={
              <FavoriteBorderOutlinedIcon className={classes["tab-icon"]} />
            }
            iconPosition="start"
          />

          <Tab
            className={classes.navbar__tab}
            component={Link}
            to="history/consumer"
            value="history/consumer"
            label="Consumer Bookings"
            icon={<ManageSearchOutlinedIcon className={classes["tab-icon"]} />}
            iconPosition="start"
          />

          <Tab
            className={classes.navbar__tab}
            component={Link}
            to="myCars"
            value="myCars"
            label="My Cars"
            icon={<DirectionsCarIcon className={classes["tab-icon"]} />}
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
            <Route path="history/provider" element={<ProviderHistory />} />
            <Route path="myCars" element={<MyCars />} />
            <Route path="favourites" element={<div>Favourites</div>} />
          </Routes>
        </div>
      </Paper>
    </AccountModalContextProvider>
  );
};

export default Account;
