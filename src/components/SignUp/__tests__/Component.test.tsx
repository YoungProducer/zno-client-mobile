/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create test suites for SignUp Component.
 * @jest-environment jsdom
 */

// External imports
import React from 'react';
import { shallow, mount } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';

// Application's imports
import api from 'api';
import Component from '../Component';
import { TSignUpProps } from '../container';

describe('SignUp component', () => {
    // Mock props functions
    const fetchSignUp = jest.fn();
    const setSignUpErrorFieldsToDefault = jest.fn();
    const setSignUpFieldsMessagesToDefault = jest.fn();

    const requiredProps: TSignUpProps = {
        fetchSignUp,
        setSignUpErrorFieldsToDefault,
        setSignUpFieldsMessagesToDefault,
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
        loading: false,
    };

    beforeEach(() => {
        (requiredProps.fetchSignUp as jest.Mock).mockReset();
        (requiredProps.setSignUpErrorFieldsToDefault as jest.Mock).mockReset();
        (requiredProps.setSignUpFieldsMessagesToDefault as jest.Mock).mockReset();
    });

    test('Is matches snapshot', () => {
        // Render shallow component
        const root = shallow(<Component {...requiredProps}/>);

        // Check is component matches snapshot
        expect(root).toMatchSnapshot();
    });

    test('Is fetchSignUp will be called with right args', () => {
        /** Mount component */
        const wrapper = shallow(<Component {...requiredProps}/>);

        /** Simulate onChange events */
        wrapper
            .find(`[data-testid='signup-email-input']`)
            .simulate('change', { target: { value: 'foo' } });
        wrapper
            .find(`[data-testid='signup-password-input']`)
            .simulate('change', { target: { value: 'bar' } });
        wrapper
            .find(`[data-testid='signup-conf-password-input']`)
            .simulate('change', { target: { value: 'abc' } });

        /** Simulate sign up button click */
        wrapper
            .find(`[data-testid='signup-button']`)
            .simulate('click');

        /** Assert fetchSignUp have been called with right args */
        expect(fetchSignUp).toBeCalledWith({
            email: 'foo',
            password: 'bar',
            confPassword: 'abc',
        });
    });

    test(`Is makes api call to signup endpoint when press button 'Реєстрація'`, () => {
        /** Mount component */
        const wrapper = shallow(<Component {...requiredProps}/>);

        /** Select signup button */
        const signUpButton = wrapper.find(`[data-testid='signup-button']`);

        /** Simulate click for signup button */
        signUpButton.simulate('click');

        /** Assert that fetchSignUp have been called */
        expect(fetchSignUp).toHaveBeenCalled();
    });
});
