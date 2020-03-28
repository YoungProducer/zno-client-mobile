/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Selector for subjects slice.
 */

/** Application's imports */
import { RootState } from 'store/slices';

export const selectSubjectsLoading = (state: RootState) => state.subjects.loading;

export const selectSubjectsList = (state: RootState) => state.subjects.subjectsList;
