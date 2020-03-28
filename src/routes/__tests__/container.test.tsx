/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 29 February 2020
 *
 * Create test suites for container for routes component.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

/** Application's imporst */
import container, { TRoutesProps } from '../container';

describe('Routes container', () => {
    const MOCK_STATE: any = {
        auth: {
            signIn: {
                user: {
                    email: 'foo',
                },
            },
        },
    };

    /** Configure mock store */
    const store = configureMockStore()(MOCK_STATE);

    afterEach(() => {
        store.clearActions();
    });

    test('Set loggedIn prop on component', () => {
        /** Create stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Assert the correct keys have been added to the component */
        expect((componentWrapper.find('TestComponent').props() as TRoutesProps).isLoggedIn).toBeTruthy();
    });
});
