import * as React from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from '@/src/config';

export default function Jobs() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lxs={12}>
                        <Typography>Jobs</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
