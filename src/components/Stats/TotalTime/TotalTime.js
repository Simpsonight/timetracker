import React, { useState, useEffect } from "react";
import { sumHours } from "../../../helpers/sumTimes";
import { Typography, Paper } from "@mui/material";

const TotalTime = ({ entries }) => {
  const [totalTime, setTotalTime] = useState(null);

  useEffect(() => {
    if (entries.length > 0) {
      setTotalTime(sumHours(entries));
    }
  }, [entries]);

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
