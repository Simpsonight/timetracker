import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import DatePicker from "../Ui/DatePicker";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const TimeAdd = (props) => {
  const classes = useStyles();
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const hoursRef = useRef();
  const minutesRef = useRef();
  const descRef = useRef();

  const addEntryHandler = (event) => {
    event.preventDefault();

    const workingData = {
      date: selectedDate,
      customerId: selectedCustomerId,
      jobId: selectedJobId,
      timeHours: hoursRef.current.value,
      timeMinutes: minutesRef.current.value,
      description: descRef.current.value
    };

    console.log(workingData);
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomerId(event.target.value);
    setSelectedJobId("");
  };

  const handleJobChange = (event) => {
    setSelectedJobId(event.target.value);
  };

  const handleDateChange = (updatedDate) => {
    setSelectedDate(updatedDate);
  };

  return (
    <form onSubmit={addEntryHandler}>
      <Grid container justifyContent="space-around">
        <FormControl className={classes.formControl}>
          <DatePicker
            onUpdateDate={handleDateChange}
            defaultDate={selectedDate}
            label="Datum"
          />
        </FormControl>
        <TextField
          inputRef={hoursRef}
          label="Stunden"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">HH</InputAdornment>,
          }}
          inputProps={{
            min: 0,
            max: 24,
            step: 1,
          }}
        />
        <TextField
          inputRef={minutesRef}
          label="Minuten"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">MM</InputAdornment>,
          }}
          inputProps={{
            min: 0,
            max: 45,
            step: 15,
          }}
        />
        <FormControl className={classes.formControl}>
          <InputLabel shrink="true" id="customer-label">
            Kunde
          </InputLabel>
          <Select
            labelId="customer-label"
            id="customer-label"
            value={selectedCustomerId}
            onChange={handleCustomerChange}
          >
            {props.data.customers.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.customer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          className={classes.formControl}
          disabled={!selectedCustomerId}
        >
          <InputLabel shrink="true" id="job-label">
            Job
          </InputLabel>
          <Select
            labelId="job-label"
            id="job-label"
            value={selectedJobId}
            onChange={handleJobChange}
          >
            {selectedCustomerId &&
              props.data.customers
                .filter((item) => item.id === selectedCustomerId)
                .map((item) =>
                  item.jobs.map((job) => (
                    <MenuItem key={job.id} value={job.id}>
                      {job.name}
                    </MenuItem>
                  ))
                )}
          </Select>
        </FormControl>
        <TextField
          inputRef={descRef}
          label="Beschreibung"
          multiline
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <button type="submit">Add</button>
    </form>
  );
};

export default TimeAdd;
