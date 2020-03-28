/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 21 March 2020
 *
 * Selector for errorHandler slice.
 */

/** Application's imports */
import { RootState } from 'store/slices';

export const selectErrorStatusCode = (state: RootState) =>
    state.errorHandler.statusCode || 200;

export const selectErrorStatus = (state: RootState) =>
    state.errorHandler.status || '';

export const selectErrorMessage = (state: RootState) =>
    state.errorHandler.message || '';

export const selectErrorData = (state: RootState) =>
    state.errorHandler.data || null;
