import React, { useContext } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { EntryContext } from '@/store/contexts/EntryContext';
import NewEntry from '@/src/components/NewEntry/NewEntry';
import Entries from '@/src/components/Entries/Entries';
import SalesTarget from '@/src/components/Stats/SalesTarget/SalesTarget';
import TotalTime from '@/src/components/Stats/TotalTime/TotalTime';
// import DataList from "@/src/DataList/DataList";
import { gridSpacing } from '@/src/config';

export default function Index() {
    const { entries } = useContext(EntryContext);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Entries />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
