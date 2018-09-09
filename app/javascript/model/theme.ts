import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: {
            light: '#c0ebca',
            main: '#76d58d',
            dark: '#34ab50',
            contrastText: '#76d58d',
        }
    },
    typography: {
        fontWeightMedium: 300,
        fontWeightRegular: 300,
    },
});
