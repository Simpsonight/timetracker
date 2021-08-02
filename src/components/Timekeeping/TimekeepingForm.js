import React, { useState, useRef } from "react";
import {
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
import Box from "../Ui/Box";
import useStyles from './styles'


const defaultValues = {
  date: new Date(),
  hours: "",
  minutes: "",
  customer: "",
  job: "",
  task: "",
  description: "",
};

const TimekeepingForm = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const formRef = useRef();

  const validate = () => {
    let temp = {};
    temp.hours = values.hours ? "" : "This field is required";
    temp.minutes = values.minutes ? "" : "This field is required";
    temp.customer =
      values.customer.length !== 0 ? "" : "This field is required";
    temp.job = values.job.length !== 0 ? "" : "This field is required";
    temp.task = values.task.length !== 0 ? "" : "This field is required";

    setErrors({ ...temp });

    // returns a boolean => true if all values match the given string
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      const workingTimeData = {
        date: values.date,
        customer: values.customer,
        job: values.job,
        task: values.task,
        timeHours: values.hours,
        timeMinutes: values.minutes,
        description: values.description,
      };

      props.onNewWorkingTimeEntry(workingTimeData);
      // clear values
      formRef.current.reset();
      setValues(defaultValues);
    }
  };

  const handleValueChange = (event) => {
    setValues((prevValues) => {
      const key = event.target.name;
      let newValues = {
        ...prevValues,
        [key]: event.target.value,
      };

      if (key === "customer") {
        newValues = {
          ...newValues,
          job: "",
          task: "",
        };
      }
      if (key === "job") {
        newValues = {
          ...newValues,
          task: "",
        };
      }
      return newValues;
    });
  };

  const handleDateChange = (updatedDate) => {
    setValues((prevValues) => {
      const newValues = {
        ...prevValues,
        date: updatedDate,
      };
      return newValues;
    });
  };

  return (
    <Box>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} fullWidth>
              <DatePicker
                name="date"
                onUpdateDate={handleDateChange}
                defaultDate={values.date}
                label="Datum"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              name="hours"
              value={values.hours}
              onChange={handleValueChange}
              label="Stunden"
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">HH</InputAdornment>
                ),
              }}
              inputProps={{
                min: 0,
                max: 24,
                step: 1,
              }}
              {...(errors.hours && { error: true })}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              name="minutes"
              value={values.minutes}
              onChange={handleValueChange}
              label="Minuten"
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">MM</InputAdornment>
                ),
              }}
              inputProps={{
                min: 0,
                max: 45,
                step: 15,
              }}
              {...(errors.minutes && { error: true })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel
                shrink
                id="customer-label"
                {...(errors.customer && { error: true })}
              >
                Kunde
              </InputLabel>
              <Select
                name="customer"
                labelId="customer-label"
                id="customer-label"
                value={values.customer}
                onChange={handleValueChange}
                {...(errors.customer && { error: true })}
              >
                {props.data.customers.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              className={classes.formControl}
              disabled={!values.customer}
              fullWidth
            >
              <InputLabel
                shrink
                id="job-label"
                {...(errors.job && { error: true })}
              >
                Job
              </InputLabel>
              <Select
                name="job"
                labelId="job-label"
                id="job-label"
                value={values.job}
                onChange={handleValueChange}
                {...(errors.job && { error: true })}
              >
                {values.customer &&
                  props.data.customers
                    .filter((customer) => customer.name === values.customer)
                    .map((item) =>
                      item.jobs.map((job) => (
                        <MenuItem key={job.id} value={job.name}>
                          {job.name}
                        </MenuItem>
                      ))
                    )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              className={classes.formControl}
              disabled={!values.customer || !values.job}
              fullWidth
            >
              <InputLabel
                shrink
                id="job-label"
                {...(errors.task && { error: true })}
              >
                Aufgabe
              </InputLabel>
              <Select
                name="task"
                labelId="task-label"
                id="task-label"
                value={values.task}
                onChange={handleValueChange}
                {...(errors.task && { error: true })}
              >
                {values.job &&
                  props.data.customers
                    .filter((customer) => customer.name === values.customer)
                    .map((item) =>
                      item.jobs
                        .filter((job) => job.name === values.job)
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Beschreibung"
              value={values.description}
              onChange={handleValueChange}
              fullWidth
              multiline
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item container xs={12} justifyContent="flex-end">
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
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default TimekeepingForm;
