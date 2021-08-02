import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core";
import TimekeepingForm from "./components/Timekeeping/TimekeepingForm";
import BookingEntries from "./components/BookingEntries/BookingEntries";
import DataList from "./components/DataList/DataList";
import customersData from "./__mocks/customersData";
import workingHoursData from "./__mocks/workingHoursData";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const [workingHours, setWorkingHours] = useState(workingHoursData);

  const updateWorkingHours = (newEntry) => {
    setWorkingHours((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries.unshift({ ...newEntry, id: uuidv4() });
      return updatedEntries;
    });
  };

  return (
    <div className={classes.layout}>
      <h1>Timetracker</h1>
      <TimekeepingForm
        onNewWorkingTimeEntry={updateWorkingHours}
        data={customersData}
      />
      <h2>Card List</h2>
      <BookingEntries data={workingHours} />
      <h2>Data List - All Entries</h2>
      <DataList data={workingHours} />
    </div>
  );
};

export default App;
