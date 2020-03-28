/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 22 March 2020
 *
 * Create test suites for container for TestSuite component.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';

/** Application's imports */
import applicationsMiddlewares from 'store/middlewares';
import container, { TTestSuiteProps } from '../container';
import { fetchTestSuiteAction } from 'store/actionCreators/testSuite';
import {
    selectTestSuiteName,
    selectTestSuiteTasksImages,
    selectTestSuiteExplanationsImages,
} from 'store/selectors/testSuite';
import { RootState } from 'store/slices';

/** Mock modules */
jest.mock('store/selectors/testSuite');
jest.mock('store/actionCreators/testSuite');

describe('TestSuite container', () => {
    /** Define state for mock */
    const MOCK_STATE = {
        testSuite: {
            loading: false,
        },
    } as RootState;

    /** Define middlewares */
    const middlewares = [thunk, ...applicationsMiddlewares];

    /** Create mocked store */
    const store = configureMockStore(middlewares)(MOCK_STATE);

    afterEach(() => {
        store.clearActions();
    });

    test('Sets fetchTestSuite prop on component', () => {
        /** Setup action creator mock */
        const MOCK_ACTION = {
            type: 'foo123',
        };
        (fetchTestSuiteAction as jest.Mock)
            .mockReturnValue(MOCK_ACTION);

        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Mount via Enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract fetchTestSuite from component props */
        const { fetchTestSuite } =
            componentWrapper.find('TestComponent').props() as TTestSuiteProps;

        /** Invoke fetchTestSuite */
        fetchTestSuite({ subjectId: 'foo' });

        /** Assert the correct keys have been added to the component */
        expect(store.getActions()).toEqual([MOCK_ACTION]);
    });

    test('Sets name prop on component', () => {
        /** Setup selector stub */
        const MOCK_SELECTOR = 'foo';
        (selectTestSuiteName as jest.Mock)
            .mockReturnValue(MOCK_SELECTOR);

        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Mount via Enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract name from component props */
        const { name } =
            componentWrapper.find('TestComponent').props() as TTestSuiteProps;

        /** Assert the correct keys have been added to the component */
        expect(name).toBe(MOCK_SELECTOR);
    });

    test('Sets tasksImages prop on component', () => {
        /** Setup selector stub */
        const MOCK_SELECTOR = ['foo'];
        (selectTestSuiteTasksImages as jest.Mock)
            .mockReturnValue(MOCK_SELECTOR);

        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Mount via Enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract tasksImages from component props */
        const { tasksImages } =
            componentWrapper.find('TestComponent').props() as TTestSuiteProps;

        /** Assert the correct keys have been added to the component */
        expect(tasksImages).toBe(MOCK_SELECTOR);
    });

    test('Sets explanationsImages prop on component', () => {
        /** Setup selector stub */
        const MOCK_SELECTOR = ['foo'];
        (selectTestSuiteExplanationsImages as jest.Mock)
            .mockReturnValue(MOCK_SELECTOR);

        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Mount via Enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract explanationsImages from component props */
        const { explanationsImages } =
            componentWrapper.find('TestComponent').props() as TTestSuiteProps;

        /** Assert the correct keys have been added to the component */
        expect(explanationsImages).toBe(MOCK_SELECTOR);
    });
});
