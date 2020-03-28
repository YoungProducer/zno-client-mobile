/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 9 March 2020
 *
 * Slice which handle refresh api call.
 */

/** External imports */
import { createSlice } from '@reduxjs/toolkit';

/** Application's imports */
import { ILoadingAction } from 'store/types';

/** Declare interface for initial state */
export interface IRefreshInitialState {
    loading: boolean;
}

/** Define initial state */
const initialState: IRefreshInitialState = {
    loading: false,
};

/** Create slice */
const refresh = createSlice({
    initialState,
    name: 'Me',
    reducers: {
        refreshLoadingAction: (
            state: IRefreshInitialState,
            { payload }: ILoadingAction,
        ) => ({
            ...state,
            loading: payload,
        }),
    },
});

/** Export actions */
export const {
    refreshLoadingAction,
} = refresh.actions;

/** Export reducer */
export default refresh.reducer;
