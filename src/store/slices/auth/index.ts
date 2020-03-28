/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create combined reducer for slices related to auth.
 * Export all actions from all slices.
 */

// External imports
import { combineReducers } from '@reduxjs/toolkit';

// Application's imports
import signUp from './signup';
import signIn from './signin';
import me from './me';
import refresh from './refresh';
import logout from './logout';

// Export all actions from all slices
export * from './signup';
export * from './signin';
export * from './me';
export * from './refresh';
export * from './logout';

// Export combined reducer related to auth
export default combineReducers({
    signUp,
    signIn,
    me,
    refresh,
    logout,
});
