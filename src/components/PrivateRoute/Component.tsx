/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Permission route which automaticaly redirect from protected pages if user is not logged in to SignIn page.
 */

/** External imports */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

/** Application's imports */
import { TPrivateRoute } from './container';

/** Create component */
const Component = ({ isLoggedIn, children, ...rest }: TPrivateRoute) => (
    <Route
        {...rest}
        render={({ location }) => {
            const pathname = location
                ? `/auth/signin?next=${location.pathname}${location.search}`
                : '/auth/signin';

            return isLoggedIn
                ? children
                : <Redirect
                    to={{
                        pathname: '/auth/signin',
                        state: { from: location },
                    }}
                />;
        }
        }
    />
);

export default Component;
