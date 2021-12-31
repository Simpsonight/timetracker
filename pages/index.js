import React, { useContext } from 'react';

// material-ui
import { Grid, Typography, Paper } from '@mui/material';

// project imports
import { filterRange } from '@/src/helpers/filter';
import { EntryContext } from '@/store/contexts/EntryContext';
import NewEntry from '@/src/components/NewEntry/NewEntry';
import SalesTarget from '@/src/components/Stats/SalesTarget/SalesTarget';
import TotalTime from '@/src/components/Stats/TotalTime/TotalTime';
import EntryItem from '@/src/components/Entries/EntryItem/EntryItem';
// import DataList from "@/src/DataList/DataList";
import { gridSpacing } from '@/src/config';

export default function Index() {
    const { entries } = useContext(EntryContext);

    const filteredEntries = filterRange(entries, 'week')

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <NewEntry />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <SalesTarget period={'annual'} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <SalesTarget period={'monthly'} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalTime entries={entries} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Paper>
                            <Typography>Wochenübersicht</Typography>
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
            </Grid>
        </Grid>
    );
}
