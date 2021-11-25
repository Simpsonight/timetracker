import React from 'react';
import { sumHours, remainingHours } from '../../../helpers/sumTimes';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, differenceInBusinessDays } from 'date-fns';
import { Typography, Paper } from '@mui/material';

const HOURS_PER_DAY = 8;

const getWorkingTimePeriod = (filter) => {
    const currentDate = new Date();
    const START_CURRENT_WEEK = startOfWeek(currentDate, { weekStartsOn: 1 });
    const END_CURRENT_WEEK = endOfWeek(currentDate, { weekStartsOn: 1 });
    const WEEK_DAYS = differenceInBusinessDays(END_CURRENT_WEEK, START_CURRENT_WEEK);
    const START_CURRENT_MONTH = startOfMonth(currentDate);
    const END_CURRENT_MONTH = endOfMonth(currentDate);
    const MONTH_DAYS = differenceInBusinessDays(END_CURRENT_MONTH, START_CURRENT_MONTH);

    switch (filter.type) {
        case 'today':
            return HOURS_PER_DAY;
        case 'week':
            return HOURS_PER_DAY * WEEK_DAYS;
        case 'month':
            return HOURS_PER_DAY * MONTH_DAYS;
        default:
            return HOURS_PER_DAY;
    }
};

const RemainingWorkTime = ({ entries, filter }) => {
    let remainingTime = null;
    let bookedTime = { hours: 0, minutes: 0 };

    if (entries.length > 0) {
        bookedTime = sumHours(entries);
    }

    remainingTime = remainingHours(getWorkingTimePeriod(filter), bookedTime);

    return (
        <Paper>
            <Typography variant='h3' component='p'>
                {remainingTime.hours}:{remainingTime.minutes}h
            </Typography>
            <Typography variant='overline' display='block'>
                Remaining Hours
            </Typography>
        </Paper>
    );
};

export default RemainingWorkTime;
