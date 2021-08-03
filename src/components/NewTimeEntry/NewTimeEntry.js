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
import useStyles from "./styles";

const defaultValues = {
  date: new Date(),
  hours: "",
  minutes: "",
  client: "",
  project: "",
  task: "",
  description: "",
};

const NewTimeEntry = ({ data: { clients }, onNewEntry }) => {
  const classes = useStyles();
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const formRef = useRef();

  const validate = () => {
    let temp = {};
    temp.hours = values.hours ? "" : "This field is required";
    temp.minutes = values.minutes ? "" : "This field is required";
    temp.client = values.client.length !== 0 ? "" : "This field is required";
    temp.project = values.project.length !== 0 ? "" : "This field is required";
    temp.task = values.task.length !== 0 ? "" : "This field is required";

    setErrors({ ...temp });

    // returns a boolean => true if all values match the given string
    return Object.values(temp).every((x) => x === "");
  };

  const formatTime = (hh, mm) => {
    let time = `${hh < 10 ? "0" + hh : hh}:${mm}`;
    return time;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      const newEntryData = {
        date: values.date.toUTCString(),
        client: values.client,
        project: values.project,
        task: values.task,
        time: formatTime(values.hours, values.minutes),
        description: values.description,
      };

      onNewEntry(newEntryData);
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

      if (key === "client") {
        newValues = {
          ...newValues,
          project: "",
          task: "",
        };
      }
      if (key === "project") {
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
      console.log(updatedDate);
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
                id="client-label"
                {...(errors.client && { error: true })}
              >
                Kunde
              </InputLabel>
              <Select
                name="client"
                labelId="client-label"
                id="client-label"
                value={values.client}
                onChange={handleValueChange}
                {...(errors.client && { error: true })}
              >
                {clients.map((item) => (
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
              disabled={!values.client}
              fullWidth
            >
              <InputLabel
                shrink
                id="project-label"
                {...(errors.project && { error: true })}
              >
                Projekt
              </InputLabel>
              <Select
                name="project"
                labelId="project-label"
                id="project-label"
                value={values.project}
                onChange={handleValueChange}
                {...(errors.project && { error: true })}
              >
                {values.client &&
                  clients
                    .filter((client) => client.name === values.client)
                    .map((item) =>
                      item.projects.map((project) => (
                        <MenuItem key={project.id} value={project.name}>
                          {project.name}
                        </MenuItem>
                      ))
                    )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              className={classes.formControl}
              disabled={!values.client || !values.project}
              fullWidth
            >
              <InputLabel
                shrink
                id="project-label"
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
                {values.project &&
                  clients
                    .filter((client) => client.name === values.client)
                    .map((item) =>
                      item.projects
                        .filter((project) => project.name === values.project)
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

export default NewTimeEntry;
