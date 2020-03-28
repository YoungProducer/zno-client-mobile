/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 21 March 2020
 *
 * Async action creator which makes api call
 * to api/test-suite endpoint.
 */

/** External imports */
import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';

/** Application's imports */
import api, { ITestSuiteCredentials } from 'api';
import {
    testSuiteLoadingAction,
    setAnswersAction,
    setTasksImagesAction,
    setExplanationsImagesAction,
    setTestSuiteNameAction,
} from 'store/slices/testSuite';
import { setErrorAction } from 'store/slices/errorHandler';

export const fetchTestSuiteAction = (credentials: ITestSuiteCredentials) =>
    async (dispatch: Dispatch<any>) => {
        dispatch(testSuiteLoadingAction(true));

        return await api.testSuite(credentials)
            .then(response => response.data)
            .then(testSuiteData => {
                dispatch(setAnswersAction(testSuiteData.answers));
                dispatch(setTestSuiteNameAction({
                    session: testSuiteData.session,
                    training: testSuiteData.training,
                    theme: testSuiteData.theme,
                }));

                return api.testSuiteImages({ id: testSuiteData.id })
                    .then(axios.spread((tasks, explanations) => {
                        dispatch(testSuiteLoadingAction(false));

                        return [tasks.data, explanations.data];
                    }))
                    .then(([tasks, explanations]) => {
                        dispatch(setTasksImagesAction(tasks));
                        dispatch(setExplanationsImagesAction(explanations));
                    })
                    .catch(error => {
                        throw error;
                    });
            })
            .catch(error => {
                dispatch(testSuiteLoadingAction(false));
                dispatch(setErrorAction(error));
            });
    };
