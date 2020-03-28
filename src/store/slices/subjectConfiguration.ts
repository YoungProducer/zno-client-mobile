/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 march 2020
 *
 * Slice which handle api response to '/subjects/configurations/{subject-name}' endpoint.
 * Handle response and error.
 * Storing subject config data.
 */

/** External imports */
import { createSlice } from '@reduxjs/toolkit';

/** Application's imports */
import { ILoadingAction } from 'store/types';

export interface ISubjectRootData {
    name: string;
    id: string;
}

/** Declare interface for subject */
export interface ISubject extends ISubjectRootData {
    themes?: string[];
}

export type TSubjectConfig = ISubject & {
    /** Array which contains subsubjects */
    subSubjects?: ISubject[];
    exams?: {
        /** Training variants */
        trainings?: string[];
        /** Previous exams sessions */
        sessions?: string[];
    }
} | null;

/** Declare interface for setSubjectConfigAction */
interface ISetSubjectConfigAction {
    payload: TSubjectConfig;
}

/** Declare interface for toggleSubjectConfigurationDialogAction */
interface IToggleSubjectConfigurationDialogAction {
    payload: boolean;
}

/** Declare interface for initial state */
export interface ISubjectConfigurationInitialState {
    /**
     * Toggles when request will be sent and response will be gotten.
     */
    loading: boolean;
    /**
     * Display or hide subject configuration dialog.
     */
    dialogVisible: boolean;
    /**
     * Contain full subject config.
     */
    subjectConfig: TSubjectConfig;
}

/** Create initial state */
const initialState: ISubjectConfigurationInitialState = {
    loading: false,
    dialogVisible: false,
    subjectConfig: null,
};

/** Create slice */
const subjectConfiguration = createSlice({
    initialState,
    name: 'SubjectConfiguration',
    reducers: {
        subjectConfigurationLoadingAction: (
            state: ISubjectConfigurationInitialState,
            { payload }: ILoadingAction,
        ) => ({
            ...state,
            loading: payload,
        }),
        /**
         * Allows to toggle dialogVisible value
         * to open or close subject configuration dialog.
         */
        toggleSubjectConfigurationDialogAction: (
            state: ISubjectConfigurationInitialState,
            { payload }: IToggleSubjectConfigurationDialogAction,
        ) => ({
            ...state,
            dialogVisible: payload,
        }),
        /**
         * Set subject config.
         * If payload is empty then function will assigns null to subjectConfig.
         */
        setSubjectConfigAction: {
            reducer: (
                state: ISubjectConfigurationInitialState,
                { payload }: ISetSubjectConfigAction,
            ) => ({
                ...state,
                subjectConfig: payload,
            }),
            prepare: (config?: TSubjectConfig) => ({
                payload: config || null,
            }),
        },
    },
});

/** Export actions */
export const {
    setSubjectConfigAction,
    toggleSubjectConfigurationDialogAction,
    subjectConfigurationLoadingAction,
} = subjectConfiguration.actions;

/** Export reducer */
export default subjectConfiguration.reducer;
