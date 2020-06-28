/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 March 2020
 *
 * Selectors for SubjectConfiguration slice.
 */

/** External imports */
import { createSelector } from '@reduxjs/toolkit';

/** Application's imports */
import { RootState } from 'store/slices';

export const selectSubjectConfigurationLoading = (state: RootState) =>
    state.subjectConfiguration.loading;

export const selectSubjectConfigurationDialogVisible = (state: RootState) =>
    state.subjectConfiguration.dialogVisible;

export const selectSubjectConfig = (state: RootState) =>
    state.subjectConfiguration.subjectConfig;

/**
 * Select id and name of subject.
 */
export const selectSubjectConfigSubjectData = createSelector(
    selectSubjectConfig,
    (subjectConfig) => subjectConfig ? {
        name: subjectConfig.name,
        id: subjectConfig.id,
    } : undefined,
);

/**
 * Select ids and names of sub-subjects.
 * If property 'subSubjects' doesn't exist
 * then selector returns null.
 *
 * In other case selector returns array of names(string)
 * if some object doesn't have property 'name'
 * then this object will be skiped.
 */
export const selectSubjectConfigSubSubjectsData = createSelector(
    selectSubjectConfig,
    (subjectConfig) => {
        if (!subjectConfig) {
            return null;
        }

        /** Extract subSubjects from config */
        const { subSubjects } = subjectConfig;

        /** Check is property 'subSubjects' exist or it is an empty array*/
        if (!subSubjects || subSubjects.length === 0) return null;

        return subSubjects.reduce((acc, curr) => {
            /**
             * Return new array from previous array and current value.
             */
            return acc.concat({ name: curr.name, id: curr.id });
        }, []);
    },
);

/**
 * Select themes of sub-subjects.
 * If property 'subSubjects' doesn't exist
 * then selector returns null.
 *
 * In other case
 * selector returns object with keys as name of each subSubject,
 * values of this keys is array of themes(string);
 * Example:
 * config: {
 *     subSubjects: [{
 *          name: 'foo',
 *          themes: ['bar']
 *     }]
 * }
 * returned value:
 * {
 *     foo: ['bar']
 * }
 */
export const selectSubjectConfigSubSubjectsThemes = createSelector(
    selectSubjectConfig,
    (subjectConfig) => {
        if (!subjectConfig) {
            return null;
        }

        /** Extract property 'subSubjects' */
        const { subSubjects } = subjectConfig;

        /** Check is property 'subSubjects' exist or it is an empty array */
        if (!subSubjects || subSubjects.length === 0) return null;

        return subSubjects.reduce((acc, curr) => {
            /** If property 'themes' exists then add it to object */
            if (curr.themes) {
                return {
                    ...acc,
                    [curr.name]: curr.themes,
                };
            }
            /** In other case return previous object */
            return { ...acc };
        }, {});
    },
);

/**
 * Select themes from subject config.
 * If themes property doesn't exist in subjectConfig
 * then selector will returns null.
 */
export const selectSubjectConfigThemes = createSelector(
    selectSubjectConfig,
    (subjectConfig) =>
        subjectConfig &&
        subjectConfig.themes &&
        subjectConfig.themes.length !== 0
            ? subjectConfig.themes
            : null,
);

/**
 * Select exams from subject config.
 * If exams property doesn't exist in subjectConfig
 * then selector will returns null.
 * Example:
 * config: {}
 * returned value: null.
 *
 * If trainings or sessions property doesn't exist in exams property
 * or one of this properies will be an empty array
 * then one of this properties will be null.
 * Example:
 * config: {
 *    exams: {
 *       trainings: ['foo'],
 *       sessions: [],
 *    }
 * }
 * returned value:
 * exams: {
 *      trainings: ['foo'],
 *      sessions: null,
 * }
 *
 * If exams property exists but both sub-properties don't exist
 * or both properties are empty arrays
 * then selector will returns null.
 * Example:
 * config: {
 *     exams: {}
 * }
 * returned value: null,
 */
export const selectSubjectConfigExams = createSelector(
    selectSubjectConfig,
    (subjectConfig) => {
        if (!subjectConfig) {
            return null;
        }

        /** Extract exams property */
        const { exams } = subjectConfig;

        /** Check is exams property exist */
        if (!exams) return null;

        /** Check is both properties exist or empty arrays */
        if ((!exams.sessions || exams.sessions.length === 0)
            && (!exams.trainings || exams.trainings.length === 0)
        ) {
            return null;
        }

        /** Check is one of properties doesn't exist or empty array */
        if (!exams.sessions || exams.sessions.length === 0) {
            return {
                trainings: exams.trainings,
                sessions: null,
            };
        }

        if (!exams.trainings || exams.trainings.length === 0) {
            return {
                trainings: null,
                sessions: exams.sessions,
            };
        }

        return {
            trainings: exams.trainings,
            sessions: exams.sessions,
        };
    },
);
