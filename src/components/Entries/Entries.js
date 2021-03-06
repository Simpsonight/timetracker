import React, { useState, useEffect, useContext } from 'react';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { Grid, Typography, Paper } from '@mui/material';
import { EntryContext } from '@/store/contexts/EntryContext';
import EntryItem from './EntryItem/EntryItem';
import EntriesFilter from './EntriesFilter/EntriesFilter';
import TotalTime from '@/components/Stats/TotalTime/TotalTime';
import RemainingWorkTime from '@/components/Stats/RemainingWorkTime/RemainingWorkTime';
import Amount from '@/components/Stats/Amount/Amount';

const filterDefault = {
    type: 'all',
    value: '',
};

const Entries = () => {
    const { entries } = useContext(EntryContext);
    const [selectedFilter, setSelectedFilter] = useState(filterDefault);
    const [filteredEntries, setFilteredEntries] = useState([]);

    const filterChangeHandler = (filter) => {
        setSelectedFilter(filter);
    };

    useEffect(() => {
        setFilteredEntries(
            entries
                .filter((entry) => {
                    const entryDate = new Date(entry.date);
                    const currentDate = new Date();
                    const START_CURRENT_WEEK = startOfWeek(currentDate, {
                        weekStartsOn: 1,
                    });
                    const END_CURRENT_WEEK = endOfWeek(currentDate, { weekStartsOn: 1 });

                    switch (selectedFilter.type) {
                        case 'today':
                            return format(entryDate, 'dd') === format(currentDate, 'dd');
                        case 'week':
                            return isWithinInterval(entryDate, {
                                start: new Date(START_CURRENT_WEEK),
                                end: new Date(END_CURRENT_WEEK),
                            });
                        case 'month':
                            return format(entryDate, 'MM') === format(currentDate, 'MM');
                        case 'individual':
                            return format(entryDate, 'MM/dd/yyyy') === format(new Date(selectedFilter.value), 'MM/dd/yyyy');
                        default:
                            return entry;
                    }
                })
                .sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA;
                }),
        );
    }, [selectedFilter, entries]);

    return (
        <>
            <EntriesFilter selected={selectedFilter} onChangeFilter={filterChangeHandler} />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant='h2' component='h2'>
                        Time Period: <b>{selectedFilter.type}</b>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TotalTime entries={filteredEntries} />
                </Grid>
                <Grid item xs={6}>
                    <RemainingWorkTime entries={filteredEntries} filter={selectedFilter} />
                </Grid>
                <Grid item xs={12}>
                    <Amount entries={filteredEntries} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5' component='h3' gutterBottom>
                        Work Summary
                    </Typography>
                    <Paper>
                        {filteredEntries.length > 0 ? (
                            filteredEntries.map((entry) => <EntryItem key={entry.id} entryData={entry} />)
                        ) : (
                            <Typography variant='overline' display='block'>
                                Keine Eintr??ge vorhanden!
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default Entries;
