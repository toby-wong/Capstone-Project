import {Menu, MenuList, MenuItem, IconButton} from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import { Link, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useHttp from "../../hooks/use-http.js";
import * as config from "../../config";

const MainHeaderProfileMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const authContext = useContext(AuthContext);
    const handleClick = (event) => {
        setOpen(!open)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setOpen(!open)
        setAnchorEl(null);
    };

    const HandleLogout = async (e) => {
        // const [isLoading, sendRequest] = useHttp();

        // // Logout from server side
        // const logoutResponse = await sendRequest(
        //     `${config.SERVER_URL}/api/auth/logout/`,
        //     {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       }
        //     }
        // );

        // if (logoutResponse.status >= 300) {
        //     console.log("False")
        // }
        
        // Logout from local context and reload page
        authContext.logout()
        setAnchorEl(null)
        window.location.reload()
    }

    return (
        <IconButton size="large" color="primary" onClick={handleClick}>
        <AccountCircleIcon fontSize="large" />
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}>
            <MenuItem onClick={handleClose}
            component={Link}
            to="/accountDetails">
                Account Details
            </MenuItem>
            <hr/>
            <MenuItem onClick={handleClose}
            component={Link}
            to="/consumerHistory">
                Consumer History
            </MenuItem>
            <MenuItem onClick={handleClose}
            component={Link}
            to="/producerHistory">
            Producer History
            </MenuItem>
            <MenuItem onClick={handleClose}
            component={Link}
            to="/favourites">
                Favourites
            </MenuItem>
            <hr/>
            <MenuItem onClick={HandleLogout}>
                Logout
            </MenuItem>
        </Menu>
        </IconButton>
    );
}

export default MainHeaderProfileMenu;
