import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";

const EntryDate = ({ date }) => {
  const classes = useStyles();
  const month = date.toLocaleString("de-DE", { month: "short" });
  const day = date.toLocaleString("de-DE", { day: "2-digit" });
  // const year = date.getFullYear();

  return (
    <div className={classes.root}>
      {/* <Typography>{year}</Typography> */}
      <Typography variant="h4" component="span">{day}</Typography>
      <Typography>{month}</Typography>
    </div>
  );
};

export default EntryDate;
