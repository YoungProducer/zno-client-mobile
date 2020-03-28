/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 4 March 2020
 *
 * Create test suites for SubjectConfigurationModal component.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { shallow } from 'enzyme';

/** Application's imports */
import Component from '../Component';
import { ETestTypes, TSubjectConfigurationModalProps, EExamTypes } from '../container';

const push = jest.fn();

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        pathname: '/subject-selection',
    }),
    useHistory: jest.fn(() => ({
        push,
    })),
    useParams: () => ({
        subjectId: 'foo',
    }),
}));

describe('SubjectConfigurationModal component', () => {
    /** Create mocked functions for props */
    const fetchSubjectConfiguration = jest.fn();
    const toggleSubjectConfigurationDialog = jest.fn();

    /** Define required props */
    const requiredProps: TSubjectConfigurationModalProps = {
        fetchSubjectConfiguration,
        toggleSubjectConfigurationDialog,
        isLoggedIn: false,
        dialogVisible: true,
        loading: false,
        subjectData: {
            name: 'foo',
            id: '123',
        },
        subSubjectsData: null,
        subSubjectsThemes: null,
        subjectExams: null,
        subjectThemes: null,
    };

    beforeEach(() => {
        push.mockReset();
        (requiredProps.fetchSubjectConfiguration as jest.Mock).mockReset();
        (requiredProps.toggleSubjectConfigurationDialog as jest.Mock).mockReset();
    });

    test('Is match snapshot', () => {
        /** Render component in shallow via enzyme */
        const tree = shallow(<Component {...requiredProps} />);

        /** Assert component matches snapshot */
        expect(tree).toMatchSnapshot();
    });

    test('Select test type', () => {
        /** Render component */
        const tree = shallow(<Component {...requiredProps} />);

        /** Simulate change event */
        tree.find(`[data-testid='select-test-type']`).simulate('change', {
            target: {
                value: ETestTypes.THEMES,
            },
        });

        /** Assert testType has correct value */
        expect(tree.find(`[data-testid='select-test-type']`).props().value).toEqual(ETestTypes.THEMES);
    });

    test('Dialog close button handler', () => {
        /** Render component */
        const tree = shallow(<Component {...requiredProps} />);

        /** Simulate click on 'close' button */
        tree.find(`[data-testid='close-subject-conf-button']`)
            .simulate('click');

        /** Assert 'toggleSubjectConfigurationDialog' function has been called */
        expect(toggleSubjectConfigurationDialog).toHaveBeenCalled();
    });

    test(`If subSubjectsNames is not null and testType equals 'THEMES' component should render sub-subject selection text-field`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subSubjectsData={[{
                    name: 'foo',
                    id: '123',
                }]}
            />,
        );

        /** Assert sub-subject selection text-field doesn't exist */
        expect(tree.exists(`[data-testid='select-sub-subject']`)).toBeFalsy();

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`).simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert sub-subject selection text-field exists */
        expect(tree.exists(`[data-testid='select-sub-subject']`)).toBeTruthy();
    });

    test(`If subSubjectsNames is null select-sub-subject text field shouldn't exists`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subSubjectsData={null}
            />,
        );

        /** Assert sub-subject selection text-field doesn't exist */
        expect(tree.exists(`[data-testid='select-sub-subject']`)).toBeFalsy();

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`).simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert sub-subject selection text-field exists */
        expect(tree.exists(`[data-testid='select-sub-subject']`)).toBeFalsy();
    });

    test(`If subSubjectsNames is not null and testType equals 'THEMES' select sub-subject`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subSubjectsData={[{
                    name: 'foo',
                    id: '123',
                }]}
            />,
        );

        /** Assert sub-subject selection text-field doesn't exist */
        expect(tree.exists(`[data-testid='select-sub-subject']`)).toBeFalsy();

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`).simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert sub-subject selection text-field exists */
        expect(tree.exists(`[data-testid='select-sub-subject']`)).toBeTruthy();

        /** Simulate onChange event in select-sub-subject text-field */
        tree.find(`[data-testid='select-sub-subject']`).simulate('change', { target: { value: 'foo' } });

        /** Assert select-sub-subject has value 'foo' */
        expect(tree.find(`[data-testid='select-sub-subject']`).props().value).toEqual('foo');
    });

    test(`If subjectThemes is null select-subject-theme text field shouldn't exist`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectThemes={null}
                subSubjectsData={null}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`).simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert select-sub-themes selection doesn't exist */
        expect(tree.exists(`[data-testid='select-subject-theme']`)).toBeFalsy();
    });

    test(`If subjectThemes is not null and testType equals 'Themes' select-subject-theme text field should exists`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectThemes={['bar']}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`).simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert select-sub-themes selection exists */
        expect(tree.exists(`[data-testid='select-subject-theme']`)).toBeTruthy();
    });

    test(`If subjectThemes is not null and testType equals 'Themes' select theme`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectThemes={['bar']}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`).simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert select-subject-theme selection text-field exists */
        expect(tree.exists(`[data-testid='select-subject-theme']`)).toBeTruthy();

        /** Simulate onChange event in select-subject-theme text field */
        tree.find(`[data-testid='select-subject-theme']`).simulate('change', { target: { value: 'bar' } });

        /** Assert select-subject-theme text field has correct value */
        expect(tree.find(`[data-testid='select-subject-theme']`).props().value).toBe('bar');
    });

    test(`If subSubjectThemes is not null and testType equals 'Themes' component should display theme selection`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subSubjectsData={[{
                    name: 'foo',
                    id: '123',
                }]}
                subSubjectsThemes={{ foo: ['bar'] }}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert select-subject-theme selection text-field exists */
        expect(tree.exists(`[data-testid='select-subject-theme']`)).toBeTruthy();
    });

    test(`If 'subjectThemes' exists after selection of test type, theme selection text field should set '0' el of array as default`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectThemes={['foo', 'bar']}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert select-subject-theme text field has right value */
        expect(tree.find(`[data-testid='select-subject-theme']`).props().value).toBe('foo');
    });

    test(`If 'subSubjectThemes' exists, after selecto of the test type, theme selection text field should set '0' el of array as default value`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subSubjectsData={[{
                    name: 'foo',
                    id: '123',
                }]}
                subSubjectsThemes={{ foo: ['bar', 'abc'] }}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert select-subject-theme text field has right value */
        expect(tree.find(`[data-testid='select-subject-theme']`).props().value).toBe('bar');
    });

    test(`If subSubjectName doesn't exist in subSubjectThemes`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subSubjectsData={[{
                    name: 'foo',
                    id: '123',
                }]}
                subSubjectsThemes={{ zoo: ['bar'] }}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert select-subject-theme selection text-field exists */
        expect(tree.exists(`[data-testid='select-subject-theme']`)).toBeTruthy();
    });

    test(`If 'subjectExams' exists select exam type if test type equals 'THEMES'`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectExams={{
                    sessions: ['foo'],
                    trainings: ['bar'],
                }}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.EXAMS } });

        /** Assert select-test-type field has value 'EXAMS' */
        expect(tree.find(`[data-testid='select-test-type']`).props().value).toBe(ETestTypes.EXAMS);

        /** Assert select-exam-type field exists */
        expect(tree.exists(`[data-testid='select-exam-type']`)).toBeTruthy();

        /** Simulate onChange event in select-exam-type text field */
        tree.find(`[data-testid='select-exam-type']`)
            .simulate('change', { target: { value: EExamTypes.TRAININGS } });

        /** Assert select-exam-type field has value 'TRAININGS' */
        expect(tree.find(`[data-testid='select-exam-type']`).props().value).toBe(EExamTypes.TRAININGS);
    });

    test(`If 'subjectExams' doesn't exist component shouldn't display exam type selection`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectExams={null}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.EXAMS } });

        /** Assert select-test-type field has value 'EXAMS' */
        expect(tree.find(`[data-testid='select-test-type']`).props().value).toBe(ETestTypes.EXAMS);

        /** Assert select-exam-type field doesn't exist */
        expect(tree.exists(`[data-testid='select-exam-type']`)).toBeFalsy();
    });

    test(`Check is select-exam label has right value`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectExams={{
                    trainings: ['foo'],
                    sessions: ['bar'],
                }}
            />,
        );

        /** Select 'EXAMS' test type */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.EXAMS } });

        /** Select 'TRAININGS' exam type */
        tree.find(`[data-testid='select-exam-type']`)
            .simulate('change', { target: { value: EExamTypes.TRAININGS } });

        /** Assert select-exam label has right value */
        expect(tree.find(`[data-testid='select-exam-title']`).props().children).toBe('Виберіть тренувальний варіант');

        /** Select 'SESSIONS' exam type */
        tree.find(`[data-testid='select-exam-type']`)
            .simulate('change', { target: { value: EExamTypes.SESSIONS } });

        expect(tree.find(`[data-testid='select-exam-title']`).props().children).toBe('Виберіть варіант ЗНО');
    });

    test(`Check is after exam type selection select-exam text field should has right value`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectExams={{
                    trainings: ['foo'],
                    sessions: ['bar'],
                }}
            />,
        );

        /** Select 'EXAMS' test type */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.EXAMS } });

        /** Select 'TRAININGS' exam type */
        tree.find(`[data-testid='select-exam-type']`)
            .simulate('change', { target: { value: EExamTypes.TRAININGS } });

        /** Assert select-exam text field has right value */
        expect(tree.find(`[data-testid='select-exam']`).props().value).toEqual('foo');

        /** Select 'SESSIONS' exam type */
        tree.find(`[data-testid='select-exam-type']`)
            .simulate('change', { target: { value: EExamTypes.SESSIONS } });

        /** Assert select-exam text field has right value */
        expect(tree.find(`[data-testid='select-exam']`).props().value).toEqual('bar');
    });

    test(`If property 'trainings' is null exam value shouldn't be displayed`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectExams={{
                    trainings: null,
                    sessions: ['bar'],
                }}
            />,
        );

        /** Select 'EXAMS' test type */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.EXAMS } });

        /** Select 'TRAININGS' exam type */
        tree.find(`[data-testid='select-exam-type']`)
            .simulate('change', { target: { value: EExamTypes.TRAININGS } });

        /** Assert select-exam text field is not displayed */
        expect(tree.exists(`[data-testid='select-exam']`)).toBeFalsy();
    });

    test(`If property 'sessions' is null exam value shouldn't be displayed`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectExams={{
                    trainings: ['foo'],
                    sessions: null,
                }}
            />,
        );

        /** Select 'EXAMS' test type */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.EXAMS } });

        /** Select 'SESSIONS' exam type */
        tree.find(`[data-testid='select-exam-type']`)
            .simulate('change', { target: { value: EExamTypes.SESSIONS } });

        /** Assert select-exam text field is not displayed */
        expect(tree.exists(`[data-testid='select-exam']`)).toBeFalsy();
    });

    test(`Check is after exam selection select-exam field has right value`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectExams={{
                    trainings: ['foo'],
                    sessions: ['bar'],
                }}
            />,
        );

        /** Select 'EXAMS' test type */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.EXAMS } });

        /** Select 'SESSIONS' exam type */
        tree.find(`[data-testid='select-exam-type']`)
            .simulate('change', { target: { value: EExamTypes.SESSIONS } });

        /** Simulate onChange event in select-exam text field */
        tree.find(`[data-testid='select-exam']`)
            .simulate('change', { target: { value: 'bar' } });

        /** Assert select-exam texi field has right value */
        expect(tree.find(`[data-testid='select-exam']`).props().value).toBe('bar');
    });

    test('Check is after sub-subject selection select-subject-theme has right value', () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subSubjectsData={[{
                    name: 'foo',
                    id: '123',
                }, {
                    name: 'abc',
                    id: '456',
                }]}
                subSubjectsThemes={{ foo: ['bar'], abc: ['123', '456'] }}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert select-subject-theme text field has right value */
        expect(tree.find(`[data-testid='select-subject-theme']`).props().value).toBe('bar');

        /** Select 'abc' sub-subject */
        tree.find(`[data-testid='select-sub-subject']`)
            .simulate('change', { target: { value: 'abc' } });

        /** Assert select-sub-subject has value 'abc' */
        expect(tree.find(`[data-testid='select-sub-subject']`).props().value).toBe('abc');

        /** Select second element in 'abc' array */
        tree.find(`[data-testid='select-subject-theme']`)
            .simulate('change', { target: { value: '456' } });

        /** Assert select-subject-theme text field has value '456' */
        expect(tree.find(`[data-testid='select-subject-theme']`).props().value).toBe('456');

        /** Select 'foo' sub-subject */
        tree.find(`[data-testid='select-sub-subject']`)
            .simulate('change', { target: { value: 'foo' } });

        /** Assert select-subject-theme text field value is first element of 'foo' array - 'bar' */
        expect(tree.find(`[data-testid='select-subject-theme']`).props().value).toBe('bar');
    });

    test(`If 'subSubject' doesn't exist in subSubjectThemes, select-subject-theme value should be ''`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subSubjectsData={[{
                    name: 'foo',
                    id: '123',
                }, {
                    name: 'abc',
                    id: '456',
                }]}
                subSubjectsThemes={{ foo: ['bar'], abcd: ['123', '456'] }}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert select-subject-theme text field has right value */
        expect(tree.find(`[data-testid='select-subject-theme']`).props().value).toBe('bar');

        /** Select 'abc' sub-subjec */
        tree.find(`[data-testid='select-sub-subject']`)
            .simulate('change', { target: { value: 'abc' } });

        /** Assert select-subject-theme text field has empty value */
        expect(tree.find(`[data-testid='select-subject-theme']`).props().value).toBe('');
    });

    test(`If theme or exam is not selected 'go-to-test' button should be disabled`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectThemes={['foo', 'bar']}
            />,
        );

        /** Assert 'go-to-test' button is disabled */
        expect(tree.find(`[data-testid='go-to-test']`).props().disabled).toBeTruthy();
    });

    test(`If theme or exam is selected 'go-to-test' butotn shouldn't be disabled`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectThemes={['foo', 'bar']}
                subjectExams={{
                    sessions: ['foo123'],
                    trainings: ['bar456'],
                }}
            />,
        );

        /** Select test type 'THEMES' */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert 'go-to-test' button is active */
        expect(tree.find(`[data-testid='go-to-test']`).props().disabled).toBeFalsy();

        /** Select test type 'EXAMS' */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.EXAMS } });

        /** Select exam type */
        tree.find(`[data-testid='select-exam-type']`)
            .simulate('change', { target: { value: EExamTypes.SESSIONS } });

        /** Assert 'go-to-test' button is active */
        expect(tree.find(`[data-testid='go-to-test']`).props().disabled).toBeFalsy();

        /** Select exam type */
        tree.find(`[data-testid='select-exam-type']`)
            .simulate('change', { target: { value: EExamTypes.TRAININGS } });

        /** Assert 'go-to-test' button is active */
        expect(tree.find(`[data-testid='go-to-test']`).props().disabled).toBeFalsy();
    });

    test('Go to test button with selected theme should call push method with right args', () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectThemes={['foo', 'bar']}
            />,
        );

        /** Select test type 'THEMES' */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Simulate button click */
        tree.find(`[data-testid='go-to-test']`)
            .simulate('click');

        /** Assert push method called with right args */
        expect(push).toBeCalledWith('/test-suite?subjectId=123&theme=foo&showRightDuringTest=false');
    });

    test('Go to test button with sub-subjects and themes', () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subSubjectsData={[{
                    name: 'foo',
                    id: '123',
                }, {
                    name: 'abc',
                    id: '456',
                }]}
                subSubjectsThemes={{
                    foo: ['bar123', '456'],
                    abc: ['bar', 'bbb'],
                }}
            />,
        );

        /** Select test type 'THEMES' */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Simulate button click */
        tree.find(`[data-testid='go-to-test']`)
            .simulate('click');

        /** Assert push method called with right args */
        expect(push).toBeCalledWith('/test-suite?subjectId=123&subSubjectId=123&theme=bar123&showRightDuringTest=false');
    });

    test('Go to test button with exams', () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectExams={{
                    trainings: ['foo'],
                    sessions: ['bar'],
                }}
            />,
        );

        /** Select test type 'THEMES' */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.EXAMS } });

        /** Select exam type */
        tree.find(`[data-testid='select-exam-type']`)
            .simulate('change', { target: { value: EExamTypes.SESSIONS } });

        /** Simulate button click */
        tree.find(`[data-testid='go-to-test']`)
            .simulate('click');

        /** Assert push method called with right args */
        expect(push).toBeCalledWith('/test-suite?subjectId=123&session=bar&limitTime=false');

        /** Select exam type */
        tree.find(`[data-testid='select-exam-type']`)
            .simulate('change', { target: { value: EExamTypes.TRAININGS } });

        /** Simulate button click */
        tree.find(`[data-testid='go-to-test']`)
            .simulate('click');

        /** Assert push method called with right args */
        expect(push).toBeCalledWith('/test-suite?subjectId=123&showRightDuringTest=false&training=foo&limitTime=false');
    });
});
