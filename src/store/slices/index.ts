/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Created root reducer for application.
 */

// External imports
import { combineReducers } from '@reduxjs/toolkit';

// Application's imports
import auth from './auth';
import subjects from './subjects';
import subjectConfiguration from './subjectConfiguration';
import testSuite from './testSuite';
import errorHandler from './errorHandler';

// Define root reducer
const rootReducer = combineReducers({
    auth,
    subjects,
    subjectConfiguration,
    testSuite,
    errorHandler,
});

// Export actions
export * from './auth';
export * from './subjects';
export * from './subjectConfiguration';
export * from './testSuite';
export * from './errorHandler';

// Export type of store
export type RootState = ReturnType<typeof rootReducer>;

// Export root reducer
export default rootReducer;
