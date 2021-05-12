import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

export default function NavBar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense"></Toolbar>
      </AppBar>
    </div>
  );
}
