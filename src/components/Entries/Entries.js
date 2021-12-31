import React, { useState, useEffect, useContext } from 'react';
// import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
// material-ui
import { Grid, Typography, Paper } from '@mui/material';

// project imports
import { filterRange } from '@/src/helpers/filter';
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
        setFilteredEntries(filterRange(entries, selectedFilter.type, selectedFilter.value));
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
                                Keine Einträge vorhanden!
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default Entries;
