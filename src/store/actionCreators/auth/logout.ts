/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 15 March 2020
 *
 * Async action creator which make api request to logout endpoint.
 */

/** External imports */
import { Dispatch } from '@reduxjs/toolkit';

/** Application's imports */
import api from 'api';
import { logoutLoadingAction, setUserDataAction } from 'store/slices/auth';

export const fetchLogoutAction = () => async (dispatch: Dispatch<any>) => {
    dispatch(logoutLoadingAction(true));

    return api.logout()
        .then(() => {
            dispatch(logoutLoadingAction(false));
            dispatch(setUserDataAction(null));
        })
        .catch(() => {
            dispatch(logoutLoadingAction(false));
        });
};
