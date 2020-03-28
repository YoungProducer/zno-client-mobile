/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 4 March 2020
 *
 * Declare main types and interfaces for SubjectConfiguration component.
 * Create function which connect actions
 * and/or variables from the redux-store to the component.
 */

/** External imports */
import { connect } from 'react-redux';

/** Application's imports */
import { fetchSubjectConfigurationAction } from 'store/actionCreators/subjectConfiguration';
import {
    toggleSubjectConfigurationDialogAction, ISubjectRootData,
} from 'store/slices/subjectConfiguration';
import {
    selectSubjectConfigurationLoading,
    selectSubjectConfigurationDialogVisible,
    selectSubjectConfigSubjectData,
    selectSubjectConfigThemes,
    selectSubjectConfigExams,
    selectSubjectConfigSubSubjectsThemes,
    selectSubjectConfigSubSubjectsData,
} from 'store/selectors/subjectConfiguration';
import { selectIsLoggedIn } from 'store/selectors/auth/signin';
import { RootState } from 'store/slices';
import { ISubjectConfigurationCredentials } from 'api';

/** Define types for test configuration */
export const enum ETestTypes {
    THEMES = 'Вибір теми',
    EXAMS = 'Тренувальні варіанти ЗНО',
}

export const enum EExamTypes {
    SESSIONS = 'ОСНОВНА СЕССІЯ ЗНО',
    TRAININGS = 'ТРЕНУВАЛЬНІ ВАРІАНТИ',
}

/** Props which component get from the parent */
interface IOwnProps {}

/** Props which component select from the redux-store */
interface IStateProps {
    isLoggedIn: boolean;
    loading: boolean;
    dialogVisible: boolean;
    subjectData: ISubjectRootData;
    subjectThemes: string[] | null;
    subjectExams: {
        trainings: string[] | null;
        sessions: string[] | null;
    };
    subSubjectsData: ISubjectRootData[] | null;
    subSubjectsThemes: {
        [attr: string]: string[];
    };
}

/** Props(actions) which component can dispatch */
interface IDispatchProps {
    fetchSubjectConfiguration: (credentials: ISubjectConfigurationCredentials) => void;
    toggleSubjectConfigurationDialog: (value: boolean) => void;
}

/** Declare type which describe all props pushed to the component */
export type TSubjectConfigurationModalProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

/** Select variables from the redux-store */
const mapStateToProps = (state: RootState): IStateProps => ({
    isLoggedIn: selectIsLoggedIn(state),
    loading: selectSubjectConfigurationLoading(state),
    dialogVisible: selectSubjectConfigurationDialogVisible(state),
    subjectData: selectSubjectConfigSubjectData(state),
    subjectThemes: selectSubjectConfigThemes(state),
    subjectExams: selectSubjectConfigExams(state),
    subSubjectsData: selectSubjectConfigSubSubjectsData(state),
    subSubjectsThemes: selectSubjectConfigSubSubjectsThemes(state),
});

/** Create functions which dispatch some actions */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    fetchSubjectConfiguration: (credentials: ISubjectConfigurationCredentials) =>
        dispatch(fetchSubjectConfigurationAction(credentials)),

    toggleSubjectConfigurationDialog: (value: boolean) =>
        dispatch(toggleSubjectConfigurationDialogAction(value)),
});

/**
 * Export function which connect actions
 * and/or variables from the redux-store to the component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
