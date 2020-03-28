/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Create test suites for subjetcs selectors.
 */

/** Application's imports */
import {
    selectSubjectsList,
    selectSubjectsLoading,
} from 'store/selectors/subjects';
import { RootState } from 'store/slices';

describe('Subjects selectors', () => {
    test('selectSubjectsLoading', () => {
        /** Mock state */
        const MOCK_STATE = {
            subjects: {
                loading: false,
            },
        } as RootState;

        /** Get result of selector */
        const result = selectSubjectsLoading(MOCK_STATE);

        /** Assert selector returns right value */
        expect(result).toBeFalsy();
    });

    test('selectSubjectsList', () => {
        /** Mock state */
        const MOCK_STATE = {
            subjects: {
                subjectsList: [{
                    id: 'foo',
                    name: 'math',
                    image: 'bar',
                }],
            },
        } as RootState;

        /** Get result of selector */
        const result = selectSubjectsList(MOCK_STATE);

        /** Assert selector returns array with one element */
        expect(result).toHaveLength(1);
        expect(result).toEqual([{
            id: 'foo',
            name: 'math',
            image: 'bar',
        }]);
    });

    test('selectSubjectsList when subjectsList is empty', () => {
        /** Mock state */
        const MOCK_STATE = {
            subjects: {
                subjectsList: [],
            },
        } as RootState;

        /** Get result of selector */
        const result = selectSubjectsList(MOCK_STATE);

        /** Assert selector returns array with one element */
        expect(result).toHaveLength(0);
    });
});
