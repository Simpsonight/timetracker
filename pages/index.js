import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/components/Link';
import Copyright from '../src/components/Copyright';
import NewEntry from '../src/components/NewEntry/NewEntry';
import Entries from '../src/components/Entries/Entries';
// import DataList from "../src/DataList/DataList";

export default function Index() {
    return (
        <Container maxWidth='sm'>
            <Box sx={{ my: 6 }}>
                <Typography variant='h4' component='h1' gutterBottom>
                    Next.js v5 example
                </Typography>
                <Link href='/about' color='secondary'>
                    Go to the about page
                </Link>
                <h1>Timetracker</h1>
                <NewEntry />

                <h2>Card List</h2>
                <Entries />

                {/* <h2>Data List - All Entries</h2>
          <DataList /> */}
                <Copyright />
            </Box>
        </Container>
    );
}
