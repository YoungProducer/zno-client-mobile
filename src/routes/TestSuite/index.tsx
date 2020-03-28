/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 22 March 2020
 *
 * Component for TestSuite route.
 */

/** External imports */
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

/** Application's imports */
import { AdditionalAnswerPropertiesContext } from 'context/TestSuiteContext';
import FullPage from '../FullPage';
import TestSuite from 'components/TestSuite';
import TestSuiteStats from 'components/TestSuiteSide/TestSuiteStats';

const Component = () => {
    const [showRightDuringTest, setShowRightDuringTest] = React.useState<boolean>(false);

    return (
        <AdditionalAnswerPropertiesContext.Provider value={{
            showRightDuringTest,
            setShowRightDuringTest,
        }}>
            <React.Fragment>
                <CssBaseline />
                <FullPage
                    side={<TestSuiteStats/>}
                    content={<TestSuite />}
                />
            </React.Fragment>
        </AdditionalAnswerPropertiesContext.Provider>
    );
};

export default Component;
