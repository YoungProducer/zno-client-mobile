/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 2 March 2020
 *
 * Create test suites for AppBar container.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { mount } from 'enzyme';
import confgiureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

/** Application's imports */
import container, { TAppBarProps } from '../container';
import { RootState } from 'store/slices';

describe('AppBar container', () => {
    const MOCK_STATE = {
        subjects: {
            subjectsList: [],
        },
    } as RootState;

    /** Create mockes store */
    const store = confgiureMockStore()(MOCK_STATE);

    afterEach(() => {
        store.clearActions();
    });

    test('applies classes on component', () => {
        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Confgire component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract classes prop */
        const { classes } =
            componentWrapper.find('TestComponent').props() as TAppBarProps;

        /** Assert the correct keys have been added to the component */
        expect(classes).toHaveProperty('root');
        expect(classes).toHaveProperty('container');
        expect(classes).toHaveProperty('navLink');
    });
});
