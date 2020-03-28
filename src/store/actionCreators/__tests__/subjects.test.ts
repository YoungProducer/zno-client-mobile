/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Create test suites for subjects async action.
 */

/** External imports */
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/** Application's imports */
import api from 'api';
import { fetchSubjectsAction } from '../subjects';
import { RootState } from 'store/slices';

describe('fetchSubjectsAction', () => {
    const MOCK_STATE = {
        subjects: {
            loading: false,
            subjectsList: [],
        },
    } as RootState;

    /** Define middlewars */
    const middlewars = [thunk];

    /** Configure mock store */
    const store = configureMockStore(middlewars)(MOCK_STATE);

    /** Create mocked axios instance */
    const axiosMock = new MockAdapter(api.axiosInstance);

    afterEach(() => {
        axiosMock.reset();
        store.clearActions();
    });

    test('Fetch subjects with success response', () => {
        /** Mock subjects endpoint to send success response */
        axiosMock
            .onGet('api/subject')
            .reply(200, [{
                id: 'foo',
                name: 'Математика',
            }]);

        /** Define expected actions */
        const expectedActions = [{
            type: 'Subjects/subjectsLoadingAction',
            payload: true,
        }, {
            type: 'Subjects/subjectsLoadingAction',
            payload: false,
        }, {
            type: 'Subjects/setSubjectsListAction',
            payload: [{
                id: 'foo',
                name: 'Математика',
            }],
        }];

        /** Dispatch action */
        return store.dispatch(fetchSubjectsAction() as any)
            .then(() => {
                /** Assert list of dispatched actions equals to expectedActions */
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    test('Fetch subjects with error', () => {
        /** Mock subjects endpoint to send success response */
        axiosMock
            .onGet('api/subject')
            .reply(404);

        /** Define expected actions */
        const expectedActions = [{
            type: 'Subjects/subjectsLoadingAction',
            payload: true,
        }, {
            type: 'Subjects/subjectsLoadingAction',
            payload: false,
        }, {
            type: 'ErrorHandler/setErrorAction',
            payload: {
                message: 'Request failed with status code 404',
                status: undefined as any,
                statusCode: 404,
            },
        }];

        /** Dispatch action */
        return store.dispatch(fetchSubjectsAction() as any)
            .then(() => {
                /** Assert list of dispatched actions equals to expectedActions */
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    test('Fetch subjects with 3xx status', () => {
        /** Mock subjects endpoint to send 300 status */
        axiosMock
            .onGet('api/subject')
            .reply(300);

        /** Define expected actions */
        const expectedActions = [{
            type: 'Subjects/subjectsLoadingAction',
            payload: true,
        }, {
            type: 'Subjects/subjectsLoadingAction',
            payload: false,
        }, {
            type: 'ErrorHandler/setErrorAction',
            payload: {
                message: 'Request failed with status code 300',
                status: undefined as any,
                statusCode: 300,
            },
        }];

        /** Dispatch action */
        return store.dispatch(fetchSubjectsAction() as any)
            .then(() => {
                /** Assert list of dispatched actions equals to expectedActions */
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
