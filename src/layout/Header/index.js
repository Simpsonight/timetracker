// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// project imports
import LogoSection from './LogoSection';

const Header = ({ handleDrawerToggle, open }) => {
    const theme = useTheme();

    return (
        <>
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto',
                    },
                }}
            >
                <IconButton
                    color='inherit'
                    aria-label='open drawer'
                    edge='start'
                    sx={{
                        marginRight: '36px',
                    }}
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                <Box component='span' sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* notification & profile */}
            <div>Notification</div>
            <div>ProfileSection</div>
        </>
    );
};

export default Header;
