import React from "react";
import Grid from "@material-ui/core/Grid";

import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CreateIcon from "@material-ui/icons/Create";
import Drawers from "./Drawer"
import "./style.css";

export default function NavBar() {
  const userState =
    useSelector((state) => state.store.User.YourName) ||
    localStorage.getItem("user");
  

  

  const [state, setState] = React.useState(false);

  const handleOpen = () => {
    setState(true);
  };
  const handleDrawerClose = () => {
    setState(false);
  };

  return (
    <Grid container className="navBar">
      <Drawers open={state} handleClose={handleDrawerClose}/>
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
          onClick={handleOpen}
        >
          <PersonIcon style={{ color: "white" }} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
