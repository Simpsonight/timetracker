import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
let theme = createTheme({
    palette: {
        primary: {
            main: '#546E7A',
        },
        secondary: {
            main: '#BBDEFB',
        },
        error: {
            main: red.A400,
        },
        lightGrey: {
            main: '#989898',
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
