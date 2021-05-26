import React from "react";

import { Link } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LockIcon from '@material-ui/icons/Lock';
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ForumIcon from '@material-ui/icons/Forum';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import "./style.css";

export default function Drawers(props) {
  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <Drawer anchor={"right"} open={props.open} onClose={props.handleClose}>
        <div role="presentation" onClick={props.handleClose}>
          <Divider />
          <List>
            
            {/*  */}
            <ListItem button>
            <ListItemIcon>
                <Link style={{ textDecoration: 'none', color:"black" }} to="/main">
                <ForumIcon style={{ color: "black" }}/>
                </Link>
                </ListItemIcon>
                <Link style={{ textDecoration: 'none', color:"black" }} to="/main">
                <ListItemText primary={"Messages"}/>
              </Link>
              </ListItem>

              <ListItem button>
            <ListItemIcon>
                <Link style={{ textDecoration: 'none', color:"black" }} to="/">
                <LockOpenIcon style={{ color: "black" }}/>
                </Link>
                </ListItemIcon>
                <Link style={{ textDecoration: 'none', color:"black" }} to="/">
                <ListItemText primary={"Login"}/>
              </Link>
              </ListItem>

              <ListItem button onClick={logOut}>
            <ListItemIcon>
                
                <LockIcon style={{ color: "black" }}/>
                
                </ListItemIcon>
                
                <ListItemText primary={"Logout"}/>
              
              </ListItem>

            
            
            <ListItem button>
                
             
                <ListItemIcon>
                <Link style={{ textDecoration: 'none', color:"black"}} to="/AddContact">
                <PersonAddIcon style={{ color: "black" }}/>
                </Link>
                </ListItemIcon>
                <Link  style={{ textDecoration: 'none', color:"black"}}to="/AddContact">
                <ListItemText primary={"Add Friend"}/>
              </Link>
            </ListItem>
            {/*  */}
          </List>
        </div>
      </Drawer>
    </>
  );
}
