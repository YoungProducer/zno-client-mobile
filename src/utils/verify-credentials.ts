/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create function which verify credentials for signIn and signUp.
 */

// External imports
import isemail from 'isemail';

// Declare interface for returned value of function if some fields are invalid
export interface IVerifyAuthCredentials {
    invalidFields: string[];
    fieldsMessages: {
        [attr: string]: string;
    };
}

// Declare type of function
export type TVerifyAuthCredentials =
    IVerifyAuthCredentials
    | null;

export interface IFetchSignUpActionCredentials {
    email: string;
    password: string;
    confPassword: string;
}

export const verifySignUpCredentials = (credentials: IFetchSignUpActionCredentials): TVerifyAuthCredentials => {
    const { email, password, confPassword } = credentials;

    const invalidFields: string[] = [];
    let fieldsMessages: any = {};

    // Check is email has right pattern
    if (!isemail.validate(email)) {
        invalidFields.push('email');
        fieldsMessages = Object.assign(fieldsMessages, {
            email: 'Неправильний шаблон',
        });
    }

    // Check is length of password not smaller then 8
    if (password.length < 8) {
        invalidFields.push('password');
        fieldsMessages = Object.assign(fieldsMessages, {
            password: 'Занад-то короткий пароль',
        });
    }

    // Check is passwords are the same
    if (password !== confPassword) {
        invalidFields.push('confPassword');
        fieldsMessages = Object.assign(fieldsMessages, {
            confPassword: 'Паролі відрізняються',
        });
    }

    if (invalidFields.length !== 0) {
        return { invalidFields, fieldsMessages };
    }

    return null;
};

export interface IFetchSignInActionCredentials {
    email: string;
    password: string;
    remember: boolean;
}

export const verifySignInCredentials = (credentials: IFetchSignInActionCredentials): TVerifyAuthCredentials => {
    const { email, password } = credentials;

    const invalidFields: string[] = [];
    let fieldsMessages: any = {};

    /** Check is email has right pattern */
    if (!isemail.validate(email)) {
        invalidFields.push('email');
        fieldsMessages = Object.assign(fieldsMessages, {
            email: 'Неправильний шаблон',
        });
    }

    /** Check is length of password not smaller then 8 */
    if (password.length < 8) {
        invalidFields.push('password');
        fieldsMessages = Object.assign(fieldsMessages, {
            password: 'Занад-то короткий пароль',
        });
    }

    if (invalidFields.length !== 0) {
        return { invalidFields, fieldsMessages };
    }

    return null;
};
