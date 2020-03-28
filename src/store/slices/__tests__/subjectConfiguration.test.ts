/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 March 2020
 *
 * Create test suites for subjectConfiguration slice.
 */

/** Application's imports */
import subjectConfiguration, {
    setSubjectConfigAction,
    toggleSubjectConfigurationDialogAction,
    subjectConfigurationLoadingAction,
    ISubjectConfigurationInitialState,
    TSubjectConfig,
} from '../subjectConfiguration';

describe('SubjectConfiguration slice', () => {
    test('subjectsConfigurationLoadingAction toggle to true', () => {
        /** Define initial state */
        const initialState = {
            loading: false,
        } as ISubjectConfigurationInitialState;

        /** Get result of dispatched action */
        const result = subjectConfiguration(initialState, subjectConfigurationLoadingAction(true));

        /** Assert loading equals true */
        expect(result.loading).toBeTruthy();
    });

    test('subjectsConfigurationLoadingAction toggle to false', () => {
        /** Define initial state */
        const initialState = {
            loading: true,
        } as ISubjectConfigurationInitialState;

        /** Get result of dispatched action */
        const result = subjectConfiguration(initialState, subjectConfigurationLoadingAction(false));

        /** Assert loading equals false */
        expect(result.loading).toBeFalsy();
    });

    test('toggleSubjectConfigurationDialogAction open', () => {
        /** Define initial state */
        const initialState = {
            dialogVisible: false,
        } as ISubjectConfigurationInitialState;

        /** Get result of dispatched action */
        const result = subjectConfiguration(initialState, toggleSubjectConfigurationDialogAction(true));

        /** Assert loading equals false */
        expect(result.dialogVisible).toBeTruthy();
    });

    test('toggleSubjectConfigurationDialogAction close', () => {
        /** Define initial state */
        const initialState = {
            dialogVisible: true,
        } as ISubjectConfigurationInitialState;

        /** Get result of dispatched action */
        const result = subjectConfiguration(initialState, toggleSubjectConfigurationDialogAction(false));

        /** Assert loading equals false */
        expect(result.dialogVisible).toBeFalsy();
    });

    test('setSubjectConfigAction with payload', () => {
        /** Define initial state */
        const initialState = {
            subjectConfig: null,
        } as ISubjectConfigurationInitialState;

        /** Define payload for setSubjectConfigAction */
        const payload: TSubjectConfig = {
            name: 'foo',
            id: 'abc',
            themes: ['bar'],
        };

        /** Get result of action */
        const result = subjectConfiguration(initialState, setSubjectConfigAction(payload));

        /** Assert subjectConfig equals to payload */
        expect(result.subjectConfig).toEqual(payload);
    });

    test('setSubjectConfigAction without payload', () => {
        /** Define initial state */
        const initialState = {
            subjectConfig: {
                name: 'foo',
            },
        } as ISubjectConfigurationInitialState;

        /** Get result of action */
        const result = subjectConfiguration(initialState, setSubjectConfigAction());

        /** Assert subjectConfig equals to null */
        expect(result.subjectConfig).toBeNull();
    });
});
