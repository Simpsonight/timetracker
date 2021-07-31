import React, { useState, useRef } from "react";
import {
  makeStyles, 
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
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
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const hoursRef = useRef();
  const minutesRef = useRef();
  const descRef = useRef();
  const formRef = useRef();

  const addEntryHandler = (event) => {
    event.preventDefault();

    const workingTimeData = {
      date: selectedDate,
      customer: selectedCustomerId,
      job: selectedJobId,
      task: selectedTaskId,
      timeHours: hoursRef.current.value,
      timeMinutes: minutesRef.current.value,
      description: descRef.current.value,
    };

    props.onNewWorkingTimeEntry(workingTimeData);
    formRef.current.reset();
    clearingStates();
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomerId(event.target.value);
    setSelectedJobId("");
    setSelectedTaskId("");
  };

  const handleJobChange = (event) => {
    setSelectedJobId(event.target.value);
    setSelectedTaskId("");
  };

  const handleTaskChange = (event) => {
    setSelectedTaskId(event.target.value);
  };

  const handleDateChange = (updatedDate) => {
    setSelectedDate(updatedDate);
  };

  const clearingStates = () => {
    setSelectedDate(new Date());
    setSelectedCustomerId("");
    setSelectedJobId("");
    setSelectedTaskId("");
  };

  return (
    <form ref={formRef} onSubmit={addEntryHandler}>
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
          <InputLabel shrink id="customer-label">
            Kunde
          </InputLabel>
          <Select
            labelId="customer-label"
            id="customer-label"
            value={selectedCustomerId}
            onChange={handleCustomerChange}
          >
            {props.data.customers.map((item) => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          className={classes.formControl}
          disabled={!selectedCustomerId}
        >
          <InputLabel shrink id="job-label">
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
                .filter((customer) => customer.name === selectedCustomerId)
                .map((item) =>
                  item.jobs.map((job) => (
                    <MenuItem key={job.id} value={job.name}>
                      {job.name}
                    </MenuItem>
                  ))
                )}
          </Select>
        </FormControl>
        <FormControl
          className={classes.formControl}
          disabled={!selectedCustomerId || !selectedJobId}
        >
          <InputLabel shrink id="job-label">
            Aufgabe
          </InputLabel>
          <Select
            labelId="task-label"
            id="task-label"
            value={selectedTaskId}
            onChange={handleTaskChange}
          >
            {selectedJobId &&
              props.data.customers
                .filter((customer) => customer.name === selectedCustomerId)
                .map((item) =>
                  item.jobs
                    .filter((job) => job.name === selectedJobId)
                    .map((item) =>
                      item.tasks.map((task) => (
                        <MenuItem key={task.id} value={task.name}>
                          {task.name}
                        </MenuItem>
                      ))
                    )
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </form>
  );
};

export default TimeAdd;
