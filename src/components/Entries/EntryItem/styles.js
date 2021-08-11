import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
  },
  task: {
    margin: 0,
  },
  subline: {
    margin: 0,
    color: theme.palette.lightGrey.main
  },
}));

export default useStyles;
