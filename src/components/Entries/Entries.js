import React from "react";

import EntryItem from "./EntryItem/EntryItem";
import TotalTime from "./TotalTime/TotalTime";

const Entries = ({ entries }) => {
  return (
    <>
      <TotalTime entries={entries} />
      {entries.map((entry) => (
        <EntryItem key={entry.id} entryData={entry} />
      ))}
    </>
  );
};

export default Entries;
