/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create test suites for credentials verifying functions.
 */

// Application's imports
import {
    verifySignUpCredentials,
    verifySignInCredentials,
    IFetchSignInActionCredentials,
    IFetchSignUpActionCredentials,
    TVerifyAuthCredentials,
} from '../verify-credentials';

describe('Verify auth credentials', () => {
    describe('Verify sign up credentials', () => {
        test('Verify if email patter is invalid', () => {
            // Define input value
            const input: IFetchSignUpActionCredentials = {
                email: 'foo',
                password: 'barbarbar',
                confPassword: 'barbarbar',
            };

            // Define expected value
            const expected = {
                invalidFields: ['email'],
                fieldsMessages: {
                    email: 'Неправильний шаблон',
                },
            };

            expect(verifySignUpCredentials(input)).toEqual(expected);
        });

        test('Verify if password length are less than 8', () => {
            // Define input value
            const input: IFetchSignUpActionCredentials = {
                email: 'foo@gmail.com',
                password: 'bar',
                confPassword: 'bar',
            };

            // Define expected value
            const expected = {
                invalidFields: ['password'],
                fieldsMessages: {
                    password: 'Занад-то короткий пароль',
                },
            };

            expect(verifySignUpCredentials(input)).toEqual(expected);
        });

        test('Verify if password are not the same', () => {
            // Define input value
            const input: IFetchSignUpActionCredentials = {
                email: 'foo@gmail.com',
                password: 'barbarbar',
                confPassword: 'bar',
            };

            // Define expected value
            const expected = {
                invalidFields: ['confPassword'],
                fieldsMessages: {
                    confPassword: 'Паролі відрізняються',
                },
            };

            expect(verifySignUpCredentials(input)).toEqual(expected);
        });

        test('Verify if password length is less than 8 and email patter is invalid', () => {
            // Define input value
            const input: IFetchSignUpActionCredentials = {
                email: 'foo',
                password: 'bar',
                confPassword: 'bar',
            };

            // Define expected value
            const expected = {
                invalidFields: ['email', 'password'],
                fieldsMessages: {
                    email: 'Неправильний шаблон',
                    password: 'Занад-то короткий пароль',
                },
            };

            expect(verifySignUpCredentials(input)).toEqual(expected);
        });

        test('Verify if email is invalid and passwords are different', () => {
            // Define input value
            const input: IFetchSignUpActionCredentials = {
                email: 'foo',
                password: 'barbarbar',
                confPassword: 'barbarbarr',
            };

            // Define expected value
            const expected = {
                invalidFields: ['email', 'confPassword'],
                fieldsMessages: {
                    email: 'Неправильний шаблон',
                    confPassword: 'Паролі відрізняються',
                },
            };

            expect(verifySignUpCredentials(input)).toEqual(expected);
        });

        test('Verify if all fields filled correctly', () => {
            // Define input valie
            const input: IFetchSignUpActionCredentials = {
                email: 'foo@gmail.com',
                password: 'barbarbar',
                confPassword: 'barbarbar',
            };

            // Check is function returns null
            expect(verifySignUpCredentials(input)).toEqual(null);
        });
    });

    describe('Verify sign in credentials', () => {
        test('Verify if email is incorrect', () => {
            /** Define input value */
            const input: IFetchSignInActionCredentials = {
                email: 'foo',
                password: '12345678',
                remember: false,
            };

            /** Define expected value */
            const expected: TVerifyAuthCredentials = {
                invalidFields: ['email'],
                fieldsMessages: {
                    email: 'Неправильний шаблон',
                },
            };

            /** Assert that function will return value which equals to expected value */
            expect(verifySignInCredentials(input)).toEqual(expected);
        });

        test('Verify if password is too short', () => {
            /** Define input value */
            const input: IFetchSignInActionCredentials = {
                email: 'foo@gmail.com',
                password: '123',
                remember: false,
            };

            /** Define expected value */
            const expected: TVerifyAuthCredentials = {
                invalidFields: ['password'],
                fieldsMessages: {
                    password: 'Занад-то короткий пароль',
                },
            };

            /** Assert that function will return value which equals to expected value */
            expect(verifySignInCredentials(input)).toEqual(expected);
        });

        test('Verify if both fields are filled incorrect', () => {
            /** Define input value */
            const input: IFetchSignInActionCredentials = {
                email: 'foo',
                password: '123',
                remember: false,
            };

            /** Define expected value */
            const expected: TVerifyAuthCredentials = {
                invalidFields: ['email', 'password'],
                fieldsMessages: {
                    email: 'Неправильний шаблон',
                    password: 'Занад-то короткий пароль',
                },
            };

            /** Assert that function retuns that both fields are invalid and returns right reasons */
            expect(verifySignInCredentials(input)).toEqual(expected);
        });

        test('Verify if both fields are filled correct', () => {
            /** Define input value */
            const input: IFetchSignInActionCredentials = {
                email: 'foo@gmail.com',
                password: '12345678',
                remember: false,
            };

            /** Assert that functions returns 'null' because both fields are filled correctly */
            expect(verifySignInCredentials(input)).toBeNull();
        });
    });
});
