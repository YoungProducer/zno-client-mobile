/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 29 February 2020
 *
 * Create test suites for SignIn component.
 */

/** External imports */
import React from 'react';
import { shallow, mount } from 'enzyme';

/** Application's imports */
import Component from '../Component';
import { TSignInProps } from '../container';

/** Create mock function for useHistory hook */
const push = jest.fn();

/** Mock react-router-dom module */
jest.mock('react-router-dom', () => ({
    useHistory: jest.fn(() => ({
        push,
    })),
}));

describe('SignIn component', () => {
    /** Mock function for props */
    const setSignInFieldsMessagesToDefault = jest.fn();
    const fetchSignIn = jest.fn();
    const setSignInErrorFieldsToDefault = jest.fn();

    /** Define required props */
    const requiredProps: TSignInProps = {
        fetchSignIn,
        setSignInErrorFieldsToDefault,
        setSignInFieldsMessagesToDefault,
        loading: false,
        errorFields: {
            email: false,
            password: false,
        },
        fieldsMessages: {
            email: 'foo',
            password: 'bar',
        },
        isLoggedIn: false,
    };

    beforeEach(() => {
        (requiredProps.fetchSignIn as jest.Mock).mockReset();
        (requiredProps.setSignInErrorFieldsToDefault as jest.Mock).mockReset();
        (requiredProps.setSignInFieldsMessagesToDefault as jest.Mock).mockReset();
    });

    test('Is match snapshot', () => {
        /** Render component in shallow */
        const root = shallow(<Component {...requiredProps}/>);

        /** Assert component matches snapsot */
        expect(root).toMatchSnapshot();
    });

    test('Is fetchSignIn will be called with right args', () => {
        /** Create dom tree */
        const tree = shallow(<Component {...requiredProps}/>);

        /** Simulate onChange events*/
        tree.find(`[data-testid='signin-email-input']`).simulate('change', {
            target: {
                value: 'bar',
            },
        });

        tree.find(`[data-testid='signin-password-input']`).simulate('change', {
            target: {
                value: 'foo',
            },
        });

        /** Simulate signin button click */
        tree.find(`[data-testid='signin-button']`).simulate('click');

        /** Assert fetchSignIn be called with right values */
        expect(fetchSignIn).toBeCalledWith({
            email: 'bar',
            password: 'foo',
            remember: false,
        });
    });

    test('Is clear function will be called when fields have errors after email onChange event', () => {
        /** Create dom tree */
        const tree = shallow(<Component
            {...requiredProps}
            errorFields={{
                email: true,
                password: true,
            }}
            fieldsMessages={{
                email: 'foo',
                password: 'bar',
            }}
        />);

        /** Simulate onChange event */
        tree.find(`[data-testid='signin-email-input']`).simulate('change', {
            target: {
                value: 'bar',
            },
        });

        /** Assert setSignInErrorFieldsToDefault have been called and just one time*/
        expect(setSignInErrorFieldsToDefault).toHaveBeenCalled();
        expect(setSignInErrorFieldsToDefault).toHaveBeenCalledTimes(1);

        /** Assert setSignInFieldsMessagesToDefault have been called and just one time */
        expect(setSignInFieldsMessagesToDefault).toHaveBeenCalled();
        expect(setSignInFieldsMessagesToDefault).toHaveBeenCalledTimes(1);
    });

    test('Is clear function will be called when fields have errors after password onChange event', () => {
        /** Create dom tree */
        const tree = shallow(<Component
            {...requiredProps}
            errorFields={{
                email: true,
                password: true,
            }}
            fieldsMessages={{
                email: 'foo',
                password: 'bar',
            }}
        />);

        /** Simulate onChange event */
        tree.find(`[data-testid='signin-password-input']`).simulate('change', {
            target: {
                value: 'bar',
            },
        });

        /** Assert setSignInErrorFieldsToDefault have been called and just one time*/
        expect(setSignInErrorFieldsToDefault).toHaveBeenCalled();
        expect(setSignInErrorFieldsToDefault).toHaveBeenCalledTimes(1);

        /** Assert setSignInFieldsMessagesToDefault have been called and just one time */
        expect(setSignInFieldsMessagesToDefault).toHaveBeenCalled();
        expect(setSignInFieldsMessagesToDefault).toHaveBeenCalledTimes(1);
    });

    test('Is text fields property error equals true if fields filled incorrectly', () => {
        /** Create dom tree */
        const tree = shallow(<Component
            {...requiredProps}
            errorFields={{
                email: true,
                password: true,
            }}
            fieldsMessages={{
                email: 'foo',
                password: 'bar',
            }}
            setSignInErrorFieldsToDefault={setSignInErrorFieldsToDefault}
        />);

        /** Assert that both text fields have errors */
        expect((tree.find(`[data-testid='signin-email-input']`).props() as any).error).toBeTruthy();
        expect((tree.find(`[data-testid='signin-password-input']`).props() as any).error).toBeTruthy();

        /** Simulate onChange event */
        tree.find(`[data-testid='signin-email-input']`).simulate('change', { target: { value: 'foo' } });

        /** Assert functions for setting errors to default have been called */
        expect(setSignInErrorFieldsToDefault).toHaveBeenCalled();
        expect(setSignInFieldsMessagesToDefault).toHaveBeenCalled();
    });
});
