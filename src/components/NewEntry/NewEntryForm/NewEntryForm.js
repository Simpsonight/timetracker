import React, { useState, useRef, useContext } from 'react';
import { ClientContext } from '@/store/contexts/ClientContext';
import { EntryContext } from '@/store/contexts/EntryContext';
import { addEntry } from '@/store/reducers/entryReducer';
import { Grid, InputLabel, MenuItem, FormControl, Select, TextField, InputAdornment, Button } from '@mui/material';
import { Save } from '@mui/icons-material';
import DatePicker from '@/components/Ui/DatePicker';
import useStyles from '../styles';

const defaultValues = {
    date: new Date(),
    hours: '',
    minutes: '',
    client: '',
    clientId: '',
    project: '',
    projectId: '',
    task: '',
    taskId: '',
    description: '',
};

const NewEntryForm = ({ onFormSubmit }) => {
    const classes = useStyles();
    const [clientSelected, setClientSelected] = useState({});
    const [projectSelected, setProjectSelected] = useState({});
    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState({});
    const formRef = useRef();
    const { clients } = useContext(ClientContext);
    const { dispatch } = useContext(EntryContext);

    const validate = () => {
        let temp = {};
        temp.hours = values.hours ? '' : 'This field is required';
        temp.minutes = values.minutes ? '' : 'This field is required';
        temp.client = values.client.length !== 0 ? '' : 'This field is required';
        temp.project = values.project.length !== 0 ? '' : 'This field is required';
        temp.task = values.task.length !== 0 ? '' : 'This field is required';

        setErrors({ ...temp });

        // returns a boolean => true if all values match the given string
        return Object.values(temp).every((x) => x === '');
    };

    const formatTime = (hh, mm) => {
        let time = `${hh < 10 ? '0' + hh : hh}:${mm < 10 ? '0' + mm : mm}`;
        return time;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validate()) {
            const newEntryData = {
                date: values.date.toUTCString(),
                clientId: values.clientId,
                projectId: values.projectId,
                client: values.client,
                project: values.project,
                task: values.task,
                taskId: values.taskId,
                time: formatTime(values.hours, values.minutes),
                description: values.description,
            };

            dispatch(addEntry(newEntryData));
            onFormSubmit();

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

            return newValues;
        });
    };

    const handleSelectChange = (event) => {
        setValues((prevValues) => {
            const key = event.target.name;
            const value = event.target.value;

            let newValues = {
                ...prevValues,
            };

            if (key === 'client') {
                const client = clients.find((client) => client.id === value);

                setClientSelected(client);

                newValues = {
                    ...newValues,
                    [key]: client.name,
                    clientId: value,
                    project: '',
                    task: '',
                };
            }

            if (key === 'project') {
                const project = clientSelected.projects.find((item) => item.id === value);

                setProjectSelected(project);

                newValues = {
                    ...newValues,
                    [key]: project.name,
                    projectId: value,
                    task: '',
                };
            }

            if (key === 'task') {
                const task = projectSelected.tasks.find((item) => item.id === value);

                newValues = {
                    ...newValues,
                    [key]: task.name,
                    taskId: value,
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
        <form ref={formRef} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl} fullWidth>
                        <DatePicker name='date' onUpdateDate={handleDateChange} defaultDate={values.date} label='Datum' />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name='hours'
                        value={values.hours}
                        onChange={handleValueChange}
                        label='Stunden'
                        type='number'
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>HH</InputAdornment>,
                        }}
                        inputProps={{
                            min: 0,
                            max: 24,
                            step: 1,
                        }}
                        {...(errors.hours && { error: true })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name='minutes'
                        value={values.minutes}
                        onChange={handleValueChange}
                        label='Minuten'
                        type='number'
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>MM</InputAdornment>,
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
                        <InputLabel shrink id='client-label' {...(errors.client && { error: true })}>
                            Kunde
                        </InputLabel>
                        <Select
                            name='client'
                            labelId='client-label'
                            id='client-label'
                            value={values.clientId}
                            onChange={handleSelectChange}
                            {...(errors.client && { error: true })}
                        >
                            {clients.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl} disabled={!values.client} fullWidth>
                        <InputLabel shrink id='project-label' {...(errors.project && { error: true })}>
                            Projekt
                        </InputLabel>
                        <Select
                            name='project'
                            labelId='project-label'
                            id='project-label'
                            value={values.projectId}
                            onChange={handleSelectChange}
                            {...(errors.project && { error: true })}
                        >
                            {values.client &&
                                clientSelected.projects.map((project) => (
                                    <MenuItem key={project.id} value={project.id}>
                                        {project.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl} disabled={!values.client || !values.project} fullWidth>
                        <InputLabel shrink id='project-label' {...(errors.task && { error: true })}>
                            Aufgabe
                        </InputLabel>
                        <Select
                            name='task'
                            labelId='task-label'
                            id='task-label'
                            value={values.taskId}
                            onChange={handleSelectChange}
                            {...(errors.task && { error: true })}
                        >
                            {values.project &&
                                projectSelected.tasks.map((task) => (
                                    <MenuItem key={task.id} value={task.id}>
                                        {task.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name='description'
                        label='Beschreibung'
                        value={values.description}
                        onChange={handleValueChange}
                        fullWidth
                        multiline
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item container xs={12} justifyContent='flex-end'>
                    <Button type='submit' variant='contained' color='primary' size='large' className={classes.button} startIcon={<Save />}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default NewEntryForm;
