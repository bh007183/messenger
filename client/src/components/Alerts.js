import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));



export default function Alerts() {
    const success = useSelector((state) => state.store.User.Success)
  const fail = useSelector((state) => state.store.User.Error)
  const classes = useStyles();

  return (
    <>
      {fail ? (
        <div className={classes.root}>
          <Alert id="Alert" severity="error">
            <AlertTitle>Error</AlertTitle>
            {fail}
          </Alert>
        </div>
      ) : success ? (
        <div className={classes.root}>
          <Alert id="Alert" severity="success">
            <AlertTitle>Success</AlertTitle>
            {success}
          </Alert>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}