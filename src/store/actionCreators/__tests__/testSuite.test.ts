/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 21 March 2020
 *
 * Create test suites for async action creator
 * which gets test suite data
 * and images for tasks and explanations.
 */

/** External imports */
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/** Application's imports */
import api from 'api';
import { fetchTestSuiteAction } from '../testSuite';
import { RootState } from 'store/slices';
import { AnyAction } from '@reduxjs/toolkit';
import { errorHandler } from 'store/middlewares/errorHandler';

describe('fetchTestSuiteAction', () => {
    /** Create state for mocking */
    const MOCK_STATE = {
        testSuite: {
            loading: false,
            answers: [],
            explanationImages: [],
            tasksImages: [],
        },
    } as RootState;

    /** Define middlewares array */
    const middlewares = [thunk, errorHandler];

    /** Create mock store */
    const store = configureMockStore(middlewares)(MOCK_STATE);

    /** Create axios mock adapter */
    const axiosMock = new MockAdapter(api.axiosInstance);

    afterEach(() => {
        axiosMock.reset();
        store.clearActions();
    });

    test('Fetch with success response', () => {
        /** Mock urls */
        axiosMock
            .onGet(`api/test-suite?subjectId=bar`)
            .reply(200, {
                id: 'foo',
                // answers: [['0'], ['1', '3']],
                answers: [{
                    answer: ['0'],
                    type: 'SINGLE',
                }, {
                    answer: ['1', '3'],
                    type: 'RELATIONS',
                }],
                theme: 'foo',
            });

        axiosMock
            .onGet(`api/test-suite/foo/images/task`)
            .reply(200, ['abc', 'efd']);

        axiosMock
            .onGet(`api/test-suite/foo/images/explanation`)
            .reply(200, ['123', '456']);

        /** Define expected actions */
        const expectedActions: AnyAction[] = [{
            type: 'TestSuite/testSuiteLoadingAction',
            payload: true,
        }, {
            type: 'TestSuite/setAnswersAction',
            payload: [{
                right: ['0'],
                selected: [''],
                gived: [''],
                type: 'SINGLE',
            }, {
                right: ['1', '3'],
                selected: ['', ''],
                gived: ['', ''],
                type: 'RELATIONS',
            }],
        }, {
            type: 'TestSuite/setTestSuiteNameAction',
            payload: 'foo',
        }, {
            type: 'TestSuite/testSuiteLoadingAction',
            payload: false,
        }, {
            type: 'TestSuite/setTasksImagesAction',
            payload: ['abc', 'efd'],
        }, {
            type: 'TestSuite/setExplanationsImagesAction',
            payload: ['123', '456'],
        }];

        /** Dispatch async action */
        return store.dispatch(fetchTestSuiteAction({
            subjectId: 'bar',
        }) as any)
            .then(() => {
                /** Assert list of dispatched actions equals to expected actions */
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    test('Fetch with status code 401', () => {
        /** Mock urls */
        axiosMock
            .onGet('api/test-suite?subjectId=bar')
            .reply(401);

        /** Define expected actions */
        const expectedActions: AnyAction[] = [{
            type: 'TestSuite/testSuiteLoadingAction',
            payload: true,
        }, {
            type: 'TestSuite/testSuiteLoadingAction',
            payload: false,
        }, {
            type: 'ErrorHandler/setErrorAction',
            payload: {
                message: 'Request failed with status code 401',
                status: undefined as any,
                statusCode: 401,
            },
        }, {
            type: 'SignIn/setUserDataAction',
            payload: null,
        }];

        /** Dispatch action */
        return store.dispatch(fetchTestSuiteAction({
            subjectId: 'bar',
        }) as any)
            .then(() => {
                /** Assert list of dispatched actions equals to expected actions */
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
