/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 4 March 2020
 *
 * Async action which make call to api endpoint
 * and dispatch actions to handle success response or error.
 */

/** External imports */
import { Dispatch } from '@reduxjs/toolkit';

/** Application's imports */
import api, { ISubjectConfigurationCredentials } from 'api';
import {
    subjectConfigurationLoadingAction,
    setSubjectConfigAction,
    TSubjectConfig,
} from 'store/slices/subjectConfiguration';
import { setErrorAction } from 'store/slices/errorHandler';

/** Create async action */
export const fetchSubjectConfigurationAction = (credentials: ISubjectConfigurationCredentials) =>
    async (dispatch: Dispatch<any>) => {
        dispatch(subjectConfigurationLoadingAction(true));

        return await api.subjectConfiguration(credentials)
            .then(response => {
                dispatch(subjectConfigurationLoadingAction(false));

                return response;
            })
            .then(response => response.data)
            .then((config: TSubjectConfig) => dispatch(setSubjectConfigAction(config)))
            .catch(error => {
                dispatch(subjectConfigurationLoadingAction(false));
                dispatch(setErrorAction(error));
            });
    };
