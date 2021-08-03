import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core";
import NewTimeEntry from "./components/NewTimeEntry/NewTimeEntry";
import Entries from "./components/Entries/Entries";
import DataList from "./components/DataList/DataList";
import clientsData from "./__mocks/clientsData";
import workingTimeData from "./__mocks/workingTimeData";

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
  const [workingTime, setWorkingTime] = useState(workingTimeData);

  const updateWorkingTime = (newEntry) => {
    setWorkingTime((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries.unshift({ ...newEntry, id: uuidv4() });
      return updatedEntries;
    });
  };

  return (
    <div className={classes.layout}>
      <h1>Timetracker</h1>
      <NewTimeEntry
        onNewEntry={updateWorkingTime}
        data={clientsData}
      />

      <h2>Card List</h2>
      <Entries entries={workingTime} />
      
      <h2>Data List - All Entries</h2>
      <DataList entries={workingTime} />
    </div>
  );
};

export default App;
