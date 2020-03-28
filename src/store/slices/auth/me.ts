/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 9 March 2020
 *
 * Slice which handle me api call.
 */

/** External imports */
import { createSlice } from '@reduxjs/toolkit';

/** Application's imports */
import { ILoadingAction } from 'store/types';

/** Declare interface for initial state */
export interface IMeInitialState {
    loading: boolean;
}

/** Define initial state */
const initialState: IMeInitialState = {
    loading: false,
};

/** Create slice */
const me = createSlice({
    initialState,
    name: 'Me',
    reducers: {
        meLoadingAction: (
            state: IMeInitialState,
            { payload }: ILoadingAction,
        ) => ({
            ...state,
            loading: payload,
        }),
    },
});

/** Export actions */
export const {
    meLoadingAction,
} = me.actions;

/** Export reducer */
export default me.reducer;
