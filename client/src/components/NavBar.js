import React from "react";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CreateIcon from "@material-ui/icons/Create";
import "./style.css";

export default function NavBar() {
  const userState =
    useSelector((state) => state.store.User.YourName) ||
    localStorage.getItem("user");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Grid container className="navBar">
      <Grid className="NavItem" item xs={3}>
        <p style={{color: "white"}}>{userState}</p>
      </Grid>
      <Grid className="NavItem" item xs={5}></Grid>
      <Grid className="NavItem" item xs={2}>
        <Link to="/CreateConversation">
          <CreateIcon style={{ color: "white" }} />
        </Link>
      </Grid>
      <Grid className="NavItem" item xs={2}>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <PersonIcon style={{ color: "white" }} />
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
          <MenuItem
            onClick={() => {
              handleClose();
              logOut();
            }}
          >
            Logout
          </MenuItem>
          <MenuItem>
            <Link to="/AddContact">
              <PersonAddIcon style={{ color: "black" }}>Add Contact</PersonAddIcon>
              
            </Link>
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
}
