import React, { useState } from 'react';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

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
        <LocalizationProvider dateAdapter={DateAdapter}>
            <MobileDatePicker
                className={classes.multiFormControl}
                name={name}
                label={label}
                inputFormat='dd.MM.yyyy'
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
};

export default DatePicker;
