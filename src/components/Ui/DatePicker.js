import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  multiFormControl: {
    marginTop: 0,
  },
}));

const DatePicker = ({ onUpdateDate, defaultDate, name, label }) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onUpdateDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className={classes.multiFormControl}
        name={name}
        autoOk
        variant="inline"
        format="dd.MM.yyyy"
        margin="normal"
        id="date-picker-inline"
        label={label}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
