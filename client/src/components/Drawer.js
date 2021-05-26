import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import "./style.css"

export default function Drawers() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  

  return (
    <>
      <Button onClick={toggleDrawer("right", true)}>{"right"}</Button>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        
      
        
      >
        <div role="presentation" onClick={toggleDrawer("right", false)}>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                {" "}
                <InboxIcon />{" "}
              </ListItemIcon>
              <ListItemText primary={"uouo"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                {" "}
                <MailIcon />{" "}
              </ListItemIcon>
              <ListItemText primary={"uouo"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}
