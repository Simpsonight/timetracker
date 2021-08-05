import React, { useState } from "react";
import moment from "moment";

import EntryItem from "./EntryItem/EntryItem";
import TotalTime from "./TotalTime/TotalTime";
import EntriesFilter from "./EntriesFilter/EntriesFilter";

const filterDefault = {
  type: "all",
  value: "",
};

const Entries = ({ entries }) => {
  const [selectedFilter, setSelectedFilter] = useState(filterDefault);

  const filterChangeHandler = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredEntries = entries.filter((entry) => {
    const entryDate = moment(entry.date);

    const currentDate = moment();
    const FROM_DATE = currentDate.clone().startOf("isoWeek");
    const TO_DATE = currentDate.clone().endOf("isoWeek");

    switch (selectedFilter.type) {
      case "today":
        return entryDate.format("DD") === currentDate.format("DD");
      case "week":
        return entryDate.isBetween(FROM_DATE, TO_DATE);
      case "month":
        return entryDate.format("MM") === currentDate.format("MM");
      case "individual":
        return entryDate.format("DD") === moment(selectedFilter.value).format("DD");
      default:
        return entry;
    }
  });

  return (
    <>
      <EntriesFilter
        selected={selectedFilter}
        onChangeFilter={filterChangeHandler}
      />
      <TotalTime entries={filteredEntries} />
      {filteredEntries.map((entry) => (
        <EntryItem key={entry.id} entryData={entry} />
      ))}
    </>
  );
};

export default Entries;
