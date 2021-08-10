import React from "react";
import { sumHours, remainingHours } from "../../../helpers/sumTimes";
import moment from "moment";
import { Box } from "@material-ui/core";
import Paper from "../../Ui/Paper";
import styles from "./RemainingWorkTime.module.css";


const HOURS_PER_DAY = 8;
const DAYS_PER_WEEK = 5;

const getWorkingTimePeriod = (filter) => {
  const currentDate = moment();
  const FROM_DATE = currentDate.clone().startOf("isoWeek");
  const TO_DATE = currentDate.clone().endOf("isoWeek");

  // TODO: get real working days with momentJS methods
  switch (filter.type) {
    case "today":
      return HOURS_PER_DAY;
    case "week":
      return HOURS_PER_DAY * DAYS_PER_WEEK;
    case "month":
      return (HOURS_PER_DAY * DAYS_PER_WEEK) * 4;
    case "individual":
      return HOURS_PER_DAY
    default:
      return HOURS_PER_DAY;
  }
};


const RemainingWorkTime = ({ entries, filter }) => {
  let remainingTime = null;
  let bookedTime = null;

  const periodTime = getWorkingTimePeriod(filter)

  if (entries.length > 0) {
    bookedTime = sumHours(entries);
    remainingTime = remainingHours(periodTime, bookedTime);
  }

  return (
    <Paper>
      <Box className={styles.card} p={2}>
        {!remainingTime ? (
          <p>Keine Zeiten eingetragen!</p>
        ) : (
          <>
            <div className={styles.time}>
              {remainingTime.hours}:{remainingTime.minutes}h
            </div>
            <div className="sub">Remaining Hours</div>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default RemainingWorkTime;
