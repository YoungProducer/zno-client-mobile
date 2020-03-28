/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create test suites for auth selectors.
 */

// External imports
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Application's imports
import {
    selectSignUpLoading,
    selectSignUpErrorFields,
    selectSignUpFieldsMessages,
    selectSignInLoading,
    selectSignInUser,
    selectSignInErrorFields,
    selectSignInFieldsMessages,
    selectLogoutLoading,
    selectIsLoggedIn,
} from '../auth';
import {
    RootState,
    ISignUpErrorFields,
    ISignUpFieldsMessages,
    ISignInErrorFields,
    ISignInFieldsMessages,
    TUser,
} from 'store/slices';

// Define middlewares
const middlewares = [thunk];

// Create function which mock store
const mockStore = configureMockStore(middlewares);

describe('Auth', () => {
    describe('SignUp selectors', () => {
        test('selectSignUpLoading', () => {
            // Create mocked store
            const store = mockStore({
                auth: {
                    signUp: {
                        loading: false,
                    },
                },
            });

            // Define expected value
            const expected: boolean = false;

            // Get result of selector
            const result = selectSignUpLoading(store.getState() as RootState);

            // Check is result equals to expected value
            expect(result).toEqual(expected);
        });

        test('selectSignUpErrorFields', () => {
            // Create mocked store
            const store = mockStore({
                auth: {
                    signUp: {
                        errorFields: {
                            email: true,
                            password: false,
                            confPassword: true,
                        },
                    },
                },
            });

            // Define expected value
            const expected: ISignUpErrorFields = {
                email: true,
                password: false,
                confPassword: true,
            };

            // Get result of selector
            const result = selectSignUpErrorFields(store.getState() as RootState);

            // Check is result equals to expected value
            expect(result).toEqual(expected);
        });

        test('selectSignUpErrorFields', () => {
            // Create mocked store
            const store = mockStore({
                auth: {
                    signUp: {
                        fieldsMessages: {
                            email: 'foo',
                            password: 'bar',
                            confPassword: '',
                        },
                    },
                },
            });

            // Define expected value
            const expected: ISignUpFieldsMessages = {
                email: 'foo',
                password: 'bar',
                confPassword: '',
            };

            // Get result of selector
            const result = selectSignUpFieldsMessages(store.getState() as RootState);

            // Check is result equals to expected value
            expect(result).toEqual(expected);
        });
    });

    describe('SignIn selectors', () => {
        test('selectSignInLoading', () => {
            /** Create mocked store */
            const store = mockStore({
                auth: {
                    signIn: {
                        loading: false,
                    },
                },
            });

            /** Get result of selector */
            const result = selectSignInLoading(store.getState() as RootState);

            /** Assert that result equals false */
            expect(result).toBeFalsy();
        });

        test('selectSignInUser', () => {
            /** Create mocked user */
            const user: TUser = {
                email: 'foo@gmail.com',
            };

            /** Create mocked store */
            const store = mockStore({
                auth: {
                    signIn: {
                        user,
                    },
                },
            });

            /** Get result of selector */
            const result = selectSignInUser(store.getState() as RootState);

            /** Assert that result equals to mocked user */
            expect(result).toEqual(user);
        });

        test('selectSignInErrorFields', () => {
            /** Create mocked error fields */
            const errorFields: ISignInErrorFields = {
                email: true,
                password: false,
            };

            /** Create mocked store */
            const store = mockStore({
                auth: {
                    signIn: {
                        errorFields,
                    },
                },
            });

            /** Get result of selector */
            const result = selectSignInErrorFields(store.getState() as RootState);

            /** Assert that result equals to mocked error fields */
            expect(result).toEqual(errorFields);
        });

        test('selectSignInFieldsMessages', () => {
            /** Create mocked fields messages */
            const fieldsMessages: ISignInFieldsMessages = {
                email: 'foo',
                password: 'bar',
            };

            /** Create mocked store */
            const store = mockStore({
                auth: {
                    signIn: {
                        fieldsMessages,
                    },
                },
            });

            /** Get result of selector */
            const result = selectSignInFieldsMessages(store.getState() as RootState);

            /** Assert that result equals to mocked error fields */
            expect(result).toEqual(fieldsMessages);
        });

        test('selectIsLoggedIn if user data exists', () => {
            /** Create mocked store */
            const store = mockStore({
                auth: {
                    signIn: {
                        user: {
                            email: 'foo',
                        },
                    },
                },
            });

            /** Get result of selector */
            const result = selectIsLoggedIn(store.getState() as RootState);

            /** Assert that result equals true */
            expect(result).toBeTruthy();
        });

        test('selectIsLoggedIn if user is null', () => {
            /** Create mocked store */
            const store = mockStore({
                auth: {
                    signIn: {
                        user: null,
                    },
                },
            });

            /** Get result of selector */
            const result = selectIsLoggedIn(store.getState() as RootState);

            /** Assert that result equals false */
            expect(result).toBeFalsy();
        });
    });

    describe('Logout selectors', () => {
        test('selectLogoutLoading', () => {
            /** Create mocked store */
            const store = mockStore({
                auth: {
                    logout: {
                        loading: false,
                    },
                },
            } as RootState);

            /** Get selector's result */
            const result = selectLogoutLoading(store.getState() as RootState);

            /** Assert result has right value */
            expect(result).toBeFalsy();
        });
    });
});
