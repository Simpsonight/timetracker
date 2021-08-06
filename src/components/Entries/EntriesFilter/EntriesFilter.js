import React, { useEffect, useState } from "react";
import {
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import DatePicker from "../../Ui/DatePicker";

const rangeFilter = [
  { id: 1, value: "all", filterName: "Alle" },
  { id: 2, value: "today", filterName: "Heute" },
  { id: 3, value: "week", filterName: "Woche" },
  { id: 4, value: "month", filterName: "Monat" },
  { id: 5, value: "individual", filterName: "Datum wählen..." },
];

const EntriesFilter = ({ selected, onChangeFilter }) => {
  const [filter, setFilter] = useState(selected);
  const [dateSelected, setDateSelected] = useState(false);

  const dropdownChangeHandler = (event) => {
    setDateSelected(false);
    const typeName = event.target.value;
    let dateStr = "";

    if (typeName === "individual") {
      setDateSelected(true);
      dateStr = new Date().toISOString();
    }

    setFilter((prefs) => {
      return {
        ...prefs,
        type: typeName,
        value: dateStr,
      };
    });
  };

  useEffect(() => {
    onChangeFilter(filter);
  }, [filter, onChangeFilter]);

  const individualChangeHandler = (updatedDate) => {
    setFilter({
      type: "individual",
      value: updatedDate,
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel shrink>Zeitraum</InputLabel>
          <Select
            name="range"
            value={filter.type}
            onChange={dropdownChangeHandler}
          >
            {rangeFilter.map((item) => (
              <MenuItem key={item.id} value={item.value}>
                {item.filterName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {dateSelected && (
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <DatePicker
              name="date"
              onUpdateDate={individualChangeHandler}
              label="Datum auswählen"
            />
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};

export default EntriesFilter;
