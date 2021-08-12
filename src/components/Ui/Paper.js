import React from "react";
import { makeStyles, Paper as MaterialUiPaper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 0,
    marginBottom: 0,
    padding: theme.spacing(2),
    borderRadius: '10px',
    boxShadow: 'none',
    backgroundColor: '#eee',
    textAlign: "center",
    alignItems: "center",
  },
}));

const Paper = ({ styles, children }) => {
  const classes = useStyles();

  return <MaterialUiPaper className={styles ? styles : classes.paper}>{children}</MaterialUiPaper>;
};

export default Paper;
