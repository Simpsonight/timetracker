import React from "react";
import { sumHours } from "../../../helpers/sumTimes";

const TotalTime = ({ entries }) => {
  let totalTime = null;

  if (entries.length > 0) {
    totalTime = sumHours(entries);
  }

  return (
    <>
      {!totalTime ? (
        <p>Keine Zeiten eingetragen!</p>
      ) : (
        <>
          <div>
            <h3>Stunden:</h3>
            {totalTime.hours}:{totalTime.minutes}h
          </div>
        </>
      )}
    </>
  );
};

export default TotalTime;
