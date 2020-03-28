/**
 * Created by: Oleksandr Bezrukov
 * Creation date 25 February 2020
 *
 * Create main component wrapped into main providers.
 */

// External imports
import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

// Application's imports
import { TAppProps } from 'containers/App';
import Routes from 'routes';
import history from 'routes/history';
import theme from 'theme';

/** Create App component */
const Component = ({ fetchMe }: TAppProps) => {
    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <Routes />
            </Router>
        </ThemeProvider>
    );
};

export default Component;
