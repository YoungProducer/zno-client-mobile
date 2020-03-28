/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Component for SubjectConfiguration route.
 */

/** External imports */
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

/** Application's imports */
import FullPage from '../FullPage';
import SubjectConfiguration from 'components/TestSuiteSide/SubjectConfiguration';

/** Create component */
const Component = () => (
    <React.Fragment>
        <CssBaseline />
        <FullPage
            side={<SubjectConfiguration />}
        />
    </React.Fragment>
);

export default Component;
