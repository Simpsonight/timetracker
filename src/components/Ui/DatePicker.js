import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const DatePicker = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.defaultDate);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.onUpdateDate(date)
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        autoOk
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={props.label}
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
