import React, { useState, useEffect } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Grid, AppBar, Box, Toolbar, useMediaQuery, CssBaseline } from '@mui/material';

// project imports
import Header from './Header';
import Sidebar from './Sidebar';
import { drawerWidth } from '../config';


// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}));

const MainLayout = ({ children }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        setOpen(!matchDownMd);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                enableColorOnDark
                position='fixed'
                color='inherit'
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: open ? theme.transitions.create('width') : 'none',
                }}
            >
                <Toolbar>
                    <Header handleDrawerToggle={handleDrawerToggle} open={open} />
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <Sidebar drawerOpen={open} drawerToggle={handleDrawerToggle} />

            {/* main content */}
            <Main theme={theme} open={open}>
                {children}
            </Main>
        </Box>
    );
};

export default MainLayout;
