import React, { useState } from "react";
import moment from "moment";

const sumTimes = (entries) => {
  let timeObj = moment().day(0).hour(0).minute(0);

  for (const entry of entries) {
    const time = entry.time.split(":");
    timeObj.add({
      hours: parseInt(time[0]),
      minutes: parseInt(time[1]),
    });
  }

  const d = timeObj.days();
  const h = timeObj.hours();
  const m = timeObj.minutes();

  const sum = {
    days: `${d < 10 ? "0" + d : d}`,
    hours: `${h < 10 ? "0" + h : h}`,
    minutes: `${m < 10 ? "0" + m : m}`,
  };

  return sum;
};

const TotalTime = ({ entries }) => {
  let totalTime = null;

  if (entries.length > 0) {
    totalTime = sumTimes(entries);
  }

  return (
    <>
      {!totalTime ? (
        <p>Keine Zeiten eingetragen!</p>
      ) : (
        <>
          <div>
            {totalTime.days}:{totalTime.hours}:{totalTime.minutes}
          </div>
          <div>dd:hh:mm</div>
        </>
      )}
    </>
  );
};

export default TotalTime;
