/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 2 March 2020
 *
 * Header component which contain main routes and another information or actions.
 */

/** External imports */
import React from 'react';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';

/** Application's imports */
import { TAppBarProps } from './container';
import NavigationLink from 'components/NavigationLink';

/** Create component */
const Component = (props: TAppBarProps) => {
    const { classes } = props;

    return (
        <React.Fragment>
            <CssBaseLine />
            <AppBar
                position='static'
                className={classes.root}
            >
                <Container
                    maxWidth='lg'
                    className={classes.container}
                >
                    <NavigationLink
                        navLink={{
                            to: '/',
                        }}
                        className={classes.navLink}
                        data-testid='home-navlink'
                    >
                        Головна
                    </NavigationLink>
                    <NavigationLink
                        navLink={{
                            to: '/subject-selection',
                        }}
                        className={classes.navLink}
                        data-testid='tests-navlink'
                    >
                        Тести
                    </NavigationLink>
                </Container>
            </AppBar>
        </React.Fragment>
    );
};

export default Component;
