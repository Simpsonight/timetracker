import React from "react";
import { Typography } from "@material-ui/core";
import EntryDate from "../EntryDate/EntryDate";
import useStyles from "./styles";

const EntryItem = ({
  entryData: { date, task, project, client, description, time },
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <EntryDate date={new Date(date)} />
      <div>
        <Typography variant="h4" component="p" className={classes.task}>{task}</Typography>
        <p  className={classes.subline}>
          {client} <span>|</span> {project}
        </p>
        
      </div>
      <Typography variant="h4" component="p">{time} h</Typography>
    </div>
  );
};

export default EntryItem;
