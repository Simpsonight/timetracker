import React from "react";
import { makeStyles, Paper as MaterialUiPaper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    borderRadius: '10px',
    boxShadow: 'none',
    backgroundColor: '#eee'
  },
}));

const Paper = ({ styles, children }) => {
  const classes = useStyles();

  return <MaterialUiPaper className={styles ? styles : classes.paper}>{children}</MaterialUiPaper>;
};

export default Paper;
