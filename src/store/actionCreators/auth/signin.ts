/**
 * Created by: Oleksander Bezrukov
 * Creation date: 28 February 2020
 *
 * Create async action which make api call to sign in endpoint
 * and then handle response and error.
 */

/** External imports */
import { Dispatch } from '@reduxjs/toolkit';

/** Application's imports */
import api from 'api';
import {
    signInLoadingAction,
    setUserDataAction,
    setSignInErrorFieldsAction,
    setSignInFieldsMessagesAction,
    TUser,
} from 'store/slices/auth/signin';
import {
    verifySignInCredentials,
    IFetchSignInActionCredentials,
} from 'utils/verify-credentials';
import { AxiosError } from 'axios';

export const fetchSignInAction = (credentials: IFetchSignInActionCredentials) =>
    async (dispatch: Dispatch<any>) => {
        dispatch(signInLoadingAction(true));

        const invalidData = verifySignInCredentials(credentials);

        if (!invalidData) {
            return await api.signin(credentials)
                .then(response => {
                    dispatch(signInLoadingAction(false));

                    return response;
                })
                .then(response => {
                    /** Extract user data */
                    return response.data;
                })
                .then((user: TUser) => dispatch(setUserDataAction(user)))
                .catch((error: AxiosError) => {
                    if (error.response.data.errors) {
                        const errorData = error.response.data.errors;
                        dispatch(setSignInErrorFieldsAction(errorData.errorFields));
                        dispatch(setSignInFieldsMessagesAction(errorData.errorMessages));
                    }
                    dispatch(signInLoadingAction(false));
                });
        }

        dispatch(signInLoadingAction(false));
        dispatch(setSignInErrorFieldsAction(invalidData.invalidFields));
        dispatch(setSignInFieldsMessagesAction(invalidData.fieldsMessages));
    };
