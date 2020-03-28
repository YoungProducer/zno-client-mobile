/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Async action which make api call to subjects endpoint
 * and handles response or error.
 */

/** External imports */
import { Dispatch } from '@reduxjs/toolkit';

/** Application's imports */
import api from 'api';
import {
    subjectsLoadingAction,
    setSubjectsListAction,
    TSubjectList,
} from 'store/slices/subjects';
import { setErrorAction } from 'store/slices/errorHandler';

export const fetchSubjectsAction = () => async (dispatch: Dispatch<any>) => {
    dispatch(subjectsLoadingAction(true));

    return await api.subjects()
        .then(response => {
            dispatch(subjectsLoadingAction(false));
            return response;
        })
        .then(response => response.data)
        .then((subjects: TSubjectList) => dispatch(setSubjectsListAction(subjects)))
        .catch(error => {
            dispatch(subjectsLoadingAction(false));
            dispatch(setErrorAction(error));
        });
};
