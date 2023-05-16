import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
  paoverlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  rentContainer: {},
  container: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    width: "300px",
    height: "200px",
    zIndex: "inherit",
  },
}));

const RoundedContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.parentContainer}>
      <Paper className={classes.container}>{"hello"}</Paper>
    </div>
  );
};

export default RoundedContainer;
