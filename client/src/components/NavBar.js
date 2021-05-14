import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import "./style.css";

export default function NavBar() {
  const userState = useSelector((state) => state.store.User.YourName);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid container>
            <Grid className="NavItem" item xs={2}>
              <Link to="/AddContact">
                < PersonAddIcon />
              </Link>
            </Grid>
            <Grid className="NavItem" item xs={8}>
              {userState}
            </Grid>
            <Grid className="NavItem" item xs={2}>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <PersonIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/main">Main</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/">Login</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
