import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

// A custom theme for this app
let theme = createTheme({
  palette: {
    primary: {
      main: '#546E7A',
    },
    secondary: {
      main: '#BBDEFB',
    },
    lightGrey: {
      main: '#989898'
    }
  },
});

theme = responsiveFontSizes(theme);

export default theme;