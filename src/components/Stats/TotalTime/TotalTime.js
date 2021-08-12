import React from "react";
import { sumHours } from "../../../helpers/sumTimes";
import { Typography } from "@material-ui/core";
import Paper from "../../Ui/Paper";

const TotalTime = ({ entries }) => {
  let totalTime = null;

  if (entries.length > 0) {
    totalTime = sumHours(entries);
  }

  return (
    <Paper>
      {!totalTime ? (
        <Typography variant="overline" display="block">
          Keine Zeiten eingetragen!
        </Typography>
      ) : (
        <>
          <Typography variant="h3" component="p">
            {totalTime.hours}:{totalTime.minutes}h
          </Typography>
          <Typography variant="overline" display="block">
            Hours Tracked
          </Typography>
        </>
      )}
    </Paper>
  );
};

export default TotalTime;
