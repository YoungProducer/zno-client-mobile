/**
 * Created by: Oleksander Bezrukov
 * Creation date: 7 March 2020
 *
 * Create async action which make api call to 'me' in endpoint
 * and then handle response or error.
 */

/** External imports */
import { Dispatch } from '@reduxjs/toolkit';

/** Application's imports */
import api from 'api';
import {
    setUserDataAction,
    TUser,
} from 'store/slices/auth/signin';
import { meLoadingAction } from 'store/slices/auth/me';
import { setErrorAction } from 'store/slices/errorHandler';
import { AxiosError } from 'axios';

export const fetchMeAction = () =>
    async (dispatch: Dispatch<any>) => {
        dispatch(meLoadingAction(true));

        return await api.me()
            .then(response => {
                dispatch(meLoadingAction(false));

                return response;
            })
            .then(response => {
                /** Extract user data */
                return response.data;
            })
            .then((user: TUser) => dispatch(setUserDataAction(user)))
            .catch((error) => {
                dispatch(meLoadingAction(false));
                dispatch(setErrorAction(error));
            });
    };
