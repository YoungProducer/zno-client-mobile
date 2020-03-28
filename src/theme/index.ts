// Created by Olexandr Bezrukov
// 21 January 2020

import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#7692f7',
            main: '#5a61ca',
            contrastText: '#fff',
        },
        secondary: {
            // main: green.A700,
            main: '#69deac',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: 'ProductSans-Light, Arial',
    },
    overrides: {
        MuiFormHelperText: {
            root: {
                fontSize: '0.9rem',
            },
        },
    },
});

export default theme;
