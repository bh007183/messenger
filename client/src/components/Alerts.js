import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));



export default function Alerts(props) {

  const classes = useStyles();

  return (
    <>
      {props.fail ? (
        <div className={classes.root}>
          <Alert id="Alert" severity="error">
            <AlertTitle>Error</AlertTitle>
            {props.fail}
          </Alert>
        </div>
      ) : props.success ? (
        <div className={classes.root}>
          <Alert id="Alert" severity="success">
            <AlertTitle>Success</AlertTitle>
            {props.success}
          </Alert>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}