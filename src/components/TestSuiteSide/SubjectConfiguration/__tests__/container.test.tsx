/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 4 March 2020
 *
 * Create test suites for SubjectConfiguration container.
 *
 * Define jest enviroment variable to render in jsdom instead of node.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

/** Application's imports */
import container, { TSubjectConfigurationModalProps } from '../container';
import { fetchSubjectConfigurationAction } from 'store/actionCreators/subjectConfiguration';
import { toggleSubjectConfigurationDialogAction } from 'store/slices/subjectConfiguration';
import {
    selectSubjectConfigurationLoading,
    selectSubjectConfigurationDialogVisible,
    selectSubjectConfigSubjectData,
    selectSubjectConfigThemes,
    selectSubjectConfigExams,
    selectSubjectConfigSubSubjectsData,
    selectSubjectConfigSubSubjectsThemes,
} from 'store/selectors/subjectConfiguration';
import { selectIsLoggedIn } from 'store/selectors/auth';
import { RootState } from 'store/slices';

/** Mock dependencies */
jest.mock('store/actionCreators/subjectConfiguration');
jest.mock('store/slices/subjectConfiguration');
jest.mock('store/selectors/subjectConfiguration');
jest.mock('store/selectors/auth');

describe('SubjectConfiguration container', () => {
    const MOCK_STATE = {
        subjectConfiguration: {
            dialogVisible: false,
        },
        auth: {
            signIn: {
                user: null,
            },
        },
    } as RootState;

    /** Define middlewares */
    const middlewares = [thunk];

    /** Create mocked store */
    const store = configureMockStore(middlewares)(MOCK_STATE);

    afterEach(() => {
        store.clearActions();
    });

    test('Sets fetchSubjectConfiguration prop on component', () => {
        /** Create stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Create stub for action creator */
        const MOCK_ACTION = {
            type: 'abc',
        };
        (fetchSubjectConfigurationAction as jest.Mock)
            .mockReturnValue(MOCK_ACTION);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract fetchSubjectConfiguration prop */
        const { fetchSubjectConfiguration }
            = componentWrapper.find('TestComponent').props() as TSubjectConfigurationModalProps;

        /** Invoke fetchSubjectConfiguration */
        fetchSubjectConfiguration({ id: 'foo' });

        /** Assert the correct key have been added to the component */
        expect(store.getActions()).toEqual([MOCK_ACTION]);
    });

    test('Sets toggleSubjectConfigurationDialog prop on component', () => {
        /** Create stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Create stub for action creator */
        const MOCK_ACTION = {
            type: 'abc',
        };
        (toggleSubjectConfigurationDialogAction as unknown as jest.Mock)
            .mockReturnValue(MOCK_ACTION);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract toggleSubjectConfigurationDialog prop */
        const { toggleSubjectConfigurationDialog }
            = componentWrapper.find('TestComponent').props() as TSubjectConfigurationModalProps;

        /** Invoke toggleSubjectConfigurationDialog */
        toggleSubjectConfigurationDialog(true);

        /** Assert the correct key have been added to the component */
        expect(store.getActions()).toEqual([MOCK_ACTION]);
    });

    test('Sets isLoggedIn prop on component', () => {
        /** Create stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Create stub for selector */
        const MOCK_SELECTOR = false;
        (selectIsLoggedIn as unknown as jest.Mock)
            .mockReturnValue(MOCK_SELECTOR);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract loading prop */
        const { isLoggedIn } =
            componentWrapper.find('TestComponent').props() as TSubjectConfigurationModalProps;

        /** Assert the correct key and value have been added to the component */
        expect(isLoggedIn).toEqual(MOCK_SELECTOR);
    });

    test('Sets loading prop on component', () => {
        /** Create stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Create stub for selector */
        const MOCK_SELECTOR = false;
        (selectSubjectConfigurationLoading as unknown as jest.Mock)
            .mockReturnValue(MOCK_SELECTOR);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract loading prop */
        const { loading } =
            componentWrapper.find('TestComponent').props() as TSubjectConfigurationModalProps;

        /** Assert the correct key and value have been added to the component */
        expect(loading).toEqual(MOCK_SELECTOR);
    });

    test('Sets dialogVisible prop on component', () => {
        /** Create stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Create stub for selector */
        const MOCK_SELECTOR = false;
        (selectSubjectConfigurationDialogVisible as unknown as jest.Mock)
            .mockReturnValue(MOCK_SELECTOR);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract loading prop */
        const { dialogVisible } =
            componentWrapper.find('TestComponent').props() as TSubjectConfigurationModalProps;

        /** Assert the correct key and value have been added to the component */
        expect(dialogVisible).toEqual(MOCK_SELECTOR);
    });

    test('Sets subjectName prop on component', () => {
        /** Create stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Create stub for selector */
        const MOCK_SELECTOR = 'foo';
        (selectSubjectConfigSubjectData as unknown as jest.Mock)
            .mockReturnValue(MOCK_SELECTOR);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract loading prop */
        const { subjectData } =
            componentWrapper.find('TestComponent').props() as TSubjectConfigurationModalProps;

        /** Assert the correct key and value have been added to the component */
        expect(subjectData).toEqual(MOCK_SELECTOR);
    });

    test('Sets subjectThemes prop on component', () => {
        /** Create stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Create stub for selector */
        const MOCK_SELECTOR = ['foo'];
        (selectSubjectConfigThemes as unknown as jest.Mock)
            .mockReturnValue(MOCK_SELECTOR);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract loading prop */
        const { subjectThemes } =
            componentWrapper.find('TestComponent').props() as TSubjectConfigurationModalProps;

        /** Assert the correct key and value have been added to the component */
        expect(subjectThemes).toEqual(MOCK_SELECTOR);
    });

    test('Sets subjectExams prop on component', () => {
        /** Create stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Create stub for selector */
        const MOCK_SELECTOR = ['foo'];
        (selectSubjectConfigExams as unknown as jest.Mock)
            .mockReturnValue(MOCK_SELECTOR);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract loading prop */
        const { subjectExams } =
            componentWrapper.find('TestComponent').props() as TSubjectConfigurationModalProps;

        /** Assert the correct key and value have been added to the component */
        expect(subjectExams).toEqual(MOCK_SELECTOR);
    });

    test('Sets subSubjectsNames prop on component', () => {
        /** Create stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Create stub for selector */
        const MOCK_SELECTOR = ['foo'];
        (selectSubjectConfigSubSubjectsData as unknown as jest.Mock)
            .mockReturnValue(MOCK_SELECTOR);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract loading prop */
        const { subSubjectsData } =
            componentWrapper.find('TestComponent').props() as TSubjectConfigurationModalProps;

        /** Assert the correct key and value have been added to the component */
        expect(subSubjectsData).toEqual(MOCK_SELECTOR);
    });

    test('Sets subSubjectsThemes prop on component', () => {
        /** Create stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Create stub for selector */
        const MOCK_SELECTOR = { foo: 'bar' };
        (selectSubjectConfigSubSubjectsThemes as unknown as jest.Mock)
            .mockReturnValue(MOCK_SELECTOR);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract loading prop */
        const { subSubjectsThemes } =
            componentWrapper.find('TestComponent').props() as TSubjectConfigurationModalProps;

        /** Assert the correct key and value have been added to the component */
        expect(subSubjectsThemes).toEqual(MOCK_SELECTOR);
    });
});
