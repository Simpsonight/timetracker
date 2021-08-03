import React from "react";

import EntryItem from "./EntryItem/EntryItem";

const Entries = ({ entries }) => {
  return (
    <>
      {entries.map((entry) => (
        <EntryItem key={entry.id} entryData={entry} />
      ))}
    </>
  );
};

export default Entries;
