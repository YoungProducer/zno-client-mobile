/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create slice which handle signup api call.
 */

// External imports
import { createSlice } from '@reduxjs/toolkit';

// Application's imports
import { ILoadingAction } from 'store/types';

// Interface for handling error fields
export interface ISignUpErrorFields {
    email: boolean;
    password: boolean;
    confPassword: boolean;
}

// Messages which display under each text field
export interface ISignUpFieldsMessages {
    email: string;
    password: string;
    /**
     * Password which must be the same as 'password' property.
     */
    confPassword: string;
}

// Declare interface for payload for SetSignUpErrorFieldsAction
export interface ISetSignUpErrorFieldsPayload {
    email?: boolean;
    password?: boolean;
    confPassword?: boolean;
}

// Declare interface for setSignUpErrorFieldsAction
interface ISetSignUpErrorFieldsAction {
    // payload: ISetSignUpErrorFieldsPayload;
    payload: string[];
}

// Declare interface for payload for SetSignUpFieldsMessagesAction
export interface ISetSignUpFieldsMessagesPayload {
    // email?: string;
    // password?: string;
    // confPassword?: string;
    /**
     * Any properties with type string.
     */
    [attr: string]: string;
}

// Declare interface for setSignUpFieldsMessagesAction
interface ISetSignUpFieldsMessagesAction {
    payload: ISetSignUpFieldsMessagesPayload;
}

// Declare interface for initial state
export interface ISignUpInitialState {
    loading: boolean;
    /**
     * If some field filled invalid it will be toggle to true
     * and marked as error field(highlighted with red color).
     */
    errorFields: ISignUpErrorFields;
    /**
     * Helper text for each field.
     * By default it displays hints for proper filling.
     * If user tries to sign up and one of field filled invalid
     * then explanation of error will be displayed instead of hint.
     */
    fieldsMessages: ISignUpFieldsMessages;
}

// Define default object for fieldsMessages property
const defaultFieldsMessages: ISignUpFieldsMessages = {
    email: '',
    password: 'Не менше 8 символів.',
    confPassword: 'Підвердіть ваш пароль.',
};

// Define initial state for slice
const initialState: ISignUpInitialState = {
    loading: false,
    errorFields: {
        email: false,
        password: false,
        confPassword: false,
    },
    fieldsMessages: defaultFieldsMessages,
};

// Define signUp slice
const signUp = createSlice({
    initialState,
    name: 'SignUp',
    reducers: {
        /**
         * This action will dispatches when request have been sent
         * and response have been got.
         */
        signUpLoadingAction: (
            state: ISignUpInitialState,
            { payload }: ILoadingAction,
        ) => ({
            ...state,
            loading: payload,
        }),
        /**
         * Toggle error fields.
         */
        setSignUpErrorFieldsAction: (
            state: ISignUpInitialState,
            { payload }: ISetSignUpErrorFieldsAction,
        ) => {
            const { errorFields } = state;

            // Create new object which contain invalid fields with value: true
            const newErrorFields = payload.reduce((acc, curr) => {
                // Check is current value from array exist in state.invalidFields
                if (Object.keys(errorFields).some(key => key === curr)) {
                    return {
                        ...acc,
                        [curr]: true,
                    };
                }

                return { ...acc };
            },                                    {});

            return {
                ...state,
                errorFields: Object.assign({ ...errorFields }, newErrorFields) as ISignUpErrorFields,
            };
        },
        /**
         * Change fields messages.
         */
        setSignUpFieldsMessagesAction: (
            state: ISignUpInitialState,
            { payload }: ISetSignUpFieldsMessagesAction,
        ) => {
            const { fieldsMessages } = state;

            const newFieldsMessages =
                Object
                    .entries(payload)
                    .reduce((acc, curr) => {
                        if (Object.keys(fieldsMessages).some(key => key === curr[0])) {
                            return {
                                ...acc,
                                [curr[0]]: curr[1],
                            };
                        }

                        return { ...acc };
                    },      {});

            return {
                ...state,
                fieldsMessages: Object.assign({ ...fieldsMessages }, newFieldsMessages),
            };
        },
        /**
         * Set error fields to default(all false).
         */
        setSignUpErrorFieldsToDefaultAction: (
            state: ISignUpInitialState,
        ) => {
            const { errorFields } = state;

            const newErrorFields =
                Object
                    .keys(errorFields)
                    .reduce((acc, curr) => ({
                        ...acc,
                        [curr]: false,
                    }),     {});

            return {
                ...state,
                errorFields: Object.assign({ ...errorFields }, newErrorFields) as ISignUpErrorFields,
            };
        },
        /**
         * Set fields messages(helper texts) to default as in initial state.
         */
        setSignUpFieldsMessagesToDefaultAction: (
            state: ISignUpInitialState,
        ) => ({
            ...state,
            fieldsMessages: defaultFieldsMessages,
        }),
    },
});

// Export all actions from the slice
export const {
    signUpLoadingAction,
    setSignUpErrorFieldsAction,
    setSignUpFieldsMessagesAction,
    setSignUpErrorFieldsToDefaultAction,
    setSignUpFieldsMessagesToDefaultAction,
} = signUp.actions;

// Export reducer
export default signUp.reducer;
