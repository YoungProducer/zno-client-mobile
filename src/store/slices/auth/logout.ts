/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 15 March 2020
 *
 * Slice which handle logout api call.
 */

/** External imports */
import { createSlice } from '@reduxjs/toolkit';

/** Application's imports */
import { ILoadingAction } from 'store/types';

/** Declare interface for initial state */
export interface ILogoutInitialState {
    loading: boolean;
}

/** Define initial state */
const initialState: ILogoutInitialState = {
    loading: false,
};

/** Create slice */
const logout = createSlice({
    initialState,
    name: 'Logout',
    reducers: {
        logoutLoadingAction: (
            state: ILogoutInitialState,
            { payload }: ILoadingAction,
        ) => ({
            ...state,
            loading: payload,
        }),
    },
});

/** Export actions */
export const {
    logoutLoadingAction,
} = logout.actions;

/** Export reducer */
export default logout.reducer;
