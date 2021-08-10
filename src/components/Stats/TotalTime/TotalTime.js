import React from "react";
import { sumHours } from "../../../helpers/sumTimes";
import { Box } from "@material-ui/core";
import Paper from "../../Ui/Paper";
import styles from "./TotalTime.module.css";

const TotalTime = ({ entries }) => {
  let totalTime = null;

  if (entries.length > 0) {
    totalTime = sumHours(entries);
  }

  return (
    <Paper>
      <Box className={styles.card} p={2}>
        {!totalTime ? (
          <p>Keine Zeiten eingetragen!</p>
        ) : (
          <>
            <div className={styles.time}>
              {totalTime.hours}:{totalTime.minutes}h
            </div>
            <div className="sub">Hours Tracked</div>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default TotalTime;
