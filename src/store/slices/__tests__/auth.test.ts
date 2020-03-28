/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create test suites for auth reducer.
 */

// Application's imports
import signUp from 'store/slices/auth/signup';
import signIn, { TUser } from 'store/slices/auth/signin';
import me from 'store/slices/auth/me';
import refresh from 'store/slices/auth/refresh';
import logout from 'store/slices/auth/logout';
import {
    signUpLoadingAction,
    setSignUpErrorFieldsAction,
    setSignUpErrorFieldsToDefaultAction,
    setSignUpFieldsMessagesAction,
    setSignUpFieldsMessagesToDefaultAction,
    ISignUpInitialState,
    signInLoadingAction,
    setUserDataAction,
    setSignInErrorFieldsAction,
    setSignInErrorFieldsToDefaultAction,
    setSignInFieldsMessagesAction,
    setSignInFieldsMessagesToDefaultAction,
    ISignInInitialState,
    meLoadingAction,
    IMeInitialState,
    refreshLoadingAction,
    IRefreshInitialState,
    logoutLoadingAction,
    ILogoutInitialState,
} from 'store/slices/auth';

describe('Auth reducer', () => {
    describe('SignUp reducer', () => {
        test('signUpLoadingAction toggle to true', () => {
            // Define initial state
            const initialState: ISignUpInitialState = {
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
            };

            // Define expected state
            const expectedState: ISignUpInitialState = {
                loading: true,
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
            };

            // Get result of dispatched action
            const result = signUp(initialState, signUpLoadingAction(true));

            // Check is result equals to expected state
            expect(result).toEqual(expectedState);
        });

        test('signUpLoadingAction toggle to false', () => {
            // Define initial state
            const initialState: ISignUpInitialState = {
                loading: true,
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
            };

            // Define expected state
            const expectedState: ISignUpInitialState = {
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
            };

            // Get result of dispatched action
            const result = signUp(initialState, signUpLoadingAction(false));

            // Check is result equals to expected state
            expect(result).toEqual(expectedState);
        });

        test('setSignUpErrorFieldsAction', () => {
            // Define initial state
            const initialState: ISignUpInitialState = {
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
            };

            // Define expected state
            const expectedState: ISignUpInitialState = {
                loading: false,
                errorFields: {
                    email: true,
                    password: false,
                    confPassword: true,
                },
                fieldsMessages: {
                    email: '',
                    password: '',
                    confPassword: '',
                },
            };

            // Get result of dispatched action
            const result = signUp(initialState, setSignUpErrorFieldsAction(['email', 'confPassword', 'foo']));

            // Check is result equals to expected state
            expect(result).toEqual(expectedState);
        });

        test('setSignUpErrorFieldsToDefaultAction', () => {
            // Define initial state
            const initialState: ISignUpInitialState = {
                loading: false,
                errorFields: {
                    email: true,
                    password: false,
                    confPassword: true,
                },
                fieldsMessages: {
                    email: '',
                    password: '',
                    confPassword: '',
                },
            };

            // Define expected state
            const expectedState: ISignUpInitialState = {
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
            };

            // Get result of dispatched action
            const result = signUp(initialState, setSignUpErrorFieldsToDefaultAction());

            // Check is result equals to expected state
            expect(result).toEqual(expectedState);
        });

        test('setSignUpFieldsMessagesAction', () => {
            // Define initial state
            const initialState: ISignUpInitialState = {
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
            };

            // Define expected state
            const expectedState: ISignUpInitialState = {
                loading: false,
                errorFields: {
                    email: false,
                    password: false,
                    confPassword: false,
                },
                fieldsMessages: {
                    email: 'foo',
                    password: '',
                    confPassword: '',
                },
            };

            // Get result of dispatched action
            const result = signUp(initialState, setSignUpFieldsMessagesAction({
                email: 'foo',
            }));

            // Check is result equals to expected state
            expect(result).toEqual(expectedState);
        });

        test('setSignUpFieldsMessagesToDefaultAction', () => {
            // Define initial state
            const initialState: ISignUpInitialState = {
                loading: false,
                errorFields: {
                    email: false,
                    password: false,
                    confPassword: false,
                },
                fieldsMessages: {
                    email: 'foo',
                    password: 'bar',
                    confPassword: '',
                },
            };

            // Define expected state
            const expectedState: ISignUpInitialState = {
                loading: false,
                errorFields: {
                    email: false,
                    password: false,
                    confPassword: false,
                },
                fieldsMessages: {
                    email: '',
                    password: 'Не менше 8 символів.',
                    confPassword: 'Підвердіть ваш пароль.',
                },
            };

            // Get result of dispatched action
            const result = signUp(initialState, setSignUpFieldsMessagesToDefaultAction());

            // Check is result equals to expected state
            expect(result).toEqual(expectedState);
        });
    });

    describe('SignIn reducer', () => {
        test('signInLoadingAction toggle to true' , () => {
            /** Define initial state */
            const initialState: ISignInInitialState = {
                loading: false,
                errorFields: {
                    email: false,
                    password: false,
                },
                fieldsMessages: {
                    email: '',
                    password: '',
                },
                user: null,
            };

            /** Get result of dispatched action */
            const result = signIn(initialState, signInLoadingAction(true));

            /** Assert that loading in new state equals to true */
            expect(result.loading).toBeTruthy();
        });

        test('signInLoadingAction toggle to false' , () => {
            /** Define initial state */
            const initialState: ISignInInitialState = {
                loading: true,
                errorFields: {
                    email: false,
                    password: false,
                },
                fieldsMessages: {
                    email: '',
                    password: '',
                },
                user: null,
            };

            /** Get result of dispatched action */
            const result = signIn(initialState, signInLoadingAction(false));

            /** Assert that loading in new state equals to true */
            expect(result.loading).toBeFalsy();
        });

        test('setUserDataAction', () => {
            /** Define initial state */
            const initialState: ISignInInitialState = {
                loading: true,
                errorFields: {
                    email: false,
                    password: false,
                },
                fieldsMessages: {
                    email: '',
                    password: '',
                },
                user: null,
            };

            /** Define user data */
            const user: TUser = {
                email: 'foo@gmail.com',
            };

            /** Get result of dispatched action */
            const result = signIn(initialState, setUserDataAction(user));

            /** Assert that user data in new state equals to pushed value */
            expect(result.user).toEqual(user);
        });

        test('setSignInErrorFieldsAction', () => {
            /** Define initial state */
            const initialState: ISignInInitialState = {
                loading: false,
                errorFields: {
                    email: false,
                    password: false,
                },
                fieldsMessages: {
                    email: '',
                    password: '',
                },
                user: null,
            };

            /** Define expected state */
            const expectedState: ISignInInitialState = {
                loading: false,
                errorFields: {
                    email: true,
                    password: false,
                },
                fieldsMessages: {
                    email: '',
                    password: '',
                },
                user: null,
            };

            /** Get result of dispatched action */
            const result = signIn(initialState, setSignInErrorFieldsAction(['email', 'confPassword', 'foo']));

            /** Check is result equals to expected state */
            expect(result).toEqual(expectedState);
        });

        test('setSignInErrorFieldsToDefaultAction', () => {
            /** Define initial state */
            const initialState: ISignInInitialState = {
                loading: false,
                errorFields: {
                    email: true,
                    password: false,
                },
                fieldsMessages: {
                    email: '',
                    password: '',
                },
                user: null,
            };

            // Define expected state
            const expectedState: ISignInInitialState = {
                loading: false,
                errorFields: {
                    email: false,
                    password: false,
                },
                fieldsMessages: {
                    email: '',
                    password: '',
                },
                user: null,
            };

            // Get result of dispatched action
            const result = signIn(initialState, setSignInErrorFieldsToDefaultAction());

            // Check is result equals to expected state
            expect(result).toEqual(expectedState);
        });

        test('setSignInFieldsMessagesAction', () => {
            /** Define initial state */
            const initialState: ISignInInitialState = {
                loading: false,
                errorFields: {
                    email: false,
                    password: false,
                },
                fieldsMessages: {
                    email: '',
                    password: '',
                },
                user: null,
            };

            /** Define expected state */
            const expectedState: ISignInInitialState = {
                loading: false,
                errorFields: {
                    email: false,
                    password: false,
                },
                fieldsMessages: {
                    email: 'foo',
                    password: '',
                },
                user: null,
            };

            /** Get result of dispatched action */
            const result = signIn(initialState, setSignInFieldsMessagesAction({
                email: 'foo',
            }));

            /** Check is result equals to expected state */
            expect(result).toEqual(expectedState);
        });

        test('setSignInFieldsMessagesToDefaultAction', () => {
            /** Define initial state */
            const initialState: ISignInInitialState = {
                loading: false,
                errorFields: {
                    email: false,
                    password: false,
                },
                fieldsMessages: {
                    email: 'foo',
                    password: 'bar',
                },
                user: null,
            };

            /** Define expected state */
            const expectedState: ISignInInitialState = {
                loading: false,
                errorFields: {
                    email: false,
                    password: false,
                },
                fieldsMessages: {
                    email: '',
                    password: 'Пароль який ви використували при реєстрації',
                },
                user: null,
            };

            /** Get result of dispatched action */
            const result = signIn(initialState, setSignInFieldsMessagesToDefaultAction());

            /** Check is result equals to expected state */
            expect(result).toEqual(expectedState);
        });
    });

    describe('Me reducer', () => {
        test('Toggle loading to true', () => {
            /** Define initial state */
            const initialState: IMeInitialState = {
                loading: false,
            };

            /** Get result of dispatched action */
            const result = me(initialState, meLoadingAction(true));

            /** Check is loading prop equals true */
            expect(result.loading).toBeTruthy();
        });

        test('Toggle loading to false', () => {
            /** Define initial state */
            const initialState: IMeInitialState = {
                loading: true,
            };

            /** Get result of dispatched action */
            const result = me(initialState, meLoadingAction(false));

            /** Check is loading prop equals true */
            expect(result.loading).toBeFalsy();
        });
    });

    describe('Refresh reducer', () => {
        test('Toggle loading to true', () => {
            /** Define initial state */
            const initialState: IRefreshInitialState = {
                loading: false,
            };

            /** Get result of dispatched action */
            const result = refresh(initialState, refreshLoadingAction(true));

            /** Check is loading prop equals true */
            expect(result.loading).toBeTruthy();
        });

        test('Toggle loading to false', () => {
            /** Define initial state */
            const initialState: IRefreshInitialState = {
                loading: true,
            };

            /** Get result of dispatched action */
            const result = refresh(initialState, refreshLoadingAction(false));

            /** Check is loading prop equals true */
            expect(result.loading).toBeFalsy();
        });
    });

    describe('Me reducer', () => {
        test('Toggle loading to true', () => {
            /** Define initial state */
            const initialState: ILogoutInitialState = {
                loading: false,
            };

            /** Get result of dispatched action */
            const result = logout(initialState, logoutLoadingAction(true));

            /** Check is loading prop equals true */
            expect(result.loading).toBeTruthy();
        });

        test('Toggle loading to false', () => {
            /** Define initial state */
            const initialState: ILogoutInitialState = {
                loading: true,
            };

            /** Get result of dispatched action */
            const result = logout(initialState, logoutLoadingAction(false));

            /** Check is loading prop equals true */
            expect(result.loading).toBeFalsy();
        });
    });
});
