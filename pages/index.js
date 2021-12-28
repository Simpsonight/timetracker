import * as React from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import NewEntry from '@/src/components/NewEntry/NewEntry';
import Entries from '@/src/components/Entries/Entries';
import SalesTarget from '@/src/components/Stats/SalesTarget/SalesTarget';
// import DataList from "@/src/DataList/DataList";
import { gridSpacing } from '@/src/config';

export default function Index() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <SalesTarget />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <NewEntry />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <div>Card</div>
                    </Grid>
                </Grid>
            </Grid>
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
