/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 28 February 2020
 *
 * Slice which handle signup request and saving the user data.
 */

/** External imports */
import { createSlice } from '@reduxjs/toolkit';

/**Application's imports */
import { ILoadingAction } from 'store/types';

/** Declare user interface */
export type TUser = {
    /**
     * User email.
     */
    email: string;
} | null;

/** Declare interface for setUserDataAction */
interface ISetUserDataAction {
    payload: TUser;
}

/** Declare interface for setSignInErrorFieldsAction */
interface ISetSignInErrorFieldsAction {
    /**
     * Array of properties names which are filled invalid.
     */
    payload: string[];
}

/** Declare interface for payload for setSignInErrorFieldsAction */
export interface ISetSignInFieldsMessagesPayload {
    /**
     * Allows to push any properties which can have only type - string.
     */
    [attr: string]: string;
}

/** Declare interface for setSignInFieldsMessagesAction */
interface ISetSignInFieldsMessagesAction {
    payload: ISetSignInFieldsMessagesPayload;
}

/** Declare sign in error fields interface */
export interface ISignInErrorFields {
    email: boolean;
    password: boolean;
}

/** Declare sign in fields messages interface */
export interface ISignInFieldsMessages {
    email: string;
    password: string;
}

/** Define default variant of sign in fields message */
const defaultFieldsMessages: ISignInFieldsMessages = {
    email: '',
    password: 'Пароль який ви використували при реєстрації',
};

/** Declare initial state interface */
export interface ISignInInitialState {
    /**
     * Toggles when request will be sent and response will be gotten.
     */
    loading: boolean;
    /**
     * If some field filled invalid it will be toggle to true
     * and marked as error field(highlighted with red color).
     */
    errorFields: ISignInErrorFields;
    /**
     * Helper text for each field.
     * By default it displays hints for proper filling.
     * If user tries to sign up and one of field filled invalid
     * then explanation of error will be displayed instead of hint.
     */
    fieldsMessages: ISignInFieldsMessages;
    /**
     * Saves user data if user is successfully logged in
     * or when user has valid tokens for authorization.
     */
    user: TUser;
}

/** Define sign in slice initial state */
const initialState: ISignInInitialState = {
    loading: false,
    errorFields: {
        email: false,
        password: false,
    },
    fieldsMessages: defaultFieldsMessages,
    // user: {
    //     email: 'foo@gmail.com',
    // },
    user: null,
};

/** Define sign in slice(reducer) */
const signIn = createSlice({
    initialState,
    name: 'SignIn',
    reducers: {
        /**
         * Toggle loading property.
         */
        signInLoadingAction: (
            state: ISignInInitialState,
            { payload }: ILoadingAction,
        ) => ({
            ...state,
            loading: payload,
        }),
        /**
         * Sets user data if user successfully logged in
         * or when user has valid tokens for authorization.
         */
        setUserDataAction: (
            state: ISignInInitialState,
            { payload }: ISetUserDataAction,
        ) => ({
            ...state,
            user: payload,
        }),
        /**
         * Toggle error fields.
         */
        setSignInErrorFieldsAction: (
            state: ISignInInitialState,
            { payload }: ISetSignInErrorFieldsAction,
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
            }, {});

            return {
                ...state,
                errorFields: Object.assign({ ...errorFields }, newErrorFields) as ISignInErrorFields,
            };
        },
        /**
         * Change fields messages.
         */
        setSignInFieldsMessagesAction: (
            state: ISignInInitialState,
            { payload }: ISetSignInFieldsMessagesAction,
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
                    }, {});

            return {
                ...state,
                fieldsMessages: Object.assign({ ...fieldsMessages }, newFieldsMessages),
            };
        },
        /**
         * Set error fields to default(all false).
         */
        setSignInErrorFieldsToDefaultAction: (
            state: ISignInInitialState,
        ) => {
            const { errorFields } = state;

            const newErrorFields =
                Object
                    .keys(errorFields)
                    .reduce((acc, curr) => ({
                        ...acc,
                        [curr]: false,
                    }), {});

            return {
                ...state,
                errorFields: Object.assign({ ...errorFields }, newErrorFields) as ISignInErrorFields,
            };
        },
        /**
         * Set fields messages(helper texts) to default as in initial state.
         */
        setSignInFieldsMessagesToDefaultAction: (
            state: ISignInInitialState,
        ) => ({
            ...state,
            fieldsMessages: defaultFieldsMessages,
        }),
    },
});

export const {
    signInLoadingAction,
    setUserDataAction,
    setSignInErrorFieldsAction,
    setSignInErrorFieldsToDefaultAction,
    setSignInFieldsMessagesAction,
    setSignInFieldsMessagesToDefaultAction,
} = signIn.actions;

export default signIn.reducer;
