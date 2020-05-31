/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Component for SubjectsSelection route.
 */

/** External imports */
import React from 'react';
import { Helmet } from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';

/** Application's imports */
import SubjectSelection from 'components/SubjectSelection';
import favicon from 'images/favicon.ico';

/** Create component */
const Component = () => (
    <React.Fragment>
        <CssBaseline />
        <Helmet
            defaultTitle='Видавництво "Підручники і посібники"'
            link={[
                { rel: 'shortcut icon', href: favicon },
            ]}
        />
        <SubjectSelection />
    </React.Fragment>
);

export default Component;
