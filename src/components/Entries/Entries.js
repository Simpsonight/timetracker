import React, { useState, useContext } from "react";
import { Grid } from "@material-ui/core";
import { EntryContext } from "../../contexts/EntryContext";
import moment from "moment";
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
          return (
            entryDate.format("DD") === moment(selectedFilter.value).format("DD")
          );
        default:
          return entry;
      }
    })
    .sort((a, b) => {
      return moment(b.date) - moment(a.date);
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
          <RemainingWorkTime entries={filteredEntries} filter={selectedFilter} />
        </Grid>
      </Grid>

      {filteredEntries.map((entry) => (
        <EntryItem key={entry.id} entryData={entry} />
      ))}
    </>
  );
};

export default Entries;
