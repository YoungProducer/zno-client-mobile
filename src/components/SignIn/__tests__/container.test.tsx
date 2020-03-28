/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 29 February 2020
 *
 * Create test suites for container for SignIn component.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

/** Application's imports */
import container, { TSignInProps } from '../container';
import { fetchSignInAction } from 'store/actionCreators/auth/signin';
import {
    setSignInErrorFieldsToDefaultAction,
    setSignInFieldsMessagesToDefaultAction,
} from 'store/slices/auth/signin';
import {
    selectSignInLoading,
    selectSignInErrorFields,
    selectSignInFieldsMessages,
} from 'store/selectors/auth/signin';

/** Mock modules */
jest.mock('store/actionCreators/auth/signin');
jest.mock('store/slices/auth/signin');
jest.mock('store/selectors/auth/signin');

describe('SignIn container', () => {
    const MOCK_STATE: any = {
        auth: {
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
        },
    };

    /** Define middlewares */
    const middlewares = [thunk];

    /** Setup store mock */
    const store = configureMockStore(middlewares)(MOCK_STATE);

    afterEach(() => {
        store.clearActions();
    });

    test('Sets fetchSignIn prop on component', () => {
        /** Setup action creator mock */
        const MOCK_ACTION = {
            type: 'async',
        };
        (fetchSignInAction as unknown as jest.Mock)
            .mockReturnValue(MOCK_ACTION);

        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via the HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract the fetchSignIn prop */
        const { fetchSignIn } =
            componentWrapper.find('TestComponent').props() as TSignInProps;

        /** Invoke fetchSignIn */
        fetchSignIn({ email: 'foo', password: 'foo', remember: false });

        /** Assert the correct keys have been added to the component */
        expect(store.getActions()).toEqual([MOCK_ACTION]);
    });

    test('Sets setSignInErrorFieldsToDefault prop on component', () => {
        /** Setup action creator mock */
        const MOCK_ACTION = {
            type: 'foo',
        };
        (setSignInErrorFieldsToDefaultAction as unknown as jest.Mock)
            .mockReturnValue(MOCK_ACTION);

        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via the HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract the setSignInErrorFieldsToDefault prop */
        const { setSignInErrorFieldsToDefault } =
            componentWrapper.find('TestComponent').props() as TSignInProps;

        /** Invoke setSignInErrorFieldsToDefault */
        setSignInErrorFieldsToDefault();

        /** Assert the correct keys have been added to the component */
        expect(store.getActions()).toEqual([MOCK_ACTION]);
    });

    test('Sets setSignInFieldsMessagesToDefault prop on component', () => {
        /** Setup action creator mock */
        const MOCK_ACTION = {
            type: 'foo',
        };
        (setSignInFieldsMessagesToDefaultAction as unknown as jest.Mock)
            .mockReturnValue(MOCK_ACTION);

        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via the HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract the setSignInFieldsMessagesToDefault prop */
        const { setSignInFieldsMessagesToDefault } =
            componentWrapper.find('TestComponent').props() as TSignInProps;

        /** Invoke setSignInFieldsMessagesToDefault */
        setSignInFieldsMessagesToDefault();

        /** Assert the correct keys have been added to the component */
        expect(store.getActions()).toEqual([MOCK_ACTION]);
    });

    test('Sets loading prop on component', () => {
        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via the HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Stub selector */
        (selectSignInLoading as unknown as jest.Mock)
            .mockReturnValue(true);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract the loading prop */
        const { loading } =
            componentWrapper.find('TestComponent').props() as TSignInProps;

        /** Assert the loading prop is as expected */
        expect(loading).toBeTruthy();
    });

    test('Sets errorFields prop on component', () => {
        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via the HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Stub selector */
        (selectSignInErrorFields as unknown as jest.Mock)
            .mockReturnValue({
                email: false,
                password: false,
            });

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract the loading prop */
        const { errorFields } =
            componentWrapper.find('TestComponent').props() as TSignInProps;

        /** Assert the loading prop is as expected */
        expect(errorFields).toEqual({
            email: false,
            password: false,
        });
    });

    test('Sets fieldsMessages prop on component', () => {
        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via the HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Stub selector */
        (selectSignInFieldsMessages as unknown as jest.Mock)
            .mockReturnValue({
                email: 'foo',
                password: 'bar',
            });

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract the loading prop */
        const { fieldsMessages } =
            componentWrapper.find('TestComponent').props() as TSignInProps;

        /** Assert the loading prop is as expected */
        expect(fieldsMessages).toEqual({
            email: 'foo',
            password: 'bar',
        });
    });
});
