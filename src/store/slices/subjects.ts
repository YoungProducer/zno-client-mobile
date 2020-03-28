/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 march 2020
 *
 * Slice which handle api call to subjects endpoint
 * and saving them.
 */

/** External imports */
import { createSlice } from '@reduxjs/toolkit';

/** Application's imports */
import { ILoadingAction } from 'store/types';

export type TSubjectList = {
    id: string;
    name: string;
    image: string;
}[];

/** Declare interface for setSubjectsListAction */
interface ISetSubjectsListAction {
    payload: TSubjectList;
}

/** Declare interface for initial state */
export interface ISubjectsInitialState {
    /**
     * Toggles when request will be sent and response will be gotten.
     */
    loading: boolean;
    /**
     * Array of subjects.
     */
    subjectsList: TSubjectList;
}

/** Define initial state */
const initialState: ISubjectsInitialState = {
    loading: false,
    subjectsList: [],
};

const subjects = createSlice({
    initialState,
    name: 'Subjects',
    reducers: {
        subjectsLoadingAction: (
            state: ISubjectsInitialState,
            { payload }: ILoadingAction,
        ) => ({
            ...state,
            loading: payload,
        }),
        setSubjectsListAction: {
            reducer: (
                state: ISubjectsInitialState,
                { payload }: ISetSubjectsListAction,
            ) => ({
                ...state,
                subjectsList: payload,
            }),
            prepare: (value?: TSubjectList) => ({ payload: value || [] }),
        },
    },
});

/** Export actions */
export const {
    subjectsLoadingAction,
    setSubjectsListAction,
} = subjects.actions;

/** Export reducer */
export default subjects.reducer;
