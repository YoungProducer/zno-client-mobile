/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 21 March 2020
 *
 * Slice which handle all erros in async action creators.
 */

/** External imports */
import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

/** Application's imports */

/** Declare interfaces for actions and payloads */
export interface ISetErrorPayload {
    message: string;
    status: string;
    statusCode: number;
    data?: any;
}

export interface ISetErrorAction {
    payload: ISetErrorPayload;
}

/** Declare interface for initial state */
export interface IErrorHandlerInitialState {
    /** Error message */
    message?: string;
    /** Error status */
    status?: string;
    /** Error status code */
    statusCode?: number;
    /** Any additional data */
    data?: any;
}

/** Create initial state */
const initialState: IErrorHandlerInitialState = {};

/** Create slice */
const errorHandler = createSlice({
    initialState,
    name: 'ErrorHandler',
    reducers: {
        setErrorAction: {
            reducer: (
                state: IErrorHandlerInitialState,
                { payload }: ISetErrorAction,
            ) => ({
                ...state,
                ...payload,
            }),
            prepare: (error?: AxiosError): ISetErrorAction => ({
                payload: error
                    ? {
                        message: error.message,
                        status: error.response.statusText,
                        statusCode: error.response.status,
                    }
                    : {
                        message: '',
                        status: '',
                        statusCode: 200,
                        data: null,
                    },
            }),
        },
    },
});

/** Export actions */
export const {
    setErrorAction,
} = errorHandler.actions;

/** Export reducer */
export default errorHandler.reducer;
