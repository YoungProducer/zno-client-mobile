/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 27 Ferbruary 2020
 *
 * Create test suites for async action
 * which make api call to 'signup' endpoint.
 */

// External imports
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Application's imports
import api from 'api';
import applicationsMiddlewares from 'store/middlewares';
import {
    fetchSignUpAction,
    fetchSignInAction,
    fetchMeAction,
    fetchLogoutAction,
} from 'store/actionCreators/auth';
import { RootState } from 'store/slices';

describe('Auth async actions', () => {
    /** Create state for mocking */
    const MOCK_STATE = {
        auth: {
            signUp: {
                loading: false,
                errorFields: {
                    email: false,
                    password: false,
                    confPassword: false,
                },
                fieldsMessages: {
                    email: '',
                    password: '',
                    confPassword: '',
                },
            },
            signIn: {
                loading: false,
                user: null,
                errorFields: {
                    email: false,
                    password: false,
                },
                fieldsMessages: {
                    email: '',
                    password: '',
                },
            },
            me: {
                loading: false,
            },
            refresh: {
                loading: false,
            },
            logout: {
                loading: false,
            },
        },
    } as RootState;

    /** Create middlewares array */
    const middlewares = [thunk, ...applicationsMiddlewares];

    /** Create mocked store */
    const store = configureMockStore(middlewares)(MOCK_STATE);

    // Create mocked axios instance
    let axiosMock = new MockAdapter(api.axiosInstance);

    describe('fetchSignUpAction', () => {
        afterEach(() => {
            axiosMock.reset();
            store.clearActions();
        });

        test('Fetch signup with invalid fields', () => {
            // Define expected actions
            const expectedActions = [{
                type: 'SignUp/signUpLoadingAction',
                payload: true,
            }, {
                type: 'SignUp/signUpLoadingAction',
                payload: false,
            }, {
                type: 'SignUp/setSignUpErrorFieldsAction',
                payload: ['email'],
            }, {
                type: 'SignUp/setSignUpFieldsMessagesAction',
                payload: {
                    email: 'Неправильний шаблон',
                },
            }];

            return store.dispatch(fetchSignUpAction({
                email: 'foo',
                password: 'barbarbar',
                confPassword: 'barbarbar',
            }) as any)
                .then(() => {
                    // Check is array of dispatched actions equals to expectedActions
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        test('Fetch signup with success status', () => {
            // Mock url to get success response
            axiosMock
                .onPost('api/auth/signup')
                .reply(200, 'Success');

            // Define expected actions
            const expectedActions = [{
                type: 'SignUp/signUpLoadingAction',
                payload: true,
            }, {
                type: 'SignUp/signUpLoadingAction',
                payload: false,
            }];

            return store.dispatch(fetchSignUpAction({
                email: 'foo@gmail.com',
                password: 'barbarbar',
                confPassword: 'barbarbar',
            }) as any)
                .then(() => {
                    // Check is array of dispatched actions equals to expectedActions
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        test('Fetch signup with error', () => {
            // Mock url to get success response
            axiosMock
                .onPost('api/auth/signup')
                .reply(404);

            // Define expected actions
            const expectedActions = [{
                type: 'SignUp/signUpLoadingAction',
                payload: true,
            }, {
                type: 'SignUp/signUpLoadingAction',
                payload: false,
            }];

            return store.dispatch(fetchSignUpAction({
                email: 'foo@gmail.com',
                password: 'barbarbar',
                confPassword: 'barbarbar',
            }) as any)
                .then(() => {
                    // Check is array of dispatched actions equals to expectedActions
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    describe('fetchSignInAction', () => {
        afterEach(() => {
            axiosMock.reset();
            store.clearActions();
        });

        test('Fetch sign in with invalid fields', () => {
            /** Define expected actions */
            const expectedActions = [{
                type: 'SignIn/signInLoadingAction',
                payload: true,
            }, {
                type: 'SignIn/signInLoadingAction',
                payload: false,
            }, {
                type: 'SignIn/setSignInErrorFieldsAction',
                payload: ['email'],
            }, {
                type: 'SignIn/setSignInFieldsMessagesAction',
                payload: {
                    email: 'Неправильний шаблон',
                },
            }];

            return store.dispatch(fetchSignInAction({
                email: 'foo',
                password: 'barbarbar',
                remember: false,
            }) as any)
                .then(() => {
                    /** Assert that array of dispatched actions equals to expectedActions */
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        test('Fetch sign in with succes response', () => {
            /** Mock 'api/auth/signin' url */
            axiosMock
                .onPost('api/auth/signin')
                .reply(200, { email: 'foo@gmail.com' });

            /** Define expected actions */
            const expectedActions = [{
                type: 'SignIn/signInLoadingAction',
                payload: true,
            }, {
                type: 'SignIn/signInLoadingAction',
                payload: false,
            }, {
                type: 'SignIn/setUserDataAction',
                payload: { email: 'foo@gmail.com' },
            }];

            return store.dispatch(fetchSignInAction({
                email: 'foo@gmail.com',
                password: 'barbarbar',
                remember: false,
            }) as any)
                .then(() => {
                    /** Assert that array of dispatched actions equals to expectedActions */
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        test('Fetch sign in with error', () => {
            /** Mock 'api/auth/signin' url */
            axiosMock
                .onPost('api/auth/signin')
                .reply(403, 'error');

            /** Define expected actions */
            const expectedActions = [{
                type: 'SignIn/signInLoadingAction',
                payload: true,
            }, {
                type: 'SignIn/signInLoadingAction',
                payload: false,
            }];

            return store.dispatch(fetchSignInAction({
                email: 'foo@gmail.com',
                password: 'barbarbar',
                remember: false,
            }) as any)
                .then(() => {
                    /** Assert that array of dispatched actions equals to expectedActions */
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    describe('fetchMeAction', () => {
        afterEach(() => {
            axiosMock.reset();
            store.clearActions();
        });

        test('Fetch with success response', () => {
            /** Mock 'api/auth/me' url */
            axiosMock
                .onGet('api/auth/me')
                .reply(200, {
                    email: 'foo@gmail.com',
                });

            /** Define expected actions */
            const expectedActions = [{
                type: 'Me/meLoadingAction',
                payload: true,
            }, {
                type: 'Me/meLoadingAction',
                payload: false,
            }, {
                type: 'SignIn/setUserDataAction',
                payload: {
                    email: 'foo@gmail.com',
                },
            }];

            return store.dispatch(fetchMeAction() as any)
                .then(() => {
                    /** Assert array of dispatched actions equals to expectedActions */
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        test('Fetch with error', () => {
            /** Mock 'api/auth/me' url */
            axiosMock
                .onGet('api/auth/me')
                .reply(403);

            /** Define expected actions */
            const expectedActions = [{
                type: 'Me/meLoadingAction',
                payload: true,
            }, {
                type: 'Me/meLoadingAction',
                payload: false,
            }, {
                type: 'ErrorHandler/setErrorAction',
                payload: {
                    message: 'Request failed with status code 403',
                    status: undefined as any,
                    statusCode: 403,
                },
            }];

            return store.dispatch(fetchMeAction() as any)
                .then(() => {
                    /** Assert array of dispatched actions equals to expectedActions */
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        test('Fetch with status 401(Unathorized)', () => {
            /** Mock 'api/auth/me' url */
            axiosMock
                .onGet('api/auth/me')
                .reply(401);

            /** Define expected actions */
            const expectedActions = [{
                type: 'Me/meLoadingAction',
                payload: true,
            }, {
                type: 'Me/meLoadingAction',
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

            return store.dispatch(fetchMeAction() as any)
            .then(() => {
                /** Assert array of dispatched actions equals to expectedActions */
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    describe('fetchLogoutAction', () => {
        afterEach(() => {
            axiosMock.reset();
            store.clearActions();
        });

        test('Fetch with success response', () => {
            /** Mock 'api/auth/logout' url */
            axiosMock
                .onPost('api/auth/logout')
                .reply(200);

            /** Define expected actions */
            const expectedActions = [{
                type: 'Logout/logoutLoadingAction',
                payload: true,
            }, {
                type: 'Logout/logoutLoadingAction',
                payload: false,
            }, {
                type: 'SignIn/setUserDataAction',
                payload: null,
            }];

            return store.dispatch(fetchLogoutAction() as any)
                .then(() => {
                    /** Assert array of dispatched actions equals to expectedActions */
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        test('Fetch with error response', () => {
            /** Mock 'api/auth/logout' url */
            axiosMock
                .onPost('api/auth/logout')
                .reply(400);

            /** Define expected actions */
            const expectedActions = [{
                type: 'Logout/logoutLoadingAction',
                payload: true,
            }, {
                type: 'Logout/logoutLoadingAction',
                payload: false,
            }];

            return store.dispatch(fetchLogoutAction() as any)
                .then(() => {
                    /** Assert array of dispatched actions equals to expectedActions */
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });
});
