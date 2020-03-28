/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 27 February 2020
 *
 * Create test suites for SignUp container.
 * @jest-environment jsdom
 */

// External imports
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Application's imports
import {
    setSignUpErrorFieldsToDefaultAction,
    setSignUpFieldsMessagesToDefaultAction,
} from 'store/slices/auth';
import container, { TSignUpProps } from '../container';

// Test mocks
jest.mock('store/slices/auth');

describe('SignUp container', () => {
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
        },
    };

    // Define middlewares
    const middlewares = [thunk];

    // Setup store mock
    const store = configureMockStore(middlewares)(MOCK_STATE);

    afterEach(() => {
        store.clearActions();
    });

    test('Sets setSignUpFieldsMessagesToDefault prop on component', () => {
        // Setup action creator mock
        const MOCK_ACTION = {
            type: 'abc123',
        };
        (setSignUpFieldsMessagesToDefaultAction as unknown as jest.Mock)
            .mockReturnValue(MOCK_ACTION);

        // Create a stub component to wrap
        const TestComponent = () => <div />;

        // Configure the component via the HOC
        const ConfiguredComponent = container(TestComponent);

        // Mount via enzyme
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        // Extract the setSignUpFieldsMessagesToDefault prop
        const { setSignUpFieldsMessagesToDefault } =
            componentWrapper.find('TestComponent').props() as TSignUpProps;

        // Invoke setSignUpFieldsMessagesToDefault
        setSignUpFieldsMessagesToDefault();

        // Assert the correct keys have been added to the component
        expect(store.getActions()).toEqual([MOCK_ACTION]);
    });

    test('Sets setSignUpErrorFieldsToDefault prop on component', () => {
        // Setup action creator mock
        const MOCK_ACTION = {
            type: 'abc123',
        };
        (setSignUpErrorFieldsToDefaultAction as unknown as jest.Mock)
            .mockReturnValue(MOCK_ACTION);

        // Create a stub component to wrap
        const TestComponent = () => <div />;

        // Configure the component via the HOC
        const ConfiguredComponent = container(TestComponent);

        // Mount via enzyme
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        // Extract the setSignUpErrorFieldsToDefault prop
        const { setSignUpErrorFieldsToDefault } =
            componentWrapper.find('TestComponent').props() as TSignUpProps;

        // Invoke setSignUpErrorFieldsToDefault
        setSignUpErrorFieldsToDefault();

        // Assert the correct keys have been added to the component
        expect(store.getActions()).toEqual([MOCK_ACTION]);
    });
});
