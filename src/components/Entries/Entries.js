import React, { useState, useContext } from "react";
import { Grid } from "@material-ui/core";
import { EntryContext } from "../../contexts/EntryContext";
import { format, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import EntryItem from "./EntryItem/EntryItem";
import EntriesFilter from "./EntriesFilter/EntriesFilter";
import TotalTime from "../Stats/TotalTime/TotalTime";
import RemainingWorkTime from "../Stats/RemainingWorkTime/RemainingWorkTime";

const filterDefault = {
  type: "all",
  value: "",
};

const Entries = () => {
  const { entries } = useContext(EntryContext);
  const [selectedFilter, setSelectedFilter] = useState(filterDefault);

  const filterChangeHandler = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredEntries = entries
    .filter((entry) => {
      const entryDate = new Date(entry.date);
      const currentDate = new Date();
      const START_CURRENT_WEEK = startOfWeek(currentDate, { weekStartsOn: 1 });
      const END_CURRENT_WEEK = endOfWeek(currentDate, { weekStartsOn: 1 });

      switch (selectedFilter.type) {
        case "today":
          return format(entryDate, "dd") === format(currentDate, "dd");
        case "week":
          return (
            isWithinInterval(entryDate, {
              start: new Date(START_CURRENT_WEEK),
              end: new Date(END_CURRENT_WEEK),
            })
          );
        case "month":
          return format(entryDate, "MM") === format(currentDate, "MM");
        case "individual":
          return (
            format(entryDate, "dd") ===
            format(new Date(selectedFilter.value), "dd")
          );
        default:
          return entry;
      }
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

  return (
    <>
      <EntriesFilter
        selected={selectedFilter}
        onChangeFilter={filterChangeHandler}
      />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TotalTime entries={filteredEntries} />
        </Grid>
        <Grid item xs={6}>
          <RemainingWorkTime
            entries={filteredEntries}
            filter={selectedFilter}
          />
        </Grid>
      </Grid>

      {filteredEntries.map((entry) => (
        <EntryItem key={entry.id} entryData={entry} />
      ))}
    </>
  );
};

export default Entries;
