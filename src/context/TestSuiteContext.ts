/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 March 2020
 *
 * Context for additional properties for test suites.
 */

/** External imports */
import { createContext } from 'react';

export const AdditionalAnswerPropertiesContext = createContext<{
    showRightDuringTest: boolean,
    setShowRightDuringTest?: (show: boolean) => void,
}>({ showRightDuringTest: false });
