import React from "react";
import { makeStyles } from "@material-ui/core";
import NewEntry from "./components/NewEntry/NewEntry";
import Entries from "./components/Entries/Entries";
import DataList from "./components/DataList/DataList";

import ClientContextProvider from "./contexts/ClientContext";
import EntryContextProvider from "./contexts/EntryContext";

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

  return (
    <ClientContextProvider>
      <EntryContextProvider>
        <div className={classes.layout}>
          <h1>Timetracker</h1>
          <NewEntry />

          <h2>Card List</h2>
          <Entries />

          <h2>Data List - All Entries</h2>
          <DataList />
        </div>
      </EntryContextProvider>
    </ClientContextProvider>
  );
};

export default App;
