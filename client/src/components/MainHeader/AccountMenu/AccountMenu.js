import { Menu, MenuItem, Typography, Divider } from "@mui/material";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import classes from "./AccountMenu.module.css";

const AccountMenu = ({ open, anchorEl, onClose, anchorOrigin }) => {
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      PopoverClasses={{
        paper: classes.accountMenu,
      }}
    >
      <MenuItem onClick={onClose} disableRipple>
        <ManageAccountsOutlinedIcon className={classes.menuItemIcon} />
        <Typography className={classes.menuItemText}>
          Account Details
        </Typography>
      </MenuItem>

      <Divider sx={{ my: 3 }} />

      <MenuItem onClick={onClose} disableRipple>
        <ManageSearchOutlinedIcon className={classes.menuItemIcon} />
        <Typography className={classes.menuItemText}>
          Consumer History
        </Typography>
      </MenuItem>
      <MenuItem onClick={onClose} disableRipple>
        <ManageSearchOutlinedIcon className={classes.menuItemIcon} />
        <Typography className={classes.menuItemText}>
          Provider History
        </Typography>
      </MenuItem>
      <MenuItem onClick={onClose} disableRipple>
        <FavoriteBorderOutlinedIcon className={classes.menuItemIcon} />
        <Typography className={classes.menuItemText}>Favourites</Typography>
      </MenuItem>

      <Divider sx={{ my: 3 }} />

      <MenuItem onClick={onClose} disableRipple>
        <LogoutOutlinedIcon className={classes.menuItemIcon} />
        <Typography className={classes.menuItemText}>Logout</Typography>
      </MenuItem>
    </Menu>
  );
};

export default AccountMenu;
