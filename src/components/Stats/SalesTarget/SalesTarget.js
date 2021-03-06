import React, { useContext, useState, useEffect } from 'react';
import { Typography, Paper } from '@mui/material';
import { ClientContext } from '@/store/contexts/ClientContext';
import { EntryContext } from '@/store/contexts/EntryContext';
import { decimalToTime, timeToDecimal } from '@/helpers/sumTimes';
import { getProjectHourRate } from '@/helpers/getProjectData';
import config from '@/src/config';

const SalesTarget = () => {
    const { entries } = useContext(EntryContext);
    const { clients } = useContext(ClientContext);
    const [salary, setSalary] = useState('0.00');
    const [percentage, setPercentage] = useState('');
    const defaultSalary = '0.00';

    const calculatedSalaries = entries.map((entry) => {
        return +(getProjectHourRate(entry, clients).hourlyRate * timeToDecimal(entry.time));
    });

    useEffect(() => {
        if (entries.length > 0) {
            setSalary(calculatedSalaries.reduce((prev, curr) => prev + curr).toFixed(2));
        } else {
            setSalary(defaultSalary);
            setPercentage(0);
        }
    }, [entries]);

    useEffect(() => {
        setPercentage(+((salary * 100) / config.salesTarget.annual).toFixed(2));
    }, [salary]);

    return (
        <Paper>
            <Typography variant='h3' component='p'>
                € {config.salesTarget.annual} / € {salary} = {percentage} %
            </Typography>
            <Typography variant='overline' display='block'>
                Sales Target
            </Typography>
        </Paper>
    );
};

export default SalesTarget;
