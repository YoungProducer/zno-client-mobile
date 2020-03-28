/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 March 2020
 *
 * Create test suites for subjectConfiguration selectors.
 */

/** Application's imports */
import {
    selectSubjectConfigurationLoading,
    selectSubjectConfigurationDialogVisible,
    selectSubjectConfig,
    selectSubjectConfigSubjectData,
    selectSubjectConfigThemes,
    selectSubjectConfigExams,
    selectSubjectConfigSubSubjectsData,
    selectSubjectConfigSubSubjectsThemes,
} from 'store/selectors/subjectConfiguration';
import { RootState } from 'store/slices';

describe('SubjectConfiguration selectors', () => {
    test('selectSubjectConfigurationLoading', () => {
        /** Create mocked state */
        const MOCK_STATE = {
            subjectConfiguration: {
                loading: false,
            },
        } as RootState;

        /** Get selector's result */
        const result = selectSubjectConfigurationLoading(MOCK_STATE);

        /** Assert result equals false */
        expect(result).toBeFalsy();
    });

    test('selectSubjectConfigurationDialogVisible', () => {
        /** Create mocked state */
        const MOCK_STATE = {
            subjectConfiguration: {
                dialogVisible: false,
            },
        } as RootState;

        /** Get selector's result */
        const result = selectSubjectConfigurationDialogVisible(MOCK_STATE);

        /** Assert result has correct value */
        expect(result).toBeFalsy();
    });

    test('selectSubjectConfig', () => {
        /** Create mocked state */
        const MOCK_STATE = {
            subjectConfiguration: {
                subjectConfig: null,
            },
        } as RootState;

        /** Get selector's result */
        const result = selectSubjectConfig(MOCK_STATE);

        /** Assert result equals to property 'subjectConfig' in MOCK_STATE */
        expect(result).toEqual(MOCK_STATE.subjectConfiguration.subjectConfig);
    });

    test(`selectSubjectConfigSubjectName`, () => {
        /** Create mocked state */
        const MOCK_STATE = {
            subjectConfiguration: {
                subjectConfig: {
                    name: 'foo',
                    id: '123',
                },
            },
        } as RootState;

        /** Get selector's result */
        const result = selectSubjectConfigSubjectData(MOCK_STATE);

        /** Assert result has right keys */
        expect(result).toEqual({ name: 'foo', id: '123' });
    });

    test(`selectSubjectConfigThemes when property 'themes' exists`, () => {
        /** Create mocked state */
        const MOCK_STATE = {
            subjectConfiguration: {
                subjectConfig: {
                    themes: ['foo'],
                },
            },
        } as RootState;

        /** Get selector's result */
        const result = selectSubjectConfigThemes(MOCK_STATE);

        /** Assert result equals array with element 'foo' */
        expect(result).toEqual(['foo']);
    });

    test(`selectSubjectConfigThemes when property 'themes' doesn't exist`, () => {
        /** Create mocked state */
        const MOCK_STATE = {
            subjectConfiguration: {
                subjectConfig: {},
            },
        } as RootState;

        /** Get selector's result */
        const result = selectSubjectConfigThemes(MOCK_STATE);

        /** Assert result is null */
        expect(result).toBeNull();
    });

    test(`selectSubjectConfigExams when property 'exams' doesn't exist`, () => {
        /** Create mocked state */
        const MOCK_STATE = {
            subjectConfiguration: {
                subjectConfig: {},
            },
        } as RootState;

        /** Get selector's result */
        const result = selectSubjectConfigExams(MOCK_STATE);

        /** Assert result is null */
        expect(result).toBeNull();
    });

    test(`selectSubjectConfigExams when both properties don't exist or they are an empty arrays`, () => {
        /** Create mocked states*/
        const MOCK_STATE_1 = {
            subjectConfiguration: {
                subjectConfig: {
                    exams: {
                        trainings: [],
                    },
                },
            },
        } as RootState;

        const MOCK_STATE_2 = {
            subjectConfiguration: {
                subjectConfig: {
                    exams: {
                        sessions: [],
                    },
                },
            },
        } as RootState;

        /** Get selectors' results */
        const result_1 = selectSubjectConfigExams(MOCK_STATE_1);
        const result_2 = selectSubjectConfigExams(MOCK_STATE_2);

        /** Assert result_1 is null */
        expect(result_1).toBeNull();

        /** Assert result_2 is null */
        expect(result_2).toBeNull();
    });

    test(`selectSubjectConfigExams when property 'sessions' doesn't exist or it is an empty array`, () => {
        /** Create mocked state */
        const MOCK_STATE_1 = {
            subjectConfiguration: {
                subjectConfig: {
                    exams: {
                        trainings: ['foo'],
                    },
                },
            },
        } as RootState;

        const MOCK_STATE_2 = {
            subjectConfiguration: {
                subjectConfig: {
                    exams: {
                        trainings: ['foo'],
                        sessions: [],
                    },
                },
            },
        } as RootState;

        /** Get selectors' results */
        const result_1 = selectSubjectConfigExams(MOCK_STATE_1);
        const result_2 = selectSubjectConfigExams(MOCK_STATE_2);

        /** Assert selectors returns objects with right keys */
        expect(result_1).toEqual({
            trainings: ['foo'],
            sessions: null,
        });
        expect(result_2).toEqual({
            trainings: ['foo'],
            sessions: null,
        });
    });

    test(`selectSubjectConfigExams when property 'trainings' doesn't exist or it is an empty array`, () => {
        /** Create mocked state */
        const MOCK_STATE_1 = {
            subjectConfiguration: {
                subjectConfig: {
                    exams: {
                        sessions: ['foo'],
                    },
                },
            },
        } as RootState;

        const MOCK_STATE_2 = {
            subjectConfiguration: {
                subjectConfig: {
                    exams: {
                        sessions: ['foo'],
                        trainings: [],
                    },
                },
            },
        } as RootState;

        /** Get selectors' results */
        const result_1 = selectSubjectConfigExams(MOCK_STATE_1);
        const result_2 = selectSubjectConfigExams(MOCK_STATE_2);

        /** Assert selectors returns objects with right keys */
        expect(result_1).toEqual({
            trainings: null,
            sessions: ['foo'],
        });
        expect(result_2).toEqual({
            trainings: null,
            sessions: ['foo'],
        });
    });

    test('selectSubjectConfigExams when both properties exist and filled correctly', () => {
        /** Create mocked state */
        const MOCK_STATE = {
            subjectConfiguration: {
                subjectConfig: {
                    exams: {
                        sessions: ['foo'],
                        trainings: ['bar'],
                    },
                },
            },
        } as RootState;

        /** Get selector's result */
        const result = selectSubjectConfigExams(MOCK_STATE);

        /** Assert selector returns object with both filled properties */
        expect(result).toEqual({
            trainings: ['bar'],
            sessions: ['foo'],
        });
    });

    test(`selectSubjectConfigSubSubjectsNames when property 'subSubjects' doesn't exist or it is an empty array`, () => {
        /** Create mocked states */
        const MOCK_STATE_1 = {
            subjectConfiguration: {
                subjectConfig: {},
            },
        } as RootState;

        const MOCK_STATE_2 = {
            subjectConfiguration: {
                subjectConfig: {
                    subSubjects: [],
                },
            },
        } as RootState;

        /** Get selectors' results */
        const result_1 = selectSubjectConfigSubSubjectsData(MOCK_STATE_1);
        const result_2 = selectSubjectConfigSubSubjectsData(MOCK_STATE_2);

        /** Assert results equal null */
        expect(result_1).toBeNull();
        expect(result_2).toBeNull();
    });

    test(`selectSubjectConfigSubSubjectsNames when property 'subSubjects' exists and has elements inside of array`, () => {
        /** Create mocked state */
        const MOCK_STATE = {
            subjectConfiguration: {
                subjectConfig: {
                    subSubjects: [{
                        name: 'foo',
                        id: '123',
                    }, {
                        name: 'bar',
                        id: 'abc',
                    }],
                },
            },
        } as RootState;

        /** Get selector's result */
        const result = selectSubjectConfigSubSubjectsData(MOCK_STATE);

        /** Assert selector return array with right values */
        expect(result).toHaveLength(2);
        expect(result).toEqual([{
            name:'foo',
            id: '123',
        }, {
            name: 'bar',
            id: 'abc',
        }]);
    });

    test(`selectSubjectConfigSubSubjectsThemes if property 'subSubjects' doesn't exist or it is an empty array`, () => {
        /** Create mocked states */
        const MOCK_STATE_1 = {
            subjectConfiguration: {
                subjectConfig: {},
            },
        } as RootState;

        const MOCK_STATE_2 = {
            subjectConfiguration: {
                subjectConfig: {
                    subSubjects: [],
                },
            },
        } as RootState;

        /** Get selectors' results */
        const result_1 = selectSubjectConfigSubSubjectsThemes(MOCK_STATE_1);
        const result_2 = selectSubjectConfigSubSubjectsThemes(MOCK_STATE_2);

        /** Assert selectors return null */
        expect(result_1).toBeNull();
        expect(result_2).toBeNull();
    });

    test(`selectSubjectConfigSubSubjectsThemes if some elements don't have property 'themes'`, () => {
        /** Create mocked state */
        const MOCK_STATE = {
            subjectConfiguration: {
                subjectConfig: {
                    subSubjects: [{
                        name: 'foo',
                        themes: ['123'],
                    }, {
                        name: 'bar',
                    }],
                },
            },
        } as RootState;

        /** Get selector's result */
        const result = selectSubjectConfigSubSubjectsThemes(MOCK_STATE);

        /** Assert result has right keys and values */
        expect(result).toEqual({
            foo: ['123'],
        });
    });

    test(`selectSubjectConfigSubSubjectsThemes if each element has property 'themes'`, () => {
        /** Create mocked state */
        const MOCK_STATE = {
            subjectConfiguration: {
                subjectConfig: {
                    subSubjects: [{
                        name: 'foo',
                        themes: ['123'],
                    }, {
                        name: 'bar',
                        themes: ['456'],
                    }],
                },
            },
        } as RootState;

        /** Get selector's result */
        const result = selectSubjectConfigSubSubjectsThemes(MOCK_STATE);

        /** Assert result has right keys and values */
        expect(result).toEqual({
            foo: ['123'],
            bar: ['456'],
        });
    });
});
